package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException
import com.google.gson.JsonParser
import java.io.Closeable
import java.io.IOException
import java.nio.ByteBuffer
import java.nio.charset.CharacterCodingException
import java.nio.charset.CodingErrorAction
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.CRC32
import java.util.zip.ZipEntry
import java.util.zip.ZipException
import java.util.zip.ZipFile

/**
 * The zip or the tree is not safe or not sound. Nothing from it is kept: the previous install stays. [damagedDownload] says the zip file
 * itself is broken (cut short or corrupt), so downloading it again can fix it.
 */
class InstallException(message: String, cause: Throwable? = null, val damagedDownload: Boolean = false) : IOException(message, cause)

/**
 * Reads the Models repo zip in place and installs the files a plan keeps, straight from the zip into the pack: the zip holds every
 * Pokemon, a selection keeps a part of them, and unpacking everything only to delete most of it again took minutes on Windows.
 *
 * Everything that comes from the zip is untrusted: names are checked against zip-slip, sizes and counts are capped, and the CRC of
 * every file installed is verified (a corrupt download throws instead of installing).
 */
object ZipInstaller {
    const val MAX_ENTRIES = 200_000
    const val MAX_TOTAL_BYTES = 2L * 1024 * 1024 * 1024
    const val MAX_ENTRY_BYTES = 200L * 1024 * 1024
    private const val MAX_MANIFEST_BYTES = 1024 * 1024

    /**
     * Opens [zip] and checks every entry name. With [stripRoot] the first path segment is dropped, which is the `<repo>-<tag>/` folder
     * GitHub puts around an archive. A zip that is cut short (its central directory is at the end) or has an unsafe name aborts.
     */
    fun open(zip: Path, stripRoot: Boolean = true): ModelsZip {
        val file = try {
            ZipFile(zip.toFile())
        } catch (e: IOException) {
            throw InstallException("The downloaded models zip is incomplete or damaged: ${e.message}", e, damagedDownload = true)
        }
        try {
            if (file.size() > MAX_ENTRIES) throw InstallException("The zip has more than $MAX_ENTRIES entries.")
            val files = HashMap<String, ZipEntry>()
            val directories = HashSet<String>()
            for (entry in file.entries()) {
                val relative = relativeName(entry.name, stripRoot) ?: continue
                if (entry.isDirectory) directories += relative else files[relative] = entry
            }
            return ModelsZip(file, files, directories)
        } catch (e: Exception) {
            file.close()
            throw e
        }
    }

    /** The entry name relative to the repo root, or null for the root folder itself. Throws for a name that cannot be safe. */
    private fun relativeName(name: String, stripRoot: Boolean): String? {
        if (name.contains('\\') || name.contains(':') || name.startsWith("/") || name.contains('\u0000')) {
            throw InstallException("The zip entry \"$name\" has an unsafe name.")
        }
        val segments = name.split('/').filter { it.isNotEmpty() }
        if (segments.any { it == ".." || it == "." }) throw InstallException("The zip entry \"$name\" has an unsafe name.")
        val kept = if (stripRoot) segments.drop(1) else segments
        return if (kept.isEmpty()) null else kept.joinToString("/")
    }

    class ModelsZip internal constructor(
        private val zip: ZipFile,
        /** The files, by their path relative to the repo root. */
        private val files: Map<String, ZipEntry>,
        private val directories: Set<String>,
    ) : Closeable {
        /**
         * Every form folder of the tree: `<game>/<folder>/install.json`, plus the folder's listing (its files and subfolders).
         * `<game>/.mismatched` and hidden folders are skipped. A folder without a valid `install.json` aborts, since the tree is then
         * not sound (the CI of the Models repo should never let that through).
         */
        fun readFolders(): List<PrunePlanner.Folder> {
            val listings = sortedMapOf<String, MutableSet<String>>()
            for (path in files.keys + directories) {
                val segments = path.split('/')
                if (segments.size < 2 || segments[0].startsWith(".") || segments[1].startsWith(".")) continue
                // A file directly in a game folder is not a form folder.
                if (segments.size == 2 && path in files) continue
                val listing = listings.getOrPut("${segments[0]}/${segments[1]}") { sortedSetOf() }
                if (segments.size > 2) listing += segments[2]
            }
            return listings.map { (folder, listing) ->
                val manifestEntry = files["$folder/${InstallManifests.INSTALL_FILE}"] ?: throw InstallException("$folder has no install.json.")
                val manifest = try {
                    InstallManifests.parse(readText(manifestEntry))
                } catch (e: InstallManifestException) {
                    throw InstallException("$folder: ${e.message}", e)
                }
                PrunePlanner.Folder(folder, manifest, listing.toList())
            }
        }

        private fun readText(entry: ZipEntry): String {
            val bytes = zip.getInputStream(entry).use { it.readNBytes(MAX_MANIFEST_BYTES + 1) }
            if (bytes.size > MAX_MANIFEST_BYTES) throw InstallException("The zip entry \"${entry.name}\" is larger than the limit.")
            return try {
                Charsets.UTF_8.newDecoder()
                    .onMalformedInput(CodingErrorAction.REPORT)
                    .onUnmappableCharacter(CodingErrorAction.REPORT)
                    .decode(ByteBuffer.wrap(bytes))
                    .toString()
            } catch (e: CharacterCodingException) {
                throw InstallException("The zip entry \"${entry.name}\" is not valid UTF-8.", e)
            }
        }

        /**
         * Writes every file the plan installs from the zip to its install path under [pack]. Returns the install paths written, sorted,
         * which the state file keeps as the manifest of what a later run may delete. An install path that is not a plain relative path
         * under `assets/`, or a file the zip lacks, aborts before anything is written. [progress] is told how many files are done of how many.
         */
        fun install(
            plan: PrunePlanner.Plan,
            pack: Path,
            speciesNames: Map<String, String> = emptyMap(),
            progress: (done: Int, total: Int) -> Unit = { _, _ -> },
        ): List<String> {
            if (!plan.sound) throw InstallException("The tree is inconsistent: ${plan.issues.first().message}")
            val packRoot = pack.toAbsolutePath().normalize()
            val jobs = plan.install.map { item ->
                if (!InstallManifests.isValidInstallPath(item.to)) throw InstallException("${item.from} installs to an invalid path: ${item.to}")
                val source = files[item.from] ?: throw InstallException("${item.from} is listed but missing from the zip.")
                Job(source, inside(packRoot, item.to), item)
            }
            var total = 0L
            jobs.forEachIndexed { index, job ->
                Files.createDirectories(job.destination.parent)
                total += write(job.source, job.destination)
                if (total > MAX_TOTAL_BYTES) throw InstallException("The zip is larger than the limit.")
                if (isPoser(job.destination)) stripEmptyPoseEntries(job.destination)
                // A resolver of a twin species names it as the data files do ([TwinNames]).
                if (TwinNames.mayRename(job.item.from, job.item.to, speciesNames)) {
                    TwinNames.renamedResolver(Files.readString(job.destination), job.item.from.substringBefore('/'), speciesNames)
                        ?.let { Files.writeString(job.destination, it) }
                }
                progress(index + 1, jobs.size)
            }
            return jobs.map { it.item.to }.sorted()
        }

        private inner class Job(val source: ZipEntry, val destination: Path, val item: PrunePlanner.Install)

        /** Copies one entry to [destination], checking its size and CRC. Returns the bytes written. */
        private fun write(entry: ZipEntry, destination: Path): Long {
            val crc = CRC32()
            var written = 0L
            try {
                zip.getInputStream(entry).use { input ->
                    Files.newOutputStream(destination).use { out ->
                        val buffer = ByteArray(64 * 1024)
                        while (true) {
                            val read = input.read(buffer)
                            if (read < 0) break
                            written += read
                            if (written > MAX_ENTRY_BYTES) throw InstallException("The zip entry \"${entry.name}\" is larger than the limit.")
                            crc.update(buffer, 0, read)
                            out.write(buffer, 0, read)
                        }
                    }
                }
            } catch (e: ZipException) {
                throw InstallException("The downloaded models zip is damaged: ${e.message}", e, damagedDownload = true)
            }
            if ((entry.size >= 0 && written != entry.size) || (entry.crc >= 0 && crc.value != entry.crc)) {
                throw InstallException("The downloaded models zip is damaged: \"${entry.name}\" does not match its checksum.", damagedDownload = true)
            }
            return written
        }

        override fun close() = zip.close()
    }

    private val POSE_KEYS_DROPPED_WHEN_EMPTY = listOf("animations", "namedAnimations", "transformedParts")

    private fun isPoser(path: Path): Boolean {
        val normalized = path.toString().replace('\\', '/')
        return normalized.endsWith(".json") && normalized.contains("/bedrock/pokemon/posers/")
    }

    /**
     * An empty `animations`, `namedAnimations` or `transformedParts` of a pose crashes the game, so a poser that has them is
     * rewritten without. A file that is not valid JSON is left as it was downloaded.
     */
    private fun stripEmptyPoseEntries(poser: Path) {
        val root = try {
            JsonParser.parseString(Files.readString(poser))
        } catch (e: JsonParseException) {
            return
        }
        val poses = root.takeIf { it.isJsonObject }?.asJsonObject?.let { JsonTrees.obj(it, "poses") } ?: return
        var changed = false
        for (pose in poses.entrySet().mapNotNull { it.value.takeIf { v -> v.isJsonObject }?.asJsonObject }) {
            for (key in POSE_KEYS_DROPPED_WHEN_EMPTY) {
                val value = pose.get(key) ?: continue
                val empty = (value.isJsonArray && value.asJsonArray.isEmpty) || (value.isJsonObject && value.asJsonObject.entrySet().isEmpty())
                if (empty) {
                    pose.remove(key)
                    changed = true
                }
            }
        }
        if (changed) Files.writeString(poser, JsonTrees.renderFile(root))
    }

    private fun inside(root: Path, relative: String): Path {
        val resolved = root.resolve(relative).normalize()
        if (!resolved.startsWith(root)) throw InstallException("\"$relative\" points outside its folder.")
        return resolved
    }
}
