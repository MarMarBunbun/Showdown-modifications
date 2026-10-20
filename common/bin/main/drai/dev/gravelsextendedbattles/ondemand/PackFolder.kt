package drai.dev.gravelsextendedbattles.ondemand

import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

/**
 * The folder the downloaded pack lives in, `<gamedir>/gravelmon/`:
 *
 * - `pack/`: the pack Minecraft reads (assets and data);
 * - `pack.staging/` and `pack.old/`: where a new pack is built and where the previous one waits while the swap happens;
 * - `cache/`: the last zip and the last species and games downloads, so a changed code rebuilds without downloading again;
 * - `state.json`: see [InstallState].
 *
 * Nothing outside this folder is ever created, changed or deleted.
 */
class PackFolder(gameDir: Path) {
    val root: Path = gameDir.toAbsolutePath().normalize().resolve("gravelmon")
    val pack: Path = root.resolve("pack")
    val staging: Path = root.resolve("pack.staging")
    val old: Path = root.resolve("pack.old")
    val cache: Path = root.resolve("cache")
    val zipStaging: Path = root.resolve("zip.staging")
    val stateFile: Path = root.resolve("state.json")

    /** The pack exists and has its metadata, so Minecraft can read it. */
    fun packExists(): Boolean = Files.isRegularFile(pack.resolve(PACK_META))

    fun zipFor(version: String): Path = cache.resolve("models-$version.zip")

    /** Deletes a folder and everything in it. A missing folder is fine; one that will not go away is an [IOException]. */
    fun deleteTree(dir: Path) {
        if (!Files.exists(dir)) return
        Files.walk(dir).use { stream ->
            stream.sorted(Comparator.reverseOrder()).forEach { Files.deleteIfExists(it) }
        }
    }

    /** [deleteTree] for several folders; a folder that cannot be deleted is left (the next run tries again). */
    fun deleteQuietly(vararg dirs: Path) {
        for (dir in dirs) {
            try {
                deleteTree(dir)
            } catch (e: IOException) {
                // Left for the next run.
            }
        }
    }

    /** Deletes the zips in the cache other than [keep], so only the newest download is kept. */
    fun deleteOtherZips(keep: Path) {
        if (!Files.isDirectory(cache)) return
        Files.newDirectoryStream(cache, "models-*.zip").use { zips ->
            for (zip in zips) if (zip != keep) runCatching { Files.deleteIfExists(zip) }
        }
    }

    /**
     * A copy of [from] in [to] without the files in [exclude] (paths relative to [from]). Files are hard linked where the file
     * system allows it and copied where it does not, so a data-only rebuild does not copy the sprites. The files in the copy are
     * never written through: a file that changes is deleted and created again.
     */
    fun copyTree(from: Path, to: Path, exclude: Set<String> = emptySet()) {
        val source = from.toAbsolutePath().normalize()
        Files.createDirectories(to)
        var canLink = true
        Files.walk(source).use { stream ->
            for (path in stream) {
                val relative = source.relativize(path).toString().replace('\\', '/')
                if (relative.isEmpty() || relative in exclude) continue
                val target = to.resolve(relative)
                if (Files.isDirectory(path)) {
                    Files.createDirectories(target)
                    continue
                }
                Files.createDirectories(target.parent)
                if (canLink) {
                    try {
                        Files.createLink(target, path)
                        continue
                    } catch (e: IOException) {
                        canLink = false
                    } catch (e: UnsupportedOperationException) {
                        canLink = false
                    }
                }
                Files.copy(path, target, StandardCopyOption.REPLACE_EXISTING)
            }
        }
    }

    /** Writes [text] to [relative] under [dir], creating folders. [relative] must stay inside [dir]. */
    fun write(dir: Path, relative: String, text: String) {
        val base = dir.toAbsolutePath().normalize()
        val target = base.resolve(relative).normalize()
        if (!target.startsWith(base) || target == base) throw InstallException("\"$relative\" points outside the pack.")
        Files.createDirectories(target.parent)
        Files.deleteIfExists(target)
        Files.writeString(target, text)
    }

    /** Removes the files in [relativePaths] from [dir] (and folders they leave empty). Paths that are missing are ignored. */
    fun deleteFiles(dir: Path, relativePaths: Collection<String>) {
        val base = dir.toAbsolutePath().normalize()
        for (relative in relativePaths) {
            val target = base.resolve(relative).normalize()
            if (!target.startsWith(base) || target == base) continue
            Files.deleteIfExists(target)
            var parent = target.parent
            while (parent != null && parent != base && Files.isDirectory(parent) && Files.newDirectoryStream(parent).use { !it.iterator().hasNext() }) {
                Files.delete(parent)
                parent = parent.parent
            }
        }
    }

    /**
     * Makes [staging] the pack: the current pack waits in `pack.old`, and goes away once the new one is in place. If the new pack
     * cannot be moved in, the old one is put back and the exception is rethrown. Renames are retried because antivirus on Windows
     * can hold a file open for a moment.
     */
    fun swap(sleep: (Long) -> Unit = { Thread.sleep(it) }) {
        deleteTree(old)
        val hadPack = Files.exists(pack)
        if (hadPack) retry(sleep) { Files.move(pack, old, StandardCopyOption.ATOMIC_MOVE) }
        try {
            retry(sleep) { Files.move(staging, pack, StandardCopyOption.ATOMIC_MOVE) }
        } catch (e: IOException) {
            if (hadPack && !Files.exists(pack)) Files.move(old, pack, StandardCopyOption.ATOMIC_MOVE)
            throw e
        }
        try {
            deleteTree(old)
        } catch (e: IOException) {
            // The new pack is in place; a leftover old folder is removed by the next swap.
        }
    }

    private fun retry(sleep: (Long) -> Unit, attempts: Int = 5, action: () -> Unit) {
        var last: IOException? = null
        repeat(attempts) { attempt ->
            try {
                action()
                return
            } catch (e: IOException) {
                last = e
                if (attempt < attempts - 1) sleep(200L * (attempt + 1))
            }
        }
        throw last!!
    }

    companion object {
        const val PACK_META = "pack.mcmeta"

        /**
         * `pack.mcmeta` for a pack that is read as resources and as data: 1.21.1 uses format 34 for resource packs and 48 for data
         * packs, and a range makes it compatible with both.
         */
        val PACK_META_TEXT: String = JsonText.render(
            linkedMapOf(
                "pack" to linkedMapOf(
                    "description" to "Pokemon and assets downloaded by Gravel's Extended Battles for your selection. Managed by the mod; do not edit.",
                    "pack_format" to 34,
                    "supported_formats" to linkedMapOf("min_inclusive" to 34, "max_inclusive" to 48),
                ),
            ),
            indent = 2,
        ) + "\n"
    }
}
