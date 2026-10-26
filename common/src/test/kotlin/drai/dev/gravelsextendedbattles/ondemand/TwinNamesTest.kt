package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertSame
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

/** Twin species named `<name>_<game>` in everything built, as the web app's `twinNames.test.ts` has it. */
class TwinNamesTest {
    private val names = mapOf("amber#hatchick" to "hatchick_amber", "okeno#hatchick" to "hatchick_okeno")

    private fun json(text: String) = JsonText.parseStrict(text) as JsonObject

    @Test
    fun aFormOfATwin_IsRenamedEverywhereItNamesItself() {
        val form = json(
            """{"formId":"amber#hatchick#normal","addedByGame":"amber","source":"gravelmon",
               "species":{"formId":"amber#hatchick#normal","origin":{"kind":"species","folder":"amber","file":"hatchick"},
                          "lang":{"hatchick.name":"Hatchick","hatchick.desc":"A chick."},"pokedex":["cobblemon.species.hatchick.desc"],
                          "evolutions":[{"id":"e","variant":"level_up","result":"rachops"}]},
               "spawns":[{"ns":"cobblemon","file":"hatchick","ord":0,"source":"gravelmon","entry":{"pokemon":"hatchick","weight":1}}]}""",
        )

        val out = TwinNames.apply(form, names)
        val species = JsonTrees.obj(out, "species")!!

        assertEquals("amber#hatchick_amber#normal", JsonTrees.string(out, "formId"))
        assertEquals("amber#hatchick_amber#normal", JsonTrees.string(species, "formId"))
        assertEquals("hatchick_amber", JsonTrees.string(JsonTrees.obj(species, "origin")!!, "file"))
        assertEquals(setOf("hatchick_amber.name", "hatchick_amber.desc"), JsonTrees.obj(species, "lang")!!.keySet())
        assertEquals("cobblemon.species.hatchick_amber.desc", JsonTrees.list(species, "pokedex")!![0].asString)
        assertEquals("rachops", JsonTrees.string(JsonTrees.objects(species, "evolutions")[0], "result"))
        val spawn = JsonTrees.objects(out, "spawns")[0]
        assertEquals("hatchick_amber", JsonTrees.string(spawn, "file"))
        assertEquals("hatchick_amber", JsonTrees.string(JsonTrees.obj(spawn, "entry")!!, "pokemon"))
        // The download itself is left as it was: the selection keeps working with the site's ids.
        assertEquals("amber#hatchick#normal", JsonTrees.string(form, "formId"))
    }

    @Test
    fun aReferenceToATwin_IsRenamedOnlyFromTheTwinsOwnGame() {
        val rachops = json("""{"formId":"amber#rachops#normal","species":{"preEvolution":"hatchick"}}""")
        val elsewhere = json("""{"formId":"mazah#chick#normal","species":{"evolutions":[{"variant":"level_up","result":"hatchick"}]}}""")

        assertEquals("hatchick_amber", JsonTrees.string(JsonTrees.obj(TwinNames.apply(rachops, names), "species")!!, "preEvolution"))
        assertEquals("hatchick", JsonTrees.string(JsonTrees.objects(JsonTrees.obj(TwinNames.apply(elsewhere, names), "species")!!, "evolutions")[0], "result"))
    }

    @Test
    fun aResolverFromATwinsFolder_NamesTheTwin() {
        val resolver = """{"species":"cobblemon:hatchick","order":0,"variations":[]}"""

        assertTrue(TwinNames.mayRename("okeno/hatchick/0_hatchick_base.json", "assets/cobblemon/bedrock/species/okeno/0_hatchick_base.json", names))
        assertFalse(TwinNames.mayRename("okeno/hatchick/hatchick.png", "assets/cobblemon/textures/pokemon/okeno/hatchick.png", names))
        assertEquals("cobblemon:hatchick_okeno", JsonTrees.string(json(TwinNames.renamedResolver(resolver, "okeno", names)!!), "species"))
        assertNull(TwinNames.renamedResolver(resolver, "mazah", names))
    }

    @Test
    fun withoutTwins_NothingIsCopied() {
        val form = json("""{"formId":"amber#rachops#normal"}""")
        assertSame(form, TwinNames.apply(form, emptyMap()))
    }

    @Test
    fun theDownloadsSpeciesNames_AreReadAndKeptThroughAChange() {
        val download = """{"dataRevision":1,"games":[],"forms":[],"speciesNames":{"amber#hatchick":"hatchick_amber"}}"""
        assertEquals(mapOf("amber#hatchick" to "hatchick_amber"), SelectorData.parseSpecies(download).speciesNames)

        val delta = SpeciesChanges.parse("""{"since":1,"dataRevision":2,"full":false,"games":[],"forms":[],"removed":[]}""") as SpeciesChanges.Delta
        assertEquals(mapOf("amber#hatchick" to "hatchick_amber"), SelectorData.parseSpecies(SpeciesChanges.apply(download, delta)).speciesNames)
    }
}
