package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException
import com.google.gson.JsonParser
import java.io.BufferedInputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.util.zip.ZipException
import java.util.zip.ZipFile
import java.util.zip.ZipInputStream

/** The zip or the tree is not safe or not sound. Nothing from it is kept: the previous install stays. */
class InstallException(message: String, cause: Throwable? = null) : IOException(message, cause)

/**
 * Extracts the Models repo zip into a staging folder, reads its form folders, and installs the files a plan keeps.
 * Everything that comes from the zip is untrusted: names are checked against zip-slip, sizes and counts are capped, and the
 * CRC of every entry is verified (a corrupt download throws instead of installing).
 */
object ZipInstaller {
    const val MAX_ENTRIES = 200_000
    const val MAX_TOTAL_BYTES = 2L * 1024 * 1024 * 1024
    const val MAX_ENTRY_BYTES = 200L * 1024 * 1024

    data class Extracted(val files: Int, val bytes: Long)

    /**
     * Extracts [zip] into [target] (created if needed). With [stripRoot] the first path segment is dropped, which is the
     * `<repo>-<tag>/` folder GitHub puts around an archive. An entry that would land outside [target] aborts everything.
     */
    fun extract(zip: Path, target: Path, stripRoot: Boolean = true): Extracted {
        val root = target.toAbsolutePath().normalize()
        Files.createDirectories(root)
        var files = 0
        var total = 0L
        // ZipInputStream reads entries in order and treats a file that stops early as simply finished, so a truncated download would
        // extract "successfully" with files missing. The central directory sits at the END of the file: opening it as a ZipFile
        // fails for a truncated archive and tells how many entries a complete one has.
        val expectedEntries = try {
            ZipFile(zip.toFile()).use { it.size() }
        } catch (e: IOException) {
            throw InstallException("The zip is incomplete or damaged: ${e.message}", e)
        }
        if (expectedEntries > MAX_ENTRIES) throw InstallException("The zip has more than $MAX_ENTRIES entries.")
        try {
            ZipInputStream(BufferedInputStream(Files.newInputStream(zip))).use { input ->
                while (true) {
                    val entry = input.nextEntry ?: break
                    if (++files > MAX_ENTRIES) throw InstallException("The zip has more than $MAX_ENTRIES entries.")
                    val relative = relativeName(entry.name, stripRoot) ?: continue
                    val destination = root.resolve(relative).normalize()
                    if (!destination.startsWith(root) || destination == root) {
                        throw InstallException("The zip entry \"${entry.name}\" would be written outside the staging folder.")
                    }
                    if (entry.isDirectory) {
                        Files.createDirectories(destination)
                        continue
                    }
                    Files.createDirectories(destination.parent)
                    var written = 0L
                    Files.newOutputStream(destination).use { out ->
                        val buffer = ByteArray(64 * 1024)
                        while (true) {
                            val read = input.read(buffer)
                            if (read < 0) break
                            written += read
                            total += read
                            if (written > MAX_ENTRY_BYTES) throw InstallException("The zip entry \"${entry.name}\" is larger than the limit.")
                            if (total > MAX_TOTAL_BYTES) throw InstallException("The zip is larger than the limit.")
                            out.write(buffer, 0, read)
                        }
                    }
                    // ZipInputStream verifies the entry's CRC and size when the entry ends; a mismatch throws a ZipException.
                    input.closeEntry()
                }
            }
        } catch (e: ZipException) {
            throw InstallException("The zip is damaged: ${e.message}", e)
        }
        if (files != expectedEntries) throw InstallException("The zip ended after $files of $expectedEntries entries.")
        return Extracted(files, total)
    }

    /** The entry name relative to the staging folder, or null for the root folder itself. Throws for a name that cannot be safe. */
    private fun relativeName(name: String, stripRoot: Boolean): String? {
        if (name.contains('\\') || name.contains(':') || name.startsWith("/") || name.contains('\u0000')) {
            throw InstallException("The zip entry \"$name\" has an unsafe name.")
        }
        val segments = name.split('/').filter { it.isNotEmpty() }
        if (segments.any { it == ".." || it == "." }) throw InstallException("The zip entry \"$name\" has an unsafe name.")
        val kept = if (stripRoot) segments.drop(1) else segments
        return if (kept.isEmpty()) null else kept.joinToString("/")
    }

    /**
     * Reads every form folder of an extracted tree: `<staging>/<game>/<folder>/install.json`, plus the folder's file listing.
     * `<game>/.mismatched` and hidden folders are skipped. A folder without a valid `install.json` aborts, since the tree is
     * then not sound (the CI of the Models repo should never let that through).
     */
    fun readFolders(staging: Path): List<PrunePlanner.Folder> {
        val folders = mutableListOf<PrunePlanner.Folder>()
        Files.newDirectoryStream(staging).use { games ->
            for (game in games.sortedBy { it.fileName.toString() }) {
                val gameName = game.fileName.toString()
                if (!Files.isDirectory(game) || gameName.startsWith(".")) continue
                Files.newDirectoryStream(game).use { children ->
                    for (folder in children.sortedBy { it.fileName.toString() }) {
                        val folderName = folder.fileName.toString()
                        if (!Files.isDirectory(folder) || folderName.startsWith(".")) continue
                        val manifestFile = folder.resolve(InstallManifests.INSTALL_FILE)
                        if (!Files.isRegularFile(manifestFile)) throw InstallException("$gameName/$folderName has no install.json.")
                        val manifest = try {
                            InstallManifests.parse(Files.readString(manifestFile))
                        } catch (e: InstallManifestException) {
                            throw InstallException("$gameName/$folderName: ${e.message}", e)
                        }
                        val listing = Files.newDirectoryStream(folder).use { files -> files.map { it.fileName.toString() }.sorted() }
                        folders += PrunePlanner.Folder("$gameName/$folderName", manifest, listing)
                    }
                }
            }
        }
        return folders
    }

    /** Deletes the files and folders of [plan] from [staging], so what is left is exactly what the selection keeps. */
    fun applyDeletes(staging: Path, plan: PrunePlanner.Plan) {
        val root = staging.toAbsolutePath().normalize()
        for (path in plan.delete) Files.deleteIfExists(inside(root, path))
        for (folder in plan.removeFolders) {
            val dir = inside(root, folder)
            if (Files.isDirectory(dir)) {
                val empty = Files.newDirectoryStream(dir).use { !it.iterator().hasNext() }
                if (empty) Files.delete(dir)
            }
        }
    }

    /**
     * Copies every file the plan installs from [staging] to its install path under [pack]. Returns the install paths written,
     * sorted, which the state file keeps as the manifest of what a later run may delete. An install path that is not a plain
     * relative path under `assets/` aborts before anything is copied.
     */
    fun install(staging: Path, plan: PrunePlanner.Plan, pack: Path): List<String> {
        if (!plan.sound) throw InstallException("The tree is inconsistent: ${plan.issues.first().message}")
        val stagingRoot = staging.toAbsolutePath().normalize()
        val packRoot = pack.toAbsolutePath().normalize()
        val jobs = plan.install.map { item ->
            if (!InstallManifests.isValidInstallPath(item.to)) throw InstallException("${item.from} installs to an invalid path: ${item.to}")
            val source = inside(stagingRoot, item.from)
            if (!Files.isRegularFile(source)) throw InstallException("${item.from} is listed but missing from the zip.")
            Triple(source, inside(packRoot, item.to), item.to)
        }
        for ((source, destination, _) in jobs) {
            Files.createDirectories(destination.parent)
            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING)
            if (isPoser(destination)) stripEmptyPoseEntries(destination)
        }
        return jobs.map { it.third }.sorted()
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
