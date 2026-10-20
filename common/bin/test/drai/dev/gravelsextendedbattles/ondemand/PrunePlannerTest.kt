package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import drai.dev.gravelsextendedbattles.ondemand.PrunePlanner.Folder
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import java.util.Random

class PrunePlannerTest {
    private fun formFor(path: String): Gms3.SelectableForm {
        val (game, name) = path.split('/')
        return Gms3.SelectableForm("$game#$name#normal", game, Gms3.Source.GRAVELMON, path)
    }

    private fun folder(path: String, files: Map<String, String>, uses: List<String> = emptyList(), listing: List<String>? = null) =
        Folder(path, InstallManifest(files, uses), listing)

    private fun tex(game: String, name: String) = "assets/cobblemon/textures/pokemon/$game/$name.png"

    /** A small tree with every situation: plain folders, a shared model, a shared texture, a cry. */
    private fun synthetic() = listOf(
        folder(
            "sage/foliat",
            mapOf(
                "foliat.png" to tex("sage", "foliat"),
                "foliat.geo.json" to "assets/cobblemon/bedrock/pokemon/models/sage/foliat.geo.json",
                "foliat_cry.ogg" to "assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg",
            ),
        ),
        folder(
            "sage/florabri",
            mapOf(
                "florabri.png" to tex("sage", "florabri"),
                "florabri.geo.json" to "assets/cobblemon/bedrock/pokemon/models/sage/florabri.geo.json",
            ),
            listOf("sage/foliat/foliat.geo.json"),
        ),
        folder(
            "azure/aguade",
            mapOf("aguade.png" to tex("azure", "aguade")),
            listOf("sage/foliat/foliat.geo.json", "sage/florabri/florabri.png"),
        ),
        folder(
            "azure/iguadium",
            mapOf(
                "iguadium.png" to tex("azure", "iguadium"),
                "iguadium_cry.ogg" to "assets/gravelmon/sounds/pokemon/azure/iguadium_cry.ogg",
            ),
        ),
    )

    private fun forms(vararg paths: String) = paths.map(::formFor)

    @Test
    fun keepsEveryFileOfAnEnabledFolder_AndDeletesTheRestOfTheDisabledOnes() {
        val plan = PrunePlanner.plan(forms("sage/foliat"), synthetic())

        assertTrue(plan.sound)
        assertEquals(
            listOf(
                "azure/aguade/aguade.png", "azure/aguade/install.json",
                "azure/iguadium/iguadium.png", "azure/iguadium/iguadium_cry.ogg", "azure/iguadium/install.json",
                "sage/florabri/florabri.geo.json", "sage/florabri/florabri.png", "sage/florabri/install.json",
            ),
            plan.delete,
        )
        assertEquals(listOf("azure/aguade", "azure/iguadium", "sage/florabri"), plan.removeFolders)
        assertEquals(
            listOf("sage/foliat/foliat.geo.json", "sage/foliat/foliat.png", "sage/foliat/foliat_cry.ogg"),
            plan.install.map { it.from },
        )
    }

    @Test
    fun aFileANeededFormUses_IsKeptInADisabledFolder_WhichKeepsItsInstallJson() {
        val plan = PrunePlanner.plan(forms("azure/aguade"), synthetic())

        assertEquals(listOf("sage/florabri/florabri.png", "sage/foliat/foliat.geo.json"), plan.sharedKept)
        assertFalse("sage/foliat/foliat.geo.json" in plan.delete)
        assertFalse("sage/foliat/install.json" in plan.delete)
        assertFalse("sage/florabri/install.json" in plan.delete)
        assertTrue("sage/foliat/foliat.png" in plan.delete)
        assertFalse("sage/foliat" in plan.removeFolders)
        assertTrue(plan.install.map { it.from }.containsAll(listOf("sage/florabri/florabri.png", "sage/foliat/foliat.geo.json", "azure/aguade/aguade.png")))
    }

    @Test
    fun nothingEnabled_DeletesEverythingAndInstallsNothing() {
        val plan = PrunePlanner.plan(emptyList(), synthetic())

        assertTrue(plan.install.isEmpty())
        assertEquals(4, plan.removeFolders.size)
        assertEquals(synthetic().sumOf { it.manifest.files.size + 1 }, plan.delete.size)
    }

    @Test
    fun aFolderHoldingAFileNoManifestListsIsNeverRemoved() {
        val tree = listOf(
            folder("sage/foliat", mapOf("foliat.png" to tex("sage", "foliat")), listing = listOf("foliat.png", "install.json", "notes.txt")),
        )

        val plan = PrunePlanner.plan(emptyList(), tree)

        assertEquals(listOf("sage/foliat/foliat.png"), plan.delete)
        assertTrue(plan.removeFolders.isEmpty())
    }

    @Test
    fun creditsJson_IsOnlyDeletedWhenTheListingShowsIt() {
        val without = PrunePlanner.plan(emptyList(), listOf(folder("sage/foliat", mapOf("f.png" to tex("sage", "f")))))
        val with = PrunePlanner.plan(emptyList(), listOf(folder("sage/foliat", mapOf("f.png" to tex("sage", "f")), listing = listOf("credits.json", "f.png", "install.json"))))

        assertFalse("sage/foliat/credits.json" in without.delete)
        assertTrue("sage/foliat/credits.json" in with.delete)
    }

    @Test
    fun theMismatchedFolder_IsNotAFormFolder() {
        val tree = synthetic() + folder("sage/.mismatched", mapOf("loose.png" to tex("sage", "loose")))

        val plan = PrunePlanner.plan(forms("sage/foliat"), tree)

        assertTrue(plan.delete.none { it.contains(".mismatched") })
    }

    @Test
    fun aUsesEntryThatResolvesNowhere_IsAnIssue_AndNotSound() {
        val tree = listOf(folder("sage/foliat", mapOf("f.png" to tex("sage", "f")), listOf("sage/gone/x.png")))

        val plan = PrunePlanner.plan(forms("sage/foliat"), tree)

        assertFalse(plan.sound)
        assertEquals(PrunePlanner.IssueCode.USES_MISSING, plan.issues.single().code)
    }

    @Test
    fun twoFilesInstallingToOnePath_AreAnIssue() {
        val shared = tex("sage", "same")
        val tree = listOf(
            folder("sage/foliat", mapOf("a.png" to shared)),
            folder("sage/florabri", mapOf("b.png" to shared)),
        )

        val plan = PrunePlanner.plan(forms("sage/foliat", "sage/florabri"), tree)

        assertEquals(PrunePlanner.IssueCode.INSTALL_COLLISION, plan.issues.single().code)
    }

    @Test
    fun aFormWithoutAFolderInTheTree_EnablesNothing() {
        val plan = PrunePlanner.plan(listOf(Gms3.SelectableForm("x#y#normal", "x", Gms3.Source.GRAVELMON, null), formFor("nope/missing")), synthetic())

        assertTrue(plan.install.isEmpty())
    }

    // The real migration output (a sample of 265 folders with 92 shared-file references).

    private fun fixture(): List<Folder> {
        val text = PrunePlannerTest::class.java.getResourceAsStream("/selector/models-manifests.json")!!.bufferedReader().readText()
        val root = JsonText.parseStrict(text) as JsonObject
        return root.entrySet().map { (path, element) ->
            folder(path, element.asJsonObject.getAsJsonObject("files").entrySet().associate { it.key to it.value.asString }, element.asJsonObject.getAsJsonArray("uses")?.map { it.asString } ?: emptyList())
        }
    }

    /** Applies a plan and returns what is left, as repository paths. */
    private fun left(folders: List<Folder>, plan: PrunePlanner.Plan): Set<String> {
        val all = folders.flatMap { f -> f.manifest.files.keys.map { "${f.path}/$it" } + "${f.path}/install.json" }.toMutableSet()
        all.removeAll(plan.delete.toSet())
        return all
    }

    private fun assertSound(folders: List<Folder>, enabledPaths: Collection<String>) {
        val plan = PrunePlanner.plan(enabledPaths.map(::formFor), folders)
        assertTrue(plan.sound, plan.issues.joinToString())
        val remaining = left(folders, plan)
        val byPath = folders.associateBy { it.path }
        for (path in enabledPaths) {
            val f = byPath.getValue(path)
            for (name in f.manifest.files.keys) assertTrue("$path/$name" in remaining, "$path/$name was deleted")
            for (used in f.manifest.uses) assertTrue(used in remaining, "$path needs $used, which was deleted")
            assertTrue("$path/install.json" in remaining)
        }
        // Every file that is installed is still there, and its folder still has an install.json.
        for (item in plan.install) {
            assertTrue(item.from in remaining, "${item.from} is installed but was deleted")
            assertTrue(item.from.substringBeforeLast('/') + "/install.json" in remaining)
        }
        assertEquals(plan.install.size, plan.install.map { it.to }.toSet().size)
    }

    @Test
    fun fixture_IsSelfConsistent() {
        val folders = fixture()
        assertEquals(265, folders.size)
        assertTrue(PrunePlanner.plan(folders.map { formFor(it.path) }, folders).sound)
    }

    @Test
    fun fixture_DisablingAnyOneFolder_NeverDeletesAFileAKeptFormNeeds() {
        val folders = fixture()
        val paths = folders.map { it.path }
        for (disabled in paths) assertSound(folders, paths - disabled)
    }

    @Test
    fun fixture_EnablingAnyOneFolder_KeepsItsFilesAndItsUses() {
        val folders = fixture()
        for (path in folders.map { it.path }) assertSound(folders, listOf(path))
    }

    @Test
    fun fixture_AnyRandomSubset_IsSound() {
        val folders = fixture()
        val paths = folders.map { it.path }
        val random = Random(42)
        repeat(300) {
            assertSound(folders, paths.filter { random.nextInt(100) < random.nextInt(101) })
        }
    }

    @Test
    fun fixture_NothingEnabled_RemovesEveryFolder() {
        val folders = fixture()
        val plan = PrunePlanner.plan(emptyList(), folders)

        assertEquals(folders.size, plan.removeFolders.size)
        assertTrue(plan.install.isEmpty())
        assertEquals(folders.sumOf { it.manifest.files.size + 1 }, plan.delete.size)
    }
}
