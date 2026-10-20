package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assumptions.assumeTrue
import org.junit.jupiter.api.Test
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.GZIPInputStream

/**
 * The golden test of the item port (items plan, phase 4): for the definitions migrated from the Mod, [ItemFilesBuilder] needs the same
 * items and builds the same files as the site's `neededItems` and `buildItemFiles`, which the site's own golden test checks against the
 * Mod's files. The fixtures are written by `scripts/items/items-golden-export.ts` into the folder [GoldenFilesTest] uses; without them
 * the test is skipped.
 */
class ItemFilesGoldenTest {
    private val dir: Path? = run {
        val configured = System.getProperty("GRAVELMON_GOLDEN_DIR") ?: System.getenv("GRAVELMON_GOLDEN_DIR")
        if (configured != null) return@run Path.of(configured).takeIf { Files.exists(it.resolve("items.json")) }
        var at: Path? = Path.of("").toAbsolutePath()
        while (at != null) {
            val candidate = at.resolve(".claude").resolve("golden")
            if (Files.exists(candidate.resolve("items.json"))) return@run candidate
            at = at.parent
        }
        null
    }

    private fun expected(): JsonObject {
        val text = GZIPInputStream(Files.newInputStream(dir!!.resolve("items-expected.json.gz"))).use { String(it.readBytes(), Charsets.UTF_8) }
        return JsonText.parseStrict(text).asJsonObject
    }

    private fun compare(variant: String, needed: Set<String>, items: List<ItemFilesBuilder.SiteItem>) {
        val expected = expected().getAsJsonObject(variant)
        assertEquals(expected.getAsJsonArray("needed").map { it.asString }.sorted(), needed.sorted(), "$variant: the needed items")
        val files = expected.getAsJsonObject("files").entrySet().associate { it.key to it.value }
        val built = ItemFilesBuilder.build(items, needed)
        assertEquals(files.keys.sorted(), built.keys.sorted(), "$variant: the paths")
        val differing = files.filter { (path, element) ->
            val ours = built.getValue(path)
            if (path.endsWith(".js")) ours != element.asString
            else JsonTrees.canonical(JsonText.parseStrict(ours)) != JsonTrees.canonical(element)
        }.keys
        assertEquals(emptyList<String>(), differing.sorted().take(10), "$variant: files that differ")
    }

    @Test
    fun everyItemNeeded_BuildsWhatTheSiteBuilds() {
        assumeTrue(dir != null, "No golden fixtures")
        val items = ItemFilesBuilder.parse(Files.readString(dir!!.resolve("items.json"))).items
        compare("all", items.filter { !it.retired }.map { it.id }.toSet(), items)
    }

    @Test
    fun aSelection_NeedsWhatTheSiteNeeds_AndBuildsWhatItBuilds() {
        assumeTrue(dir != null, "No golden fixtures")
        val items = ItemFilesBuilder.parse(Files.readString(dir!!.resolve("items.json"))).items
        val species = SelectorData.parseSpecies(Files.readString(dir.resolve("species.json")))
        val enabled = expected().getAsJsonObject("half").getAsJsonArray("enabled").map { it.asString }.toSet()
        compare("half", ItemFilesBuilder.neededItems(items, species.forms, enabled), items)
    }
}
