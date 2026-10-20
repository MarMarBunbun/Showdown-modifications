package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assumptions.assumeTrue
import org.junit.jupiter.api.Test
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.GZIPInputStream

/**
 * The golden test of the builders (plan, section 10): for the real data the files built here equal the files the site's own
 * generators write (`generateSpeciesFiles` and `generateExtrasFiles`), which the site's migration checks against the Mod's files
 * one by one. The input and the expected files are written by `scripts/migrate-species/golden-export.ts` on the site:
 *
 *     npx tsx scripts/migrate-species/golden-export.ts --mod "../../Gravelmon Mod" --out ../../.claude/golden
 *
 * The folder is found through the system property or environment variable `GRAVELMON_GOLDEN_DIR`, or as `.claude/golden` in a
 * parent of the project. Without it the test is skipped (CI without the Mod has no data to compare).
 */
class GoldenFilesTest {
    private val dir: Path? = run {
        val configured = System.getProperty("GRAVELMON_GOLDEN_DIR") ?: System.getenv("GRAVELMON_GOLDEN_DIR")
        if (configured != null) return@run Path.of(configured).takeIf { Files.exists(it.resolve("species.json")) }
        var at: Path? = Path.of("").toAbsolutePath()
        while (at != null) {
            val candidate = at.resolve(".claude").resolve("golden")
            if (Files.exists(candidate.resolve("species.json"))) return@run candidate
            at = at.parent
        }
        null
    }

    private class Expected(val files: Map<String, JsonElement>, val lang: Map<String, String>)

    private fun expected(variant: String): Expected {
        val text = GZIPInputStream(Files.newInputStream(dir!!.resolve("expected.json.gz"))).use { String(it.readBytes(), Charsets.UTF_8) }
        val root = JsonText.parseStrict(text).asJsonObject.getAsJsonObject(variant)
        return Expected(
            root.getAsJsonObject("files").entrySet().associate { it.key to it.value },
            root.getAsJsonObject("lang").entrySet().associate { it.key to it.value.asString },
        )
    }

    private fun built(rules: RulesVariant): Pair<Map<String, JsonElement>, Map<String, String>> {
        val species = SelectorData.parseSpecies(Files.readString(dir!!.resolve("species.json")))
        val games = SelectorData.parseGames(Files.readString(dir.resolve("games.json")))
        val files = LinkedHashMap<String, JsonElement>()
        val lang = LinkedHashMap<String, String>()

        val speciesBuilt = SpeciesFileBuilder.build(species.forms, rules)
        assertTrue(speciesBuilt.problems.isEmpty(), speciesBuilt.problems.take(5).toString())
        assertTrue(speciesBuilt.skipped.isEmpty(), speciesBuilt.skipped.take(5).toString())
        files += speciesBuilt.files
        lang += speciesBuilt.lang

        val enabled = species.forms.mapNotNull { JsonTrees.string(it, "formId") }.toSet()
        val starters = ExtrasBuilder.filterStarters(games.games, emptySet(), enabled)
        val extras = ExtrasBuilder.build(species.forms, starters, species.gamePriorities, rules)
        assertTrue(extras.problems.isEmpty(), extras.problems.take(5).toString())
        files += extras.files
        lang += extras.lang
        return files to lang
    }

    private fun compare(variant: String, rules: RulesVariant) {
        assumeTrue(dir != null, "No golden data: run scripts/migrate-species/golden-export.ts on the site first.")
        val want = expected(variant)
        val (files, lang) = built(rules)

        val missing = want.files.keys - files.keys
        val extra = files.keys - want.files.keys
        val different = want.files.filter { (path, json) -> files[path] != null && files[path] != json }.keys
        assertTrue(missing.isEmpty(), "Missing ${missing.size}: ${missing.sorted().take(10)}")
        assertTrue(extra.isEmpty(), "Unexpected ${extra.size}: ${extra.sorted().take(10)}")
        assertTrue(different.isEmpty(), "Different ${different.size}: ${different.sorted().take(10)}\n${different.sorted().firstOrNull()?.let { diff(want.files[it]!!, files[it]!!) }}")
        assertEquals(want.lang.toSortedMap(), lang.toSortedMap())
    }

    private fun diff(want: JsonElement, got: JsonElement): String {
        if (want is JsonObject && got is JsonObject) {
            for (key in want.keySet() + got.keySet()) {
                if (want.get(key) != got.get(key)) return "$key: want ${want.get(key)?.toString()?.take(200)} got ${got.get(key)?.toString()?.take(200)}"
            }
        }
        return "want ${want.toString().take(200)} got ${got.toString().take(200)}"
    }

    @Test
    fun faithfulFiles_EqualTheSitesGenerators() = compare("faithful", RulesVariant.FAITHFUL)

    @Test
    fun rebalancedFiles_EqualTheSitesGenerators() = compare("rebalanced", RulesVariant.REBALANCED)

    @Test
    fun disablingHalfTheGames_OnlyRemovesFiles_AndLeavesNoProblems() {
        assumeTrue(dir != null, "No golden data: run scripts/migrate-species/golden-export.ts on the site first.")
        val species = SelectorData.parseSpecies(Files.readString(dir!!.resolve("species.json")))
        val games = SelectorData.parseGames(Files.readString(dir.resolve("games.json")))
        val ids = species.forms.mapNotNull { JsonTrees.string(it, "addedByGame") }.toSortedSet().toList()
        val disabled = ids.filterIndexed { index, _ -> index % 2 == 0 }

        val all = PackDataBuilder.build(species, games, Gms3.Selection(emptyList(), emptyList()), RulesVariant.REBALANCED)
        val half = PackDataBuilder.build(species, games, Gms3.Selection(disabled, emptyList()), RulesVariant.REBALANCED)

        assertTrue(half.problems.isEmpty(), half.problems.take(5).toString())
        assertTrue(half.files.keys.size < all.files.keys.size)
        val invented = half.files.keys - all.files.keys
        assertTrue(invented.isEmpty(), "Files that only exist with a selection: ${invented.take(10)}")
        // A file that is built in both is the same, except the ones that gather several forms (spawns, additions, lists).
        val species1 = half.files.filterKeys { it.startsWith("data/cobblemon/species/") }
        assertTrue(species1.isNotEmpty())
        // The evolutions into species that are left out are removed, and the dex numbers count only the enabled Pokemon, so those may differ; nothing else may.
        fun withoutEvolutions(text: String?) = text?.let { com.google.gson.JsonParser.parseString(it).asJsonObject.also { o -> o.remove("evolutions"); o.remove("nationalPokedexNumber"); o.getAsJsonArray("forms")?.forEach { f -> f.asJsonObject.remove("evolutions") } } }
        assertTrue(species1.all { (path, text) -> all.files[path] == text || withoutEvolutions(all.files[path]) == withoutEvolutions(text) }, "A species file differs with a selection")
        assertTrue(half.disabledForms > 0 && half.enabledForms > 0)
    }
}
