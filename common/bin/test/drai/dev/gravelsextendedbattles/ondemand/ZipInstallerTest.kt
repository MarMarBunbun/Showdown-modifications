package drai.dev.gravelsextendedbattles.ondemand

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.CRC32
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

class ZipInstallerTest {
    @TempDir
    lateinit var dir: Path

    private fun zip(vararg entries: Pair<String, String?>): Path {
        val file = dir.resolve("models-${System.nanoTime()}.zip")
        ZipOutputStream(Files.newOutputStream(file)).use { out ->
            for ((name, content) in entries) {
                out.putNextEntry(ZipEntry(name))
                if (content != null) out.write(content.toByteArray())
                out.closeEntry()
            }
        }
        return file
    }

    private fun tree() = zip(
        "Gravelmon-Models-4.0.0/" to null,
        "Gravelmon-Models-4.0.0/sage/" to null,
        "Gravelmon-Models-4.0.0/sage/foliat/" to null,
        "Gravelmon-Models-4.0.0/sage/foliat/install.json" to """{"files":{"foliat.png":"assets/cobblemon/textures/pokemon/sage/foliat.png","foliat_cry.ogg":"assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg"}}""",
        "Gravelmon-Models-4.0.0/sage/foliat/foliat.png" to "PNG-foliat",
        "Gravelmon-Models-4.0.0/sage/foliat/foliat_cry.ogg" to "OGG-foliat",
        "Gravelmon-Models-4.0.0/azure/aguade/install.json" to """{"files":{"aguade.png":"assets/cobblemon/textures/pokemon/azure/aguade.png"}}""",
        "Gravelmon-Models-4.0.0/azure/aguade/aguade.png" to "PNG-aguade",
        "Gravelmon-Models-4.0.0/sage/.mismatched/loose.png" to "loose",
    )

    @Test
    fun extract_StripsTheRootFolder_AndWritesTheFiles() {
        val staging = dir.resolve("staging")

        val result = ZipInstaller.extract(tree(), staging)

        assertEquals("PNG-foliat", Files.readString(staging.resolve("sage/foliat/foliat.png")))
        assertTrue(Files.isRegularFile(staging.resolve("azure/aguade/install.json")))
        assertTrue(result.files >= 8)
    }

    @Test
    fun extract_RefusesZipSlipAndUnsafeNames() {
        for (name in listOf("root/../../evil.txt", "root/a/../../../evil.txt", "/abs/evil.txt", "root\\evil.txt", "root/C:/evil.txt")) {
            val staging = dir.resolve("staging-${name.hashCode()}")
            val file = zip("root/ok.txt" to "ok", name to "evil")

            assertThrows(InstallException::class.java, { ZipInstaller.extract(file, staging) }, name)
            assertFalse(Files.exists(dir.resolve("evil.txt")))
            assertFalse(Files.exists(dir.parent.resolve("evil.txt")))
        }
    }

    @Test
    fun extract_ACorruptEntry_FailsTheCrcCheck() {
        val file = dir.resolve("corrupt.zip")
        val content = "0123456789".repeat(100).toByteArray()
        val crc = CRC32().also { it.update(content) }
        ZipOutputStream(Files.newOutputStream(file)).use { out ->
            val entry = ZipEntry("root/a.bin")
            entry.method = ZipEntry.STORED
            entry.size = content.size.toLong()
            entry.compressedSize = content.size.toLong()
            entry.crc = crc.value
            out.putNextEntry(entry)
            out.write(content)
            out.closeEntry()
        }
        val bytes = Files.readAllBytes(file)
        val at = String(bytes, Charsets.ISO_8859_1).indexOf("0123456789")
        bytes[at + 5] = 'X'.code.toByte()
        Files.write(file, bytes)

        assertThrows(InstallException::class.java) { ZipInstaller.extract(file, dir.resolve("staging-corrupt")) }
    }

    @Test
    fun extract_ATruncatedZip_Fails() {
        val bytes = Files.readAllBytes(tree())
        val file = dir.resolve("cut.zip")
        Files.write(file, bytes.copyOf(bytes.size / 2))

        assertThrows(java.io.IOException::class.java) { ZipInstaller.extract(file, dir.resolve("staging-cut")) }
    }

    @Test
    fun readFolders_FindsTheFormFolders_SkippingMismatched() {
        val staging = dir.resolve("staging")
        ZipInstaller.extract(tree(), staging)

        val folders = ZipInstaller.readFolders(staging)

        assertEquals(listOf("azure/aguade", "sage/foliat"), folders.map { it.path })
        assertEquals(listOf("foliat.png", "foliat_cry.ogg", "install.json"), folders.last().listing)
    }

    @Test
    fun readFolders_AFolderWithoutAValidInstallJson_Aborts() {
        val staging = dir.resolve("staging")
        ZipInstaller.extract(zip("r/sage/foliat/foliat.png" to "x"), staging)
        assertThrows(InstallException::class.java) { ZipInstaller.readFolders(staging) }

        val bad = dir.resolve("staging-bad")
        ZipInstaller.extract(zip("r/sage/foliat/install.json" to """{"files":{"a.png":"../../x"}}"""), bad)
        assertThrows(InstallException::class.java) { ZipInstaller.readFolders(bad) }
    }

    @Test
    fun deleteThenInstall_LeavesExactlyTheSelectedFiles_InThePack() {
        val staging = dir.resolve("staging")
        val pack = dir.resolve("pack")
        ZipInstaller.extract(tree(), staging)
        val folders = ZipInstaller.readFolders(staging)
        val plan = PrunePlanner.plan(listOf(Gms3.SelectableForm("sage#foliat#normal", "sage", Gms3.Source.GRAVELMON, "sage/foliat")), folders)

        ZipInstaller.applyDeletes(staging, plan)
        val written = ZipInstaller.install(staging, plan, pack)

        assertEquals(listOf("assets/cobblemon/textures/pokemon/sage/foliat.png", "assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg"), written)
        assertEquals("PNG-foliat", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
        assertFalse(Files.exists(pack.resolve("assets/cobblemon/textures/pokemon/azure/aguade.png")))
        assertFalse(Files.exists(staging.resolve("azure/aguade")))
        assertTrue(Files.exists(staging.resolve("sage/foliat/install.json")))
    }

    @Test
    fun install_AnInconsistentPlan_WritesNothing() {
        val staging = dir.resolve("staging")
        val pack = dir.resolve("pack")
        ZipInstaller.extract(tree(), staging)
        val bad = PrunePlanner.Plan(emptyList(), emptyList(), emptyList(), emptyList(), listOf(PrunePlanner.Issue(PrunePlanner.IssueCode.USES_MISSING, "x")))

        assertThrows(InstallException::class.java) { ZipInstaller.install(staging, bad, pack) }
        assertFalse(Files.exists(pack))
    }

    @Test
    fun install_AFileThePlanNamesButTheZipLacks_AbortsBeforeCopyingAnything() {
        val staging = dir.resolve("staging")
        val pack = dir.resolve("pack")
        ZipInstaller.extract(tree(), staging)
        val plan = PrunePlanner.Plan(
            emptyList(), emptyList(), emptyList(),
            listOf(
                PrunePlanner.Install("sage/foliat/foliat.png", "assets/cobblemon/textures/pokemon/sage/foliat.png"),
                PrunePlanner.Install("sage/foliat/missing.png", "assets/cobblemon/textures/pokemon/sage/missing.png"),
            ),
            emptyList(),
        )

        assertThrows(InstallException::class.java) { ZipInstaller.install(staging, plan, pack) }
        assertFalse(Files.exists(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
    }

    @Test
    fun install_RefusesAnInstallPathOutsideAssets() {
        val staging = dir.resolve("staging")
        ZipInstaller.extract(tree(), staging)
        val plan = PrunePlanner.Plan(
            emptyList(), emptyList(), emptyList(),
            listOf(PrunePlanner.Install("sage/foliat/foliat.png", "../../outside.png")),
            emptyList(),
        )

        assertThrows(InstallException::class.java) { ZipInstaller.install(staging, plan, dir.resolve("pack")) }
        assertFalse(Files.exists(dir.resolve("outside.png")))
    }
}
