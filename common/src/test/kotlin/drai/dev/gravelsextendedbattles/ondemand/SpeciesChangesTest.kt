package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

/** The changes route's answer, and applying it to a cached download. */
class SpeciesChangesTest {
    private fun form(game: String, name: String, scale: Double = 1.0) =
        """{"formId":"$game#$name#normal","addedByGame":"$game","source":"gravelmon","species":{"baseScale":$scale},"spawns":[]}"""

    private val cached =
        """{"dataRevision":5,"games":[{"id":"azure","game":"Azure","priority":1}],"forms":[${form("azure", "aguade")},${form("sage", "foliat")},${form("sage", "florabri")}],"statuses":{"sage#foliat#normal":"done","sage#florabri#normal":"missing"}}"""

    private fun delta(body: String) = SpeciesChanges.parse(body) as SpeciesChanges.Delta

    @Test
    fun parse_ADelta() {
        val changes = delta(
            """{"since":5,"dataRevision":7,"full":false,"games":[],"forms":[${form("sage", "foliat", 2.0)}],"removed":["azure#aguade#normal"],"statuses":{"sage#foliat#normal":"none"}}""",
        )

        assertEquals(5, changes.since)
        assertEquals(7, changes.dataRevision)
        assertEquals(listOf("sage#foliat#normal"), changes.forms.map { JsonTrees.string(it, "formId") })
        assertEquals(listOf("azure#aguade#normal"), changes.removed)
        assertEquals(mapOf("sage#foliat#normal" to "none"), changes.statuses)
        assertFalse(changes.isEmpty)
    }

    @Test
    fun parse_NothingChanged_IsEmpty() {
        assertTrue(delta("""{"since":5,"dataRevision":5,"full":false,"games":[],"forms":[],"removed":[]}""").isEmpty)
    }

    @Test
    fun parse_Full() {
        val changes = SpeciesChanges.parse("""{"since":1,"dataRevision":9,"full":true,"reason":"expired"}""")

        assertTrue(changes is SpeciesChanges.Full)
        assertEquals("expired", (changes as SpeciesChanges.Full).reason)
        assertEquals(9, changes.dataRevision)
    }

    @Test
    fun parse_RefusesAnAnswerOfTheWrongShape() {
        assertThrows<JsonParseException> { SpeciesChanges.parse("""{"since":1,"dataRevision":2}""") }
        assertThrows<JsonParseException> { SpeciesChanges.parse("""{"since":1,"dataRevision":2,"full":false,"games":[],"removed":[]}""") }
        assertThrows<JsonParseException> { SpeciesChanges.parse("""{"since":1,"dataRevision":2,"full":false,"games":[],"forms":[{}],"removed":[]}""") }
        assertThrows<JsonParseException> { SpeciesChanges.parse("[]") }
    }

    @Test
    fun apply_ReplacesAddsAndRemovesForms_InTheDownloadsOrder() {
        val changes = delta(
            """{"since":5,"dataRevision":8,"full":false,"games":[{"id":"sage","game":"Sage","priority":2}],"forms":[${form("sage", "foliat", 2.0)},${form("azure", "zzz")}],"removed":["sage#florabri#normal"],"statuses":{"sage#foliat#normal":"missing","azure#zzz#normal":"none"}}""",
        )

        val patched = JsonText.parseStrict(SpeciesChanges.apply(cached, changes)) as JsonObject

        assertEquals(8, patched.get("dataRevision").asLong)
        assertEquals(listOf("sage"), JsonTrees.objects(patched, "games").map { JsonTrees.string(it, "id") })
        val forms = JsonTrees.objects(patched, "forms")
        assertEquals(listOf("azure#aguade#normal", "azure#zzz#normal", "sage#foliat#normal"), forms.map { JsonTrees.string(it, "formId") })
        assertEquals(2.0, forms[2].getAsJsonObject("species").get("baseScale").asDouble)
        assertEquals(mapOf("sage#foliat#normal" to "missing"), JsonTrees.obj(patched, "statuses")!!.entrySet().associate { it.key to it.value.asString })
    }

    @Test
    fun apply_TheResultParsesAsADownload() {
        val changes = delta("""{"since":5,"dataRevision":6,"full":false,"games":[],"forms":[],"removed":["azure#aguade#normal"]}""")

        val species = SelectorData.parseSpecies(SpeciesChanges.apply(cached, changes))

        assertEquals("6", species.dataRevision)
        assertEquals(2, species.forms.size)
        assertTrue(species.hasStatuses)
    }

    @Test
    fun apply_ToADownloadWithoutStatuses_AddsNone_UnlessTheChangesHaveThem() {
        val bare = """{"dataRevision":1,"games":[],"forms":[${form("sage", "foliat")}]}"""
        val changes = delta("""{"since":1,"dataRevision":2,"full":false,"games":[],"forms":[${form("sage", "foliat", 3.0)}],"removed":[]}""")

        val patched = JsonText.parseStrict(SpeciesChanges.apply(bare, changes)) as JsonObject

        assertFalse(patched.has("statuses"))
    }
}
