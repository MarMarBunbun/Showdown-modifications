package drai.dev.gravelsextendedbattles.ondemand

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

/** The parts of [ItemFilesBuilder] the golden test does not reach: a damaged download, quoting, and the edges of the needed-items rule. */
class ItemFilesBuilderTest {
    private fun items(vararg entries: String) = ItemFilesBuilder.parse("""{"dataRevision":1,"items":[${entries.joinToString(",")}]}""").items

    @Test
    fun aDamagedItem_IsLeftOut_NotTheWholeDownload() {
        val parsed = items(
            """{"id":"gravelmon:flute","name":"flute","definition":{"type":"basic","displayNames":{"en_us":"Flute"}}}""",
            """{"id":"cobblemon:flute","name":"flute","definition":{}}""",
            """{"id":"gravelmon:other","name":"flute","definition":{}}""",
            """{"id":"gravelmon:nodef","name":"nodef"}""",
        )
        assertEquals(listOf("gravelmon:flute"), parsed.map { it.id })
    }

    @Test
    fun theMegaBaseForm_DropsOnlyTheMegaAspects() {
        assertEquals("x#regal#normal", ItemFilesBuilder.megaBaseFormId("x#regal#mega"))
        assertEquals("pokemon#metagross#delta,crystal", ItemFilesBuilder.megaBaseFormId("pokemon#metagross#delta,crystal,mega"))
        assertEquals("x#charizard#normal", ItemFilesBuilder.megaBaseFormId("x#charizard#mega_x"))
    }

    @Test
    fun aMegaStoneScript_QuotesEveryValue() {
        val stone = items("""{"id":"gravelmon:odd","name":"odd","definition":{"type":"mega_stone","displayNames":{"en_us":"Odd"},"megaShowdown":{"name":"Odd \"name\"","num":10001,"megaStone":{"A":"A-mega"},"itemUser":["A"]}}}""").single()
        val script = ItemFilesBuilder.megaStoneScript(stone.definition)!!
        assertTrue(script.contains("    name: \"Odd \\\"name\\\"\","), script)
        assertTrue(script.contains("    megaStone: { \"A\": \"A-mega\"},"), script)
    }

    @Test
    fun aRetiredItem_IsNeverNeeded_ButStillNamed() {
        val parsed = items("""{"id":"gravelmon:old","name":"old","definition":{"type":"held_item","displayNames":{"en_us":"Old"},"retired":true}}""")
        val needed = ItemFilesBuilder.neededItems(parsed, emptyList(), emptySet())
        assertTrue(needed.isEmpty())
        val files = ItemFilesBuilder.build(parsed, needed)
        assertEquals(setOf("assets/gravelmon/lang/en_us.json"), files.keys)
        assertTrue(files.getValue("assets/gravelmon/lang/en_us.json").contains("item.gravelmon.old"))
    }

    @Test
    fun recipeNames_KeepGivenOnes_AndNumberTheRest() {
        val recipes = items("""{"id":"gravelmon:flute","name":"flute","definition":{"type":"basic","displayNames":{"en_us":"Flute"},"recipes":[{"type":"smelting"},{"name":"flute_old","type":"smelting"},{"type":"smelting"}]}}""")
            .single().let { JsonTrees.objects(it.definition, "recipes") }
        assertEquals(listOf("flute", "flute_old", "flute_2"), ItemFilesBuilder.recipeNames("flute", recipes))
    }

    private fun ore(biomes: String) = JsonText.parseStrict(
        """{"stoneOre":"gravelmon:fire_ore","veinSize":4,"discardOnAirExposure":0,"perChunk":8,"height":{"shape":"uniform","min":10,"max":117},"biomes":$biomes}""",
    ).asJsonObject

    @Test
    fun aNetherOre_ReplacesNetherrack_AndAnEndOre_EndStone() {
        assertEquals(
            """[{"target":{"predicate_type":"minecraft:block_match","block":"minecraft:netherrack"},"state":{"Name":"gravelmon:fire_ore"}}]""",
            ItemFilesBuilder.configuredOreJson(ore("""{"dimension":"the_nether"}""")).getAsJsonObject("config").get("targets").toString(),
        )
        assertEquals(
            """[{"target":{"predicate_type":"minecraft:block_match","block":"minecraft:end_stone"},"state":{"Name":"gravelmon:fire_ore"}}]""",
            ItemFilesBuilder.configuredOreJson(ore("""{"dimension":"the_end"}""")).getAsJsonObject("config").get("targets").toString(),
        )
    }

    @Test
    fun theBiomesOfABiomeModifier_LikeTheSite() {
        assertEquals("\"#minecraft:is_overworld\"", ItemFilesBuilder.biomeHolderSet(ore("\"overworld\"")).toString())
        assertEquals("\"#minecraft:is_nether\"", ItemFilesBuilder.biomeHolderSet(ore("""{"dimension":"the_nether"}""")).toString())
        assertEquals("\"#minecraft:is_mountain\"", ItemFilesBuilder.biomeHolderSet(ore("""{"tag":"minecraft:is_mountain"}""")).toString())
        assertEquals("""["minecraft:end_highlands"]""", ItemFilesBuilder.biomeHolderSet(ore("""{"dimension":"the_end","biomes":["minecraft:end_highlands"]}""")).toString())
        assertEquals(
            """{"type":"neoforge:or","values":["#minecraft:is_forest",["minecraft:plains"]]}""",
            ItemFilesBuilder.biomeHolderSet(ore("""{"dimension":"overworld","tags":["minecraft:is_forest"],"biomes":["minecraft:plains"]}""")).toString(),
        )
        assertEquals("nether_fire_gem_ore", ItemFilesBuilder.oreFeatureName("fire_gem", "the_nether"))
        assertEquals("overworld_air_ore", ItemFilesBuilder.oreFeatureName("air_stone"))
    }
}
