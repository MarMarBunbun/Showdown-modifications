package drai.dev.gravelsextendedbattles.ondemand

import drai.dev.gravelsextendedbattles.ondemand.Gms3.ErrorCode
import drai.dev.gravelsextendedbattles.ondemand.Gms3.Selection
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource
import java.util.Base64
import java.util.stream.Stream

class Gms3Test {
    companion object {
        private val ALL = Gms3.Status.ALL

        /** The vectors of docs/selector-client-contract.md, produced by the site's encoder (`TEST_VECTORS` of `gms3.test.ts`). */
        @JvmStatic
        fun vectors(): Stream<Arguments> = Stream.of(
            Arguments.of(
                Selection(emptyList(), ALL, emptyList(), emptyList()),
                "GMS3.eyJnIjpbXSwicyI6WyJkb25lIiwibWlzc2luZyIsIm5vbmUiXSwiaSI6W10sIngiOltdfQ",
            ),
            Arguments.of(
                Selection(listOf("soulstones"), ALL, emptyList(), emptyList()),
                "GMS3.eyJnIjpbInNvdWxzdG9uZXMiXSwicyI6WyJkb25lIiwibWlzc2luZyIsIm5vbmUiXSwiaSI6W10sIngiOltdfQ",
            ),
            Arguments.of(
                Selection(emptyList(), ALL, emptyList(), listOf("soulstones#chinchou#epoch")),
                "GMS3.eyJnIjpbXSwicyI6WyJkb25lIiwibWlzc2luZyIsIm5vbmUiXSwiaSI6W10sIngiOlsic291bHN0b25lcyNjaGluY2hvdSNlcG9jaCJdfQ",
            ),
            // Input order is not the code's order: the lists are sorted.
            Arguments.of(
                Selection(listOf("sage", "azure"), ALL, emptyList(), listOf("sage#foliat#normal", "azure#aguade#normal", "soulstones#chinchou#epoch")),
                "GMS3.eyJnIjpbImF6dXJlIiwic2FnZSJdLCJzIjpbImRvbmUiLCJtaXNzaW5nIiwibm9uZSJdLCJpIjpbXSwieCI6WyJhenVyZSNhZ3VhZGUjbm9ybWFsIiwic2FnZSNmb2xpYXQjbm9ybWFsIiwic291bHN0b25lcyNjaGluY2hvdSNlcG9jaCJdfQ",
            ),
            Arguments.of(
                Selection(listOf("é"), ALL, emptyList(), emptyList()),
                "GMS3.eyJnIjpbIsOpIl0sInMiOlsiZG9uZSIsIm1pc3NpbmciLCJub25lIl0sImkiOltdLCJ4IjpbXX0",
            ),
            Arguments.of(
                Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList()),
                "GMS3.eyJnIjpbXSwicyI6WyJkb25lIl0sImkiOltdLCJ4IjpbXX0",
            ),
            Arguments.of(
                Selection(emptyList(), setOf(Gms3.Status.DONE, Gms3.Status.MISSING), listOf("sage#foliat#normal"), listOf("azure#aguade#normal")),
                "GMS3.eyJnIjpbXSwicyI6WyJkb25lIiwibWlzc2luZyJdLCJpIjpbInNhZ2UjZm9saWF0I25vcm1hbCJdLCJ4IjpbImF6dXJlI2FndWFkZSNub3JtYWwiXX0",
            ),
            Arguments.of(
                Selection(listOf("sage"), emptySet(), listOf("soulstones#chinchou#epoch"), emptyList()),
                "GMS3.eyJnIjpbInNhZ2UiXSwicyI6W10sImkiOlsic291bHN0b25lcyNjaGluY2hvdSNlcG9jaCJdLCJ4IjpbXX0",
            ),
        )

        /** The old `GMS2.` codes that are still read (`LEGACY_VECTORS` of the site's test). */
        @JvmStatic
        fun legacyVectors(): Stream<Arguments> = Stream.of(
            Arguments.of("GMS2.eyJnIjpbXSwieCI6W119", Selection(emptyList(), ALL, emptyList(), emptyList())),
            Arguments.of(
                "GMS2.eyJnIjpbImF6dXJlIiwic2FnZSJdLCJ4IjpbImF6dXJlI2FndWFkZSNub3JtYWwiLCJzYWdlI2ZvbGlhdCNub3JtYWwiLCJzb3Vsc3RvbmVzI2NoaW5jaG91I2Vwb2NoIl19",
                Selection(listOf("azure", "sage"), ALL, emptyList(), listOf("azure#aguade#normal", "sage#foliat#normal", "soulstones#chinchou#epoch")),
            ),
        )

        @JvmStatic
        fun malformed(): Stream<Arguments> = Stream.of(
            Arguments.of("", ErrorCode.NOT_A_CODE),
            Arguments.of("hello", ErrorCode.NOT_A_CODE),
            Arguments.of("GMS1.eyJnIjpbXX0", ErrorCode.NOT_A_CODE),
            Arguments.of("gms3.eyJnIjpbXSwieCI6W119", ErrorCode.NOT_A_CODE),
            Arguments.of("GMS3.", ErrorCode.BAD_JSON),
            Arguments.of("GMS3.e", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS3._w", ErrorCode.BAD_JSON),
            Arguments.of("GMS2.", ErrorCode.BAD_JSON),
            Arguments.of("GMS2.e", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS2.eyJn+/==", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS2.eyJn IjpbXX0", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS2.!!!!", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS2.eyJnIjpbXSwieCI6W119=", ErrorCode.BAD_ENCODING),
            Arguments.of("GMS2._w", ErrorCode.BAD_JSON), // invalid UTF-8
        )

        @JvmStatic
        fun shapes(): Stream<Arguments> = Stream.of(
            Arguments.of("null", ErrorCode.BAD_SHAPE),
            Arguments.of("[]", ErrorCode.BAD_SHAPE),
            Arguments.of("\"text\"", ErrorCode.BAD_SHAPE),
            Arguments.of("5", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"g\":\"sage\"}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"g\":{}}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"x\":5}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"s\":\"done\"}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"i\":{}}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"s\":[\"done\",\"almost\"]}", ErrorCode.BAD_ID),
            Arguments.of("{\"s\":[1]}", ErrorCode.BAD_ID),
            Arguments.of("{\"i\":[\"\"]}", ErrorCode.BAD_ID),
            Arguments.of("{\"g\":null}", ErrorCode.BAD_SHAPE),
            Arguments.of("{\"g\":[1]}", ErrorCode.BAD_ID),
            Arguments.of("{\"g\":[null]}", ErrorCode.BAD_ID),
            Arguments.of("{\"x\":[[\"a\"]]}", ErrorCode.BAD_ID),
            Arguments.of("{\"x\":[\"\"]}", ErrorCode.BAD_ID),
            Arguments.of("{\"g\":[{}]}", ErrorCode.BAD_ID),
            Arguments.of("{\"g\":[", ErrorCode.BAD_JSON),
            Arguments.of("not json", ErrorCode.BAD_JSON),
            Arguments.of("{\"g\":[]} trailing", ErrorCode.BAD_JSON),
            Arguments.of("{\"g\":[],}", ErrorCode.BAD_JSON),
            Arguments.of("{g:[]}", ErrorCode.BAD_JSON),
            Arguments.of("1],[2", ErrorCode.BAD_JSON),
        )
    }

    private fun raw(json: String) = Gms3.PREFIX + Base64.getUrlEncoder().withoutPadding().encodeToString(json.toByteArray(Charsets.UTF_8))

    private fun codeOf(text: String): ErrorCode? = try {
        Gms3.decode(text)
        null
    } catch (e: Gms3.Gms3Exception) {
        e.code
    }

    @ParameterizedTest
    @MethodSource("vectors")
    fun encode_ReproducesTheSiteVectors(selection: Selection, code: String) {
        assertEquals(code, Gms3.encode(selection))
    }

    @ParameterizedTest
    @MethodSource("vectors")
    fun decode_ReadsTheSiteVectors_SortedAndDeduplicated(selection: Selection, code: String) {
        assertEquals(Selection(selection.g.sorted(), selection.s, selection.i.sorted(), selection.x.sorted()), Gms3.decode(code))
    }

    @ParameterizedTest
    @MethodSource("legacyVectors")
    fun decode_ReadsAnOldGms2Code_AsALayeredSelection(code: String, expected: Selection) {
        assertEquals(expected, Gms3.decode(code))
        assertTrue(Gms3.isLegacy(code))
        assertTrue(Gms3.encode(Gms3.decode(code)).startsWith(Gms3.PREFIX))
    }

    @Test
    fun isLegacy_IsTrueOnlyForTheOldPrefix() {
        assertTrue(Gms3.isLegacy("  GMS2.abc "))
        assertTrue(!Gms3.isLegacy(Gms3.encode(Selection.EMPTY)))
        assertTrue(!Gms3.isLegacy(null))
        assertTrue(!Gms3.isLegacy(""))
    }

    @Test
    fun canonical_OfAnOldCode_IsTheEquivalentNewCode() {
        val old = "GMS2.eyJnIjpbInNhZ2UiXSwieCI6W119"

        assertEquals(Gms3.encode(Selection(listOf("sage"), emptyList())), Gms3.canonical(old))
        assertEquals(Gms3.hash(Gms3.canonical(old)), Gms3.hash(old))
    }

    @Test
    fun decode_IgnoresSurroundingWhitespace_UnknownKeys_AndMissingLists() {
        assertEquals(Selection.EMPTY, Gms3.decode("  ${raw("{}")}\n"))
        assertEquals(Selection(listOf("a"), emptyList()), Gms3.decode(raw("{\"g\":[\"a\"],\"later\":{\"y\":1}}")))
        assertEquals(Selection(listOf("a"), emptyList()), Gms3.decode(raw("{\"g\":[\"a\",\"a\"],\"x\":[]}")))
    }

    @ParameterizedTest
    @MethodSource("malformed")
    fun decode_RejectsMalformedText(text: String, expected: ErrorCode) {
        assertEquals(expected, codeOf(text))
    }

    @ParameterizedTest
    @MethodSource("shapes")
    fun decode_RejectsWrongJson(json: String, expected: ErrorCode) {
        assertEquals(expected, codeOf(raw(json)))
    }

    @Test
    fun decode_RefusesAnOversizedCodeBeforeDecodingIt() {
        assertEquals(ErrorCode.TOO_LONG, codeOf(Gms3.PREFIX + "A".repeat(Gms3.MAX_CODE_LENGTH)))
    }

    @Test
    fun decode_RefusesTooManyGamesOrForms() {
        val games = (0..Gms3.MAX_GAMES).joinToString(",") { "\"g$it\"" }
        val forms = (0..Gms3.MAX_FORMS).joinToString(",") { "\"f$it\"" }
        assertEquals(ErrorCode.TOO_MANY, codeOf(raw("{\"g\":[$games]}")))
        assertEquals(ErrorCode.TOO_MANY, codeOf(raw("{\"x\":[$forms]}")))
        assertEquals(ErrorCode.TOO_MANY, codeOf(raw("{\"i\":[$forms]}")))
    }

    @Test
    fun decode_RefusesAnOverlongId_ButAcceptsTheLimit() {
        assertEquals(ErrorCode.BAD_ID, codeOf(raw("{\"g\":[\"${"a".repeat(Gms3.MAX_ID_LENGTH + 1)}\"]}")))
        assertNull(codeOf(raw("{\"g\":[\"${"a".repeat(Gms3.MAX_ID_LENGTH)}\"]}")))
    }

    @Test
    fun decode_NeverThrowsAnythingButGms3Exception_OnRandomText() {
        val alphabet = "GMS23.abcxyzABC019-_=+/ {}[]\":,é"
        val random = java.util.Random(7)
        repeat(2000) {
            val text = listOf("", "GMS2.", "GMS3.")[random.nextInt(3)] + String(CharArray(random.nextInt(40)) { alphabet[random.nextInt(alphabet.length)] })
            try {
                Gms3.decode(text)
            } catch (e: Gms3.Gms3Exception) {
                // expected
            }
        }
    }

    @Test
    fun tryDecode_ReturnsNullInsteadOfThrowing() {
        assertNull(Gms3.tryDecode("nope"))
        assertNull(Gms3.tryDecode(null))
        assertEquals(Selection.EMPTY, Gms3.tryDecode("GMS2.eyJnIjpbXSwieCI6W119"))
    }

    @Test
    fun canonical_AndHash_IgnoreHowTheSameSelectionWasWritten() {
        val sorted = Gms3.encode(Selection(listOf("a", "b"), emptyList()))
        val shuffled = raw("{\"x\":[],\"g\":[\"b\",\"a\",\"a\"]}")

        assertEquals(sorted, Gms3.canonical(shuffled))
        assertEquals(Gms3.hash(sorted), Gms3.hash(shuffled))
        assertNotEquals(Gms3.hash(sorted), Gms3.hash(Gms3.encode(Selection(listOf("a"), emptyList()))))
        assertNull(Gms3.hash("garbage"))
        assertEquals(64, Gms3.hash(sorted)!!.length)
    }

    @Test
    fun resolve_EnablesWhatIsNotListed_IgnoresVanilla_AndReportsUnknownIds() {
        val forms = listOf(
            Gms3.SelectableForm("sage#foliat#normal", "sage", Gms3.Source.GRAVELMON),
            Gms3.SelectableForm("sage#florabri#normal", "sage", Gms3.Source.GRAVELMON),
            Gms3.SelectableForm("azure#aguade#normal", "azure", Gms3.Source.GRAVELMON),
            Gms3.SelectableForm("pokemon#abomasnow#normal", "pokemon", Gms3.Source.COBBLEMON),
        )

        val resolved = Gms3.resolve(Selection(listOf("azure", "gone"), listOf("sage#foliat#normal", "gone#x#normal")), forms)

        assertEquals(listOf("sage#florabri#normal"), resolved.enabled.map { it.formId })
        assertEquals(listOf("sage#foliat#normal", "azure#aguade#normal").sorted(), resolved.disabled.map { it.formId }.sorted())
        assertEquals(listOf("gone"), resolved.unknownGames)
        assertEquals(listOf("gone#x#normal"), resolved.unknownForms)
        assertTrue(resolved.enabled.none { it.source == Gms3.Source.COBBLEMON })
    }

    private fun layered() = listOf(
        Gms3.SelectableForm("sage#foliat#normal", "sage", Gms3.Source.GRAVELMON, status = Gms3.Status.DONE),
        Gms3.SelectableForm("sage#florabri#normal", "sage", Gms3.Source.GRAVELMON, status = Gms3.Status.MISSING),
        Gms3.SelectableForm("sage#floressum#normal", "sage", Gms3.Source.GRAVELMON, status = Gms3.Status.NONE),
        Gms3.SelectableForm("azure#aguade#normal", "azure", Gms3.Source.GRAVELMON, status = Gms3.Status.DONE),
        Gms3.SelectableForm("azure#aqua#normal", "azure", Gms3.Source.GRAVELMON),
    )

    private fun enabledIds(selection: Selection) = Gms3.resolve(selection, layered()).enabled.map { it.formId }

    @Test
    fun resolve_TheStatusLayerKeepsOnlyTheEnabledStatuses_AndAFormWithoutOneIsNone() {
        assertEquals(listOf("sage#foliat#normal", "azure#aguade#normal"), enabledIds(Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList())))
        assertEquals(3, enabledIds(Selection(emptyList(), setOf(Gms3.Status.DONE, Gms3.Status.MISSING), emptyList(), emptyList())).size)
        assertEquals(listOf("sage#floressum#normal", "azure#aqua#normal"), enabledIds(Selection(emptyList(), setOf(Gms3.Status.NONE), emptyList(), emptyList())))
        assertEquals(emptyList<String>(), enabledIds(Selection(emptyList(), emptySet(), emptyList(), emptyList())))
    }

    @Test
    fun resolve_AFormWhoseStatusChangesLater_IsKeptWithoutANewCode() {
        val selection = Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList())
        val finished = layered().map { if (it.formId == "sage#floressum#normal") it.copy(status = Gms3.Status.DONE) else it }

        assertTrue("sage#floressum#normal" !in Gms3.resolve(selection, layered()).enabled.map { it.formId })
        assertTrue("sage#floressum#normal" in Gms3.resolve(selection, finished).enabled.map { it.formId })
    }

    @Test
    fun resolve_AlwaysOnWinsOverGamesAndStatuses_AlwaysOffWinsOverEverything() {
        val alwaysOn = Selection(listOf("sage"), setOf(Gms3.Status.DONE), listOf("sage#floressum#normal"), emptyList())
        assertEquals(listOf("sage#floressum#normal", "azure#aguade#normal"), enabledIds(alwaysOn))

        val both = Selection(emptyList(), Gms3.Status.ALL, listOf("sage#foliat#normal"), listOf("sage#foliat#normal", "azure#aguade#normal"))
        assertTrue("sage#foliat#normal" !in enabledIds(both))
        assertTrue("azure#aguade#normal" !in enabledIds(both))
    }

    @Test
    fun resolve_ReportsUnknownAlwaysOnIds() {
        val resolved = Gms3.resolve(Selection(emptyList(), Gms3.Status.ALL, listOf("gone#x#normal"), emptyList()), layered())

        assertEquals(listOf("gone#x#normal"), resolved.unknownForms)
    }

    @Test
    fun selectableForm_TakesTheStatusFromTheDownloadsMap_AndDefaultsToNone() {
        val form = JsonText.parseStrict("""{"formId":"sage#foliat#normal","addedByGame":"sage","source":"gravelmon"}""") as com.google.gson.JsonObject

        assertEquals(Gms3.Status.DONE, SelectorData.selectableForm(form, mapOf("sage#foliat#normal" to "done"))!!.status)
        assertEquals(Gms3.Status.NONE, SelectorData.selectableForm(form, emptyMap())!!.status)
        assertEquals(Gms3.Status.NONE, SelectorData.selectableForm(form, mapOf("sage#foliat#normal" to "bogus"))!!.status)
    }

    @Test
    fun parseSpecies_ReadsTheStatusesMap() {
        val species = SelectorData.parseSpecies(
            """{"dataRevision":1,"games":[],"forms":[{"formId":"a#b#normal","addedByGame":"a","source":"gravelmon"}],"statuses":{"a#b#normal":"missing"}}""",
        )

        assertEquals(Gms3.Status.MISSING, species.selectableForms().single().status)
    }
}
