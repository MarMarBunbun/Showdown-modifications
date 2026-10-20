package drai.dev.gravelsextendedbattles.ondemand

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.nio.file.Files
import java.nio.file.Path

class PackFolderTest {
    @TempDir
    lateinit var dir: Path

    private val folder get() = PackFolder(dir)

    private fun put(root: Path, relative: String, text: String) {
        val file = root.resolve(relative)
        Files.createDirectories(file.parent)
        Files.writeString(file, text)
    }

    @Test
    fun copyTree_SkipsTheExcludedFiles_AndNeverWritesThroughToTheOriginal() {
        val from = dir.resolve("from")
        put(from, "assets/a.png", "A")
        put(from, "data/x.json", "old")
        put(from, "data/y.json", "keep")

        folder.copyTree(from, dir.resolve("to"), exclude = setOf("data/x.json"))
        folder.write(dir.resolve("to"), "data/y.json", "changed")

        assertEquals("A", Files.readString(dir.resolve("to/assets/a.png")))
        assertFalse(Files.exists(dir.resolve("to/data/x.json")))
        assertEquals("changed", Files.readString(dir.resolve("to/data/y.json")))
        assertEquals("keep", Files.readString(from.resolve("data/y.json")))
    }

    @Test
    fun write_RefusesAPathOutsideTheFolder() {
        assertThrows(InstallException::class.java) { folder.write(dir.resolve("pack"), "../evil.txt", "x") }
        assertThrows(InstallException::class.java) { folder.write(dir.resolve("pack"), "a/../../evil.txt", "x") }
        assertFalse(Files.exists(dir.resolve("evil.txt")))
    }

    @Test
    fun deleteFiles_RemovesTheFilesAndTheFoldersTheyLeaveEmpty_AndNothingOutside() {
        val pack = dir.resolve("pack")
        put(pack, "data/a/b/c.json", "c")
        put(pack, "data/a/keep.json", "k")
        put(dir, "outside.txt", "o")

        folder.deleteFiles(pack, listOf("data/a/b/c.json", "../outside.txt", "missing.json"))

        assertFalse(Files.exists(pack.resolve("data/a/b")))
        assertTrue(Files.exists(pack.resolve("data/a/keep.json")))
        assertTrue(Files.exists(dir.resolve("outside.txt")))
    }

    @Test
    fun swap_ReplacesThePack_AndLeavesNoOldOrStagingFolder() {
        val f = folder
        put(f.pack, "pack.mcmeta", "old")
        put(f.staging, "pack.mcmeta", "new")

        f.swap()

        assertEquals("new", Files.readString(f.pack.resolve("pack.mcmeta")))
        assertFalse(Files.exists(f.staging))
        assertFalse(Files.exists(f.old))
    }

    @Test
    fun swap_WorksWhenThereIsNoPackYet() {
        val f = folder
        put(f.staging, "pack.mcmeta", "new")

        f.swap()

        assertTrue(f.packExists())
    }

    @Test
    fun swap_WithoutAStagingFolder_PutsTheOldPackBack() {
        val f = folder
        put(f.pack, "pack.mcmeta", "old")

        assertThrows(java.io.IOException::class.java) { f.swap { } }

        assertEquals("old", Files.readString(f.pack.resolve("pack.mcmeta")))
    }

    @Test
    fun deleteOtherZips_KeepsOnlyTheNewest() {
        val f = folder
        put(f.cache, "models-3.9.0.zip", "z")
        put(f.cache, "models-4.0.0.zip", "z")
        put(f.cache, "species.json", "{}")

        f.deleteOtherZips(f.zipFor("4.0.0"))

        assertFalse(Files.exists(f.zipFor("3.9.0")))
        assertTrue(Files.exists(f.zipFor("4.0.0")))
        assertTrue(Files.exists(f.cache.resolve("species.json")))
    }

    @Test
    fun theMetadataIsCompatibleWithResourcesAndData() {
        val meta = JsonText.parseStrict(PackFolder.PACK_META_TEXT).asJsonObject.getAsJsonObject("pack")

        assertEquals(34, meta.get("pack_format").asInt)
        assertEquals(34, meta.getAsJsonObject("supported_formats").get("min_inclusive").asInt)
        assertEquals(48, meta.getAsJsonObject("supported_formats").get("max_inclusive").asInt)
    }
}
