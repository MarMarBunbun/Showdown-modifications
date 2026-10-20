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

    private fun plan(vararg installs: Pair<String, String>) =
        PrunePlanner.Plan(emptyList(), emptyList(), emptyList(), installs.map { PrunePlanner.Install(it.first, it.second) }, emptyList())

    @Test
    fun open_RefusesZipSlipAndUnsafeNames() {
        for (name in listOf("root/../../evil.txt", "root/a/../../../evil.txt", "/abs/evil.txt", "root\\evil.txt", "root/C:/evil.txt")) {
            val file = zip("root/ok.txt" to "ok", name to "evil")

            assertThrows(InstallException::class.java, { ZipInstaller.open(file).close() }, name)
        }
    }

    @Test
    fun install_ACorruptEntry_FailsTheCrcCheck() {
        val file = dir.resolve("corrupt.zip")
        val content = "0123456789".repeat(100).toByteArray()
        val crc = CRC32().also { it.update(content) }
        ZipOutputStream(Files.newOutputStream(file)).use { out ->
            val entry = ZipEntry("root/a.png")
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

        ZipInstaller.open(file).use { models ->
            assertThrows(InstallException::class.java) {
                models.install(plan("a.png" to "assets/cobblemon/textures/pokemon/sage/a.png"), dir.resolve("pack"))
            }
        }
    }

    @Test
    fun open_ATruncatedZip_Fails() {
        val bytes = Files.readAllBytes(tree())
        val file = dir.resolve("cut.zip")
        Files.write(file, bytes.copyOf(bytes.size / 2))

        assertThrows(java.io.IOException::class.java) { ZipInstaller.open(file).close() }
    }

    @Test
    fun readFolders_FindsTheFormFolders_SkippingMismatched() {
        val folders = ZipInstaller.open(tree()).use { it.readFolders() }

        assertEquals(listOf("azure/aguade", "sage/foliat"), folders.map { it.path })
        assertEquals(listOf("foliat.png", "foliat_cry.ogg", "install.json"), folders.last().listing)
    }

    @Test
    fun readFolders_AFolderWithoutAValidInstallJson_Aborts() {
        ZipInstaller.open(zip("r/sage/foliat/foliat.png" to "x")).use { models ->
            assertThrows(InstallException::class.java) { models.readFolders() }
        }
        ZipInstaller.open(zip("r/sage/foliat/install.json" to """{"files":{"a.png":"../../x"}}""")).use { models ->
            assertThrows(InstallException::class.java) { models.readFolders() }
        }
    }

    @Test
    fun install_WritesExactlyTheSelectedFiles_IntoThePack_AndReportsProgress() {
        val pack = dir.resolve("pack")
        val seen = mutableListOf<Pair<Int, Int>>()

        val written = ZipInstaller.open(tree()).use { models ->
            val plan = PrunePlanner.plan(listOf(Gms3.SelectableForm("sage#foliat#normal", "sage", Gms3.Source.GRAVELMON, "sage/foliat")), models.readFolders())
            models.install(plan, pack) { done, total -> seen += done to total }
        }

        assertEquals(listOf("assets/cobblemon/textures/pokemon/sage/foliat.png", "assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg"), written)
        assertEquals("PNG-foliat", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
        assertFalse(Files.exists(pack.resolve("assets/cobblemon/textures/pokemon/azure/aguade.png")))
        assertEquals(listOf(1 to 2, 2 to 2), seen)
    }

    @Test
    fun install_AnInconsistentPlan_WritesNothing() {
        val pack = dir.resolve("pack")
        val bad = PrunePlanner.Plan(emptyList(), emptyList(), emptyList(), emptyList(), listOf(PrunePlanner.Issue(PrunePlanner.IssueCode.USES_MISSING, "x")))

        ZipInstaller.open(tree()).use { models ->
            assertThrows(InstallException::class.java) { models.install(bad, pack) }
        }
        assertFalse(Files.exists(pack))
    }

    @Test
    fun install_AFileThePlanNamesButTheZipLacks_AbortsBeforeWritingAnything() {
        val pack = dir.resolve("pack")
        val plan = plan(
            "sage/foliat/foliat.png" to "assets/cobblemon/textures/pokemon/sage/foliat.png",
            "sage/foliat/missing.png" to "assets/cobblemon/textures/pokemon/sage/missing.png",
        )

        ZipInstaller.open(tree()).use { models ->
            assertThrows(InstallException::class.java) { models.install(plan, pack) }
        }
        assertFalse(Files.exists(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
    }

    @Test
    fun install_RefusesAnInstallPathOutsideAssets() {
        ZipInstaller.open(tree()).use { models ->
            assertThrows(InstallException::class.java) { models.install(plan("sage/foliat/foliat.png" to "../../outside.png"), dir.resolve("pack")) }
        }
        assertFalse(Files.exists(dir.resolve("outside.png")))
    }
}
