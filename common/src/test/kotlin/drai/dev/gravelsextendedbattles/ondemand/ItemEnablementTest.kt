package drai.dev.gravelsextendedbattles.ondemand

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class SpeciesExistenceTest {
    private val species = mapOf(
        "absol" to listOf(emptySet(), setOf("epoch"), setOf("epoch", "mega")),
        "arctusk" to listOf(emptySet<String>()),
    )

    private fun exists(loaded: Boolean, name: String?, vararg aspects: String) =
        SpeciesExistence.exists(loaded, name, aspects.toSet()) { species[it] }

    @Test
    fun beforeTheSpeciesHaveLoaded_EverythingExists_SoNothingIsRemovedEarly() {
        assertTrue(exists(false, "ghostmon"))
        assertTrue(exists(false, "absol", "nonsense"))
    }

    @Test
    fun afterTheyLoaded_AMissingSpeciesDoesNotExist() {
        assertFalse(exists(true, "ghostmon"))
        assertTrue(exists(true, "arctusk"))
    }

    @Test
    fun theNamespaceAndCaseDoNotMatter() {
        assertTrue(exists(true, "cobblemon:Absol"))
        assertFalse(exists(true, "gravelmon:ghostmon"))
    }

    @Test
    fun aFormExistsWhenItHasEveryAspectAsked() {
        assertTrue(exists(true, "absol", "epoch"))
        assertTrue(exists(true, "absol", "epoch", "mega"))
        assertTrue(exists(true, "absol", "mega"))
        assertFalse(exists(true, "absol", "alolan"))
        assertFalse(exists(true, "arctusk", "epoch"))
    }

    @Test
    fun noSpeciesOrRandom_IsNotJudged() {
        assertTrue(exists(true, null))
        assertTrue(exists(true, "random"))
    }
}

class FossilLootTest {
    @Test
    fun parse_ReadsTheAdditionsOfEachTable() {
        val additions = FossilLoot.parse(
            """{"additions":[{"table":"cobblemon:fossils/common/prehistoric_mud_pit","items":["gravelmon:a","gravelmon:b"]},{"table":"cobblemon:fossils/uncommon/prehistoric_oak_tree","items":["gravelmon:a"]}]}""",
        )

        assertEquals(
            listOf(
                FossilLoot.Addition("cobblemon:fossils/common/prehistoric_mud_pit", listOf("gravelmon:a", "gravelmon:b")),
                FossilLoot.Addition("cobblemon:fossils/uncommon/prehistoric_oak_tree", listOf("gravelmon:a")),
            ),
            additions,
        )
    }

    @Test
    fun parse_SkipsWhatIsMalformed_AndNeverThrows() {
        assertTrue(FossilLoot.parse("not json").isEmpty())
        assertTrue(FossilLoot.parse("[]").isEmpty())
        assertTrue(FossilLoot.parse("""{"additions":5}""").isEmpty())
        assertEquals(
            1,
            FossilLoot.parse("""{"additions":[{"table":"t"},{"items":["x"]},{"table":"t","items":[]},{"table":"ok","items":["gravelmon:a",3]}]}""").size,
        )
    }

    @Test
    fun theBuilderAndTheParserAgree() {
        val forms = JsonText.parseStrict(
            """[{"formId":"g#a#normal","addedByGame":"g","source":"gravelmon","species":{"formId":"g#a#normal","origin":{"kind":"species","folder":"g","file":"a"},"fossil":{"item":"a_fossil","definition":true,"rare":false,"digSites":[{"site":"mud_pit","rarity":"common"}]}},"spawns":[]}]""",
        ).asJsonArray.map { it.asJsonObject }

        val built = ExtrasBuilder.build(forms, emptyList())
        val additions = FossilLoot.parse(JsonTrees.renderFile(built.files.getValue(FossilLoot.PATH)))

        assertEquals(listOf(FossilLoot.Addition("cobblemon:fossils/common/prehistoric_mud_pit", listOf("gravelmon:a_fossil"))), additions)
    }
}
