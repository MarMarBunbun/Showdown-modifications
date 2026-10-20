package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.nio.file.Files
import java.nio.file.Path

class JsonTextTest {
    @Test
    fun render_MatchesJsonStringify_Compact() {
        val value = linkedMapOf("g" to listOf("é", "a\"b", "c\\d", "line\nbreak", "\u0001"), "n" to 0.8, "i" to 3, "b" to true, "z" to null)

        assertEquals("{\"g\":[\"é\",\"a\\\"b\",\"c\\\\d\",\"line\\nbreak\",\"\\u0001\"],\"n\":0.8,\"i\":3,\"b\":true,\"z\":null}", JsonText.render(value))
    }

    @Test
    fun render_TwoSpaceIndent_EmptyContainersStayOnOneLine() {
        val value = linkedMapOf("a" to listOf(1, 2), "b" to emptyMap<String, Any>(), "c" to emptyList<Int>(), "d" to linkedMapOf("e" to "f"))

        assertEquals("{\n  \"a\": [\n    1,\n    2\n  ],\n  \"b\": {},\n  \"c\": [],\n  \"d\": {\n    \"e\": \"f\"\n  }\n}", JsonText.render(value, 2))
    }

    @Test
    fun render_WholeDoublesHaveNoDecimalPoint() {
        assertEquals("[1,2,0.5]", JsonText.render(listOf(1.0, 2.0, 0.5)))
    }

    @Test
    fun parseStrict_AcceptsAnyTopLevelValue() {
        assertTrue(JsonText.parseStrict("5").isJsonPrimitive)
        assertTrue(JsonText.parseStrict("null").isJsonNull)
        assertTrue(JsonText.parseStrict(" {\"a\": [1, 2]} ").isJsonObject)
    }

    @Test
    fun parseStrict_RejectsWhatTheSiteRejects() {
        for (bad in listOf("", "{", "{\"a\":1,}", "{a:1}", "{\"a\":1} x", "1,2", "1],[2", "'x'", "// c\n{}", "{\"a\":01}")) {
            assertThrows(JsonParseException::class.java, { JsonText.parseStrict(bad) }, bad)
        }
    }
}

class InstallManifestTest {
    private fun parse(json: String) = InstallManifests.parse(json)
    private fun rejects(json: String) = assertThrows(InstallManifestException::class.java) { parse(json) }

    @Test
    fun parse_ReadsFilesAndUses() {
        val manifest = parse("""{"files":{"a.png":"assets/cobblemon/textures/pokemon/x/a.png"},"uses":["sage/foliat/foliat.png"]}""")

        assertEquals(mapOf("a.png" to "assets/cobblemon/textures/pokemon/x/a.png"), manifest.files)
        assertEquals(listOf("sage/foliat/foliat.png"), manifest.uses)
    }

    @Test
    fun parse_RefusesPathsThatCouldLeaveThePack() {
        for (path in listOf("../x.png", "assets/../x.png", "/etc/passwd", "assets/a/../../b.png", "C:/x.png", "assets\\x\\y.png", "data/x/y.json", "assets/x", "assets//x/y.png", "assets/./x/y.png")) {
            rejects("""{"files":{"a.png":${JsonText.render(path)}}}""")
        }
    }

    @Test
    fun parse_RefusesBadNamesAndShapes() {
        rejects("[]")
        rejects("""{"files":{}}""")
        rejects("""{"files":{"../a.png":"assets/a/b/c.png"}}""")
        rejects("""{"files":{"a/b.png":"assets/a/b/c.png"}}""")
        rejects("""{"files":{"install.json":"assets/a/b/c.png"}}""")
        rejects("""{"files":{"A.png":"assets/a/b/c.png","a.png":"assets/a/b/d.png"}}""")
        rejects("""{"files":{"a.png":"assets/a/b/c.png","b.png":"assets/a/b/c.png"}}""")
        rejects("""{"files":{"a.png":"assets/a/b/c.png"},"extra":1}""")
        rejects("""{"files":{"a.png":"assets/a/b/c.png"},"uses":["not-a-path"]}""")
        rejects("""{"files":{"a.png":"assets/a/b/c.png"},"uses":["a/b/c.png","a/b/c.png"]}""")
        rejects("""{"files":{"a.png":5}}""")
        rejects("not json")
    }

    @Test
    fun theMismatchedFolder_IsRecognised() {
        assertTrue(InstallManifests.isMismatchedPath("sage/.mismatched"))
        assertTrue(InstallManifests.isMismatchedPath("sage/.mismatched/x.png"))
        assertFalse(InstallManifests.isMismatchedPath("sage/foliat"))
    }
}

class SoundsJsonBuilderTest {
    private fun cry(game: String, name: String) = "assets/gravelmon/sounds/pokemon/$game/${name}_cry.ogg"

    @Test
    fun cryEvent_ReadsTheGameAndName() {
        assertEquals(SoundsJsonBuilder.CryEvent("pokemon.foliat.cry", "gravelmon:pokemon/sage/foliat_cry"), SoundsJsonBuilder.cryEvent(cry("sage", "foliat")))
        assertNull(SoundsJsonBuilder.cryEvent("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertNull(SoundsJsonBuilder.cryEvent("assets/gravelmon/sounds/pokemon/sage/foliat.ogg"))
        assertNull(SoundsJsonBuilder.cryEvent("assets/gravelmon/sounds/pokemon/sage/sub/foliat_cry.ogg"))
    }

    @Test
    fun generate_IgnoresOtherFiles_AndSortsByKey() {
        val events = SoundsJsonBuilder.generate(listOf(cry("sage", "foliat"), "assets/x/y/z.png", cry("azure", "aguade")))

        assertEquals(listOf("pokemon.aguade.cry", "pokemon.foliat.cry"), events.keys.toList())
    }

    @Test
    fun generate_TwoCriesForOneKey_IsAnError() {
        assertThrows(IllegalStateException::class.java) { SoundsJsonBuilder.generate(listOf(cry("sage", "foliat"), cry("azure", "foliat"))) }
    }

    @Test
    fun render_IsTheSitesTextExactly() {
        val text = SoundsJsonBuilder.render(SoundsJsonBuilder.generate(listOf(cry("sage", "foliat"))))

        assertEquals(
            "{\n  \"pokemon.foliat.cry\": {\n    \"sounds\": [\n      {\n        \"name\": \"gravelmon:pokemon/sage/foliat_cry\",\n        \"volume\": 0.8\n      }\n    ]\n  }\n}\n",
            text,
        )
        assertEquals("{}\n", SoundsJsonBuilder.render(SoundsJsonBuilder.generate(emptyList())))
    }
}

class InstallStateTest {
    @TempDir
    lateinit var dir: Path

    @Test
    fun saveThenLoad_RoundTrips_WithSortedFiles() {
        val file = dir.resolve("sub/state.json")
        InstallStateStore.save(file, InstallState("4.0.0", "abc", "\"etag\"", "rebalanced", listOf("assets/b", "assets/a")))

        assertEquals(InstallState("4.0.0", "abc", "\"etag\"", "rebalanced", listOf("assets/a", "assets/b")), InstallStateStore.load(file))
        assertFalse(Files.exists(dir.resolve("sub/state.json.tmp")))
    }

    @Test
    fun load_AMissingOrDamagedFile_IsEmpty() {
        assertEquals(InstallState.EMPTY, InstallStateStore.load(dir.resolve("none.json")))
        Files.writeString(dir.resolve("bad.json"), "{not json")
        assertEquals(InstallState.EMPTY, InstallStateStore.load(dir.resolve("bad.json")))
        Files.writeString(dir.resolve("array.json"), "[1,2]")
        assertEquals(InstallState.EMPTY, InstallStateStore.load(dir.resolve("array.json")))
    }

    @Test
    fun load_IgnoresValuesOfTheWrongType() {
        Files.writeString(dir.resolve("odd.json"), """{"lastDownloadedVersion":5,"codeHash":"h","files":["a",1,null]}""")

        assertEquals(InstallState(null, "h", null, null, listOf("a")), InstallStateStore.load(dir.resolve("odd.json")))
    }

    @Test
    fun versions_ReduceAndCompare() {
        assertEquals("4.0.0", Versions.release("4.0.0-Alpha.9"))
        assertEquals("4.0.1", Versions.release("4.0.1"))
        assertNull(Versions.release("dev"))
        assertNull(Versions.release("4.0"))
        assertTrue(Versions.compare("4.0.0", "4.0.1") < 0)
        assertTrue(Versions.compare("4.10.0", "4.9.9") > 0)
        assertEquals(0, Versions.compare("4.0.0", "4.0.0"))
    }

    @Test
    fun staleness_ZipNeeded_OnlyForANewerVersionOrANewCode() {
        val state = InstallState("4.0.0", "h1")

        assertTrue(Staleness.zipNeeded(InstallState.EMPTY, "4.0.0", "h1"))
        assertFalse(Staleness.zipNeeded(state, "4.0.0", "h1"))
        assertTrue(Staleness.zipNeeded(state, "4.0.1", "h1"))
        assertTrue(Staleness.zipNeeded(state, "4.0.0", "h2"))
        assertFalse(Staleness.zipNeeded(state, "3.9.0", "h1")) // a downgrade does not download
    }

    @Test
    fun staleness_DataNeeded_WhenTheRevisionTheCodeOrTheRulesChange() {
        val state = InstallState("4.0.0", "h1", "e1", "rebalanced")

        assertFalse(Staleness.dataNeeded(state, "e1", "h1", "rebalanced"))
        assertTrue(Staleness.dataNeeded(state, "e2", "h1", "rebalanced"))
        assertTrue(Staleness.dataNeeded(state, "e1", "h2", "rebalanced"))
        assertTrue(Staleness.dataNeeded(state, "e1", "h1", "faithful"))
        assertTrue(Staleness.dataNeeded(InstallState.EMPTY, null, "h1", "rebalanced"))
    }
}
