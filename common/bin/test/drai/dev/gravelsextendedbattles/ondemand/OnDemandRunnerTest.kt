package drai.dev.gravelsextendedbattles.ondemand

import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.net.InetSocketAddress
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.ConcurrentHashMap
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

/** The startup sequence against a local server and a temporary game folder: no Minecraft, no network. */
class OnDemandRunnerTest {
    @TempDir
    lateinit var dir: Path

    private lateinit var server: HttpServer
    private val hits = ConcurrentHashMap<String, Int>()
    private var published = true
    private var refreshRevision = 0
    private var speciesJson = speciesBody()
    private var speciesEtag = "\"s1\""
    private var zipBytes = zipOf()

    private fun form(game: String, name: String) =
        """{"formId":"$game#$name#normal","addedByGame":"$game","source":"gravelmon","folder":"$game/$name","species":{"formId":"$game#$name#normal","origin":{"kind":"species","folder":"$game","file":"$name"},"lang":{"$name.name":"${name.replaceFirstChar { it.uppercase() }}"},"name":"$name"},"spawns":[]}"""

    private fun speciesBody() = """{"dataRevision":5,"games":[],"forms":[${form("sage", "foliat")},${form("azure", "aguade")}]}"""

    private val gamesJson = """{"dataRevision":5,"games":[{"id":"sage","starters":[{"name":"sage_1","order":1,"displayName":"cobblemon.starterselection.category.sage_1","title":"Sage","pokemon":[{"formId":"sage#foliat#normal","properties":"foliat level=10"}]}]}]}"""

    private fun zipOf(): ByteArray {
        val out = java.io.ByteArrayOutputStream()
        ZipOutputStream(out).use { zip ->
            fun entry(name: String, content: String) {
                zip.putNextEntry(ZipEntry(name))
                zip.write(content.toByteArray())
                zip.closeEntry()
            }
            entry("Models-4.0.0/sage/foliat/install.json", """{"files":{"foliat.png":"assets/cobblemon/textures/pokemon/sage/foliat.png","foliat_cry.ogg":"assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg"}}""")
            entry("Models-4.0.0/sage/foliat/foliat.png", "PNG-foliat")
            entry("Models-4.0.0/sage/foliat/foliat_cry.ogg", "OGG-foliat")
            entry("Models-4.0.0/azure/aguade/install.json", """{"files":{"aguade.png":"assets/cobblemon/textures/pokemon/azure/aguade.png"}}""")
            entry("Models-4.0.0/azure/aguade/aguade.png", "PNG-aguade")
        }
        return out.toByteArray()
    }

    private fun HttpExchange.reply(status: Int, body: ByteArray = ByteArray(0), etag: String? = null) {
        if (etag != null) responseHeaders.add("ETag", etag)
        if (status == 304) sendResponseHeaders(status, -1) else {
            sendResponseHeaders(status, body.size.toLong())
            responseBody.write(body)
        }
    }

    private fun route(path: String, handler: (HttpExchange) -> Unit) {
        server.createContext(path) { exchange ->
            hits.merge(path, 1, Int::plus)
            try {
                handler(exchange)
            } finally {
                exchange.close()
            }
        }
    }

    @BeforeEach
    fun start() {
        server = HttpServer.create(InetSocketAddress("localhost", 0), 0)
        route("/api/selector/status") { ex ->
            val body = if (published) """{"version":"4.0.0","published":true,"tag":"v4.0.0","zipUrl":"http://localhost:${server.address.port}/zip","refreshRevision":$refreshRevision}""" else """{"version":"4.0.0","published":false}"""
            ex.reply(200, body.toByteArray())
        }
        route("/api/selector/species") { ex ->
            if (ex.requestHeaders.getFirst("If-None-Match") == speciesEtag) ex.reply(304) else ex.reply(200, speciesJson.toByteArray(), speciesEtag)
        }
        route("/api/selector/games") { ex ->
            if (ex.requestHeaders.getFirst("If-None-Match") == "\"g1\"") ex.reply(304) else ex.reply(200, gamesJson.toByteArray(), "\"g1\"")
        }
        route("/zip") { ex -> ex.reply(200, zipBytes) }
        server.start()
    }

    @AfterEach
    fun stop() = server.stop(0)

    private fun code(g: List<String> = emptyList(), x: List<String> = emptyList()) = Gms3.encode(Gms3.Selection(g, x))

    private class FakePrompt(var answer: String?, val refuseOnce: Boolean = false) : SelectionPrompt {
        val asked = mutableListOf<Pair<String, String?>>()
        val messages = mutableListOf<String>()
        var finished: String? = "not finished"
        override fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String {
            asked += initial to reason
            val text = answer ?: error("No answer prepared")
            check(validate(text) == null) { "The test answer is not valid" }
            return text
        }

        override fun progress(text: String, fraction: Double?) {
            messages += text
        }

        override fun finish(message: String?) {
            finished = message
        }
    }

    private var config = ""

    private fun runner(prompt: SelectionPrompt? = null, dedicated: Boolean = false, rules: String? = "rebalanced", force: Boolean = false): OnDemandRunner {
        val client = ApiClient("http://localhost:${server.address.port}", "test", 1, 1, {})
        return OnDemandRunner(
            OnDemandSettings(dir, "4.0.0", dedicated, rules, { config }, { config = it }, force),
            SelectorApi(client) { true },
            client,
            prompt,
        )
    }

    private val pack get() = dir.resolve("gravelmon/pack")
    private fun exists(relative: String) = Files.exists(pack.resolve(relative))

    @Test
    fun aDedicatedServerWithNoCode_RefusesWithTheInstructions_AndTouchesNothing() {
        val outcome = runner(dedicated = true).run()

        assertTrue(outcome is OnDemandOutcome.Refused)
        val message = (outcome as OnDemandOutcome.Refused).message
        assertTrue(message.contains("https://submit.gravelmon.com/pokemon-selector"))
        assertTrue(message.contains("selectionCode"))
        assertTrue(message.contains("permanently deleted"))
        assertFalse(Files.exists(dir.resolve("gravelmon")))
        assertTrue(hits.isEmpty())
    }

    @Test
    fun aDedicatedServerWithADamagedCode_RefusesAndSaysWhy() {
        config = "GMS2.!!!"

        val outcome = runner(dedicated = true).run() as OnDemandOutcome.Refused

        assertTrue(outcome.message.contains("not valid"))
    }

    @Test
    fun aClientWithNoCode_AsksForOne_SavesIt_AndBuildsThePack() {
        val prompt = FakePrompt(code(g = listOf("azure")))

        val outcome = runner(prompt).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(listOf("" to null), prompt.asked)
        assertEquals(code(g = listOf("azure")), config)
        assertTrue(exists("pack.mcmeta"))
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertFalse(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertTrue(Files.readString(pack.resolve("assets/cobblemon/sounds.json")).contains("pokemon.foliat.cry"))
        assertTrue(Files.readString(pack.resolve("assets/cobblemon/lang/en_us.json")).contains("cobblemon.species.foliat.name"))
        assertTrue(exists("data/gravelmon/starters/sage_1.json"))
        assertNull(prompt.finished)
    }

    @Test
    fun aDamagedCodeOnAClient_IsAskedAgainWithTheReason() {
        config = "GMS2.!!!"
        val prompt = FakePrompt(code())

        runner(prompt).run()

        assertEquals(1, prompt.asked.size)
        assertNotNull(prompt.asked[0].second)
        assertEquals(code(), config)
    }

    @Test
    fun theStateIsWrittenLast_AndAnUnchangedSecondRunDoesNothing() {
        config = code()
        runner().run()
        val state = InstallStateStore.load(dir.resolve("gravelmon/state.json"))
        assertEquals("4.0.0", state.lastDownloadedVersion)
        assertEquals(Gms3.hash(code()), state.codeHash)
        assertEquals("\"s1\"", state.dataRevision)
        assertEquals("\"g1\"", state.gamesEtag)
        assertEquals("rebalanced", state.rulesVariant)
        assertTrue("assets/cobblemon/textures/pokemon/sage/foliat.png" in state.files)
        assertTrue("data/cobblemon/species/sage/foliat.json" in state.generated)
        assertFalse("assets/cobblemon/textures/pokemon/sage/foliat.png" in state.generated)
        assertEquals(1, hits["/zip"])

        val second = runner().run()

        assertTrue(second is OnDemandOutcome.UpToDate, second.toString())
        assertEquals(1, hits["/zip"])
    }

    @Test
    fun aChangedCode_RebuildsFromTheCachedZip_AndNothingOfTheOldSelectionIsLeft() {
        config = code()
        runner().run()
        assertTrue(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))

        config = code(g = listOf("azure"))
        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/zip"], "The zip is not downloaded again")
        assertFalse(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertFalse(Files.exists(dir.resolve("gravelmon/pack.old")))
        assertFalse(Files.exists(dir.resolve("gravelmon/pack.staging")))
    }

    @Test
    fun newData_RebuildsOnlyTheDataFiles_AndKeepsTheModels() {
        config = code()
        runner().run()
        speciesJson = speciesBody().replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":45")
        speciesEtag = "\"s2\""

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/zip"])
        assertTrue(Files.readString(pack.resolve("data/cobblemon/species/sage/foliat.json")).contains("\"catchRate\": 45"))
        assertEquals("OGG-foliat", Files.readString(pack.resolve("assets/gravelmon/sounds/pokemon/sage/foliat_cry.ogg")))
        assertEquals("\"s2\"", InstallStateStore.load(dir.resolve("gravelmon/state.json")).dataRevision)
    }

    private val oldCodeForAzureOff = "GMS2.eyJnIjpbImF6dXJlIl0sIngiOltdfQ"

    @Test
    fun anOldFormatCodeOnAClient_AsksToSelectAgain_AndAnswerKeepsWorking() {
        config = oldCodeForAzureOff
        val prompt = FakePrompt(Gms3.encode(Gms3.decode(oldCodeForAzureOff)))

        val outcome = runner(prompt).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, prompt.asked.size)
        assertEquals(oldCodeForAzureOff, prompt.asked[0].first)
        assertTrue(prompt.asked[0].second!!.contains("GMS3"))
        assertEquals(Gms3.encode(Gms3.decode(oldCodeForAzureOff)), config, "The new code replaces the old one")
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
    }

    @Test
    fun anOldFormatCodeThePlayerKeeps_IsLeftInTheConfig_AndStillWorks() {
        config = oldCodeForAzureOff
        val prompt = FakePrompt(oldCodeForAzureOff)

        val outcome = runner(prompt).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(oldCodeForAzureOff, config)
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
    }

    @Test
    fun anOldFormatCodeOnAServer_IsLoggedNotAsked_AndStillWorks() {
        config = oldCodeForAzureOff
        val messages = mutableListOf<String>()
        val client = ApiClient("http://localhost:${server.address.port}", "test", 1, 1, {})

        val outcome = OnDemandRunner(
            OnDemandSettings(dir, "4.0.0", true, "rebalanced", { config }, { config = it }),
            SelectorApi(client) { true },
            client,
            null,
            { messages += it },
        ).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(messages.any { it.contains("old format") })
        assertEquals(oldCodeForAzureOff, config)
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
    }

    @Test
    fun aNewFormatCode_IsNeverAskedAbout() {
        config = code()
        val prompt = FakePrompt(null)

        runner(prompt).run()

        assertTrue(prompt.asked.isEmpty())
    }

    @Test
    fun aStatusThatChangesOnTheSite_InstallsTheModelsFromTheCachedZip_WithoutANewCode() {
        config = Gms3.encode(Gms3.Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList()))
        speciesJson = speciesBody().dropLast(1) + ""","statuses":{"sage#foliat#normal":"done"}}"""
        runner().run()
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertFalse(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))

        speciesJson = speciesBody().dropLast(1) + ""","statuses":{"sage#foliat#normal":"done","azure#aguade#normal":"done"}}"""
        speciesEtag = "\"s2\""
        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/zip"], "The zip is not downloaded again")
        assertTrue(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertTrue(exists("data/cobblemon/species/azure/aguade.json"))
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
    }

    @Test
    fun aDownloadWithoutStatuses_IgnoresTheStatusChoice_InsteadOfDroppingEveryPokemon() {
        config = Gms3.encode(Gms3.Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList()))
        val messages = mutableListOf<String>()
        val client = ApiClient("http://localhost:${server.address.port}", "test", 1, 1, {})

        val outcome = OnDemandRunner(
            OnDemandSettings(dir, "4.0.0", false, "rebalanced", { config }, { config = it }),
            SelectorApi(client) { true },
            client,
            null,
            { messages += it },
        ).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertTrue(exists("data/cobblemon/species/azure/aguade.json"))
        assertTrue(messages.any { it.contains("status choice") })
    }

    @Test
    fun aPokemonThatLosesItsStatus_IsRemovedWithItsModels() {
        config = Gms3.encode(Gms3.Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList()))
        speciesJson = speciesBody().dropLast(1) + ""","statuses":{"sage#foliat#normal":"done","azure#aguade#normal":"done"}}"""
        runner().run()
        assertTrue(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))

        speciesJson = speciesBody().dropLast(1) + ""","statuses":{"sage#foliat#normal":"done"}}"""
        speciesEtag = "\"s2\""
        runner().run()

        assertFalse(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
    }

    @Test
    fun changedRules_RebuildTheData() {
        config = code()
        runner(rules = "faithful").run()

        val outcome = runner(rules = "rebalanced").run()

        assertTrue(outcome is OnDemandOutcome.Built)
        assertEquals("rebalanced", InstallStateStore.load(dir.resolve("gravelmon/state.json")).rulesVariant)
    }

    @Test
    fun aForcedUpdate_DownloadsEverythingAgain_EvenWhenNothingChanged() {
        config = code()
        runner().run()
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
        val zipHits = hits["/zip"]
        zipBytes = zipOf() // the same models, edited by hand in the repository
        Files.deleteIfExists(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"))

        val outcome = runner(force = true).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(zipHits!! + 1, hits["/zip"])
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
    }

    @Test
    fun whenTheSiteRaisesTheRefreshRevision_TheModelsAreDownloadedAgain_OnceOnly() {
        config = code()
        runner().run()
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
        val zipHits = hits["/zip"]!!
        refreshRevision = 1
        Files.deleteIfExists(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"))

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(zipHits + 1, hits["/zip"])
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertEquals(1, InstallStateStore.load(dir.resolve("gravelmon/state.json")).refreshRevision)
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
        assertEquals(zipHits + 1, hits["/zip"])
    }

    @Test
    fun aDedicatedServerBuildsOnlyData_WithoutTheZip() {
        config = code()

        val outcome = runner(dedicated = true).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertNull(hits["/zip"])
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertFalse(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertNull(InstallStateStore.load(dir.resolve("gravelmon/state.json")).lastDownloadedVersion)
    }

    @Test
    fun whenTheSiteCannotBeReached_TheOldPackStays() {
        config = code()
        runner().run()
        server.stop(0)

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.KeptOld, outcome.toString())
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertNotNull((outcome as OnDemandOutcome.KeptOld).packDir)
    }

    @Test
    fun whenTheSiteCannotBeReachedAndNothingIsInstalled_ThereIsNoPack() {
        config = code()
        server.stop(0)

        val outcome = runner().run() as OnDemandOutcome.KeptOld

        assertNull(outcome.packDir)
    }

    @Test
    fun aVersionThatIsNotPublished_KeepsWhatIsThere() {
        config = code()
        runner().run()
        published = false

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.KeptOld)
        assertTrue((outcome as OnDemandOutcome.KeptOld).reason.contains("published"))
    }

    @Test
    fun aBrokenZip_KeepsTheOldPack_AndTheStateIsNotChanged() {
        config = code()
        runner().run()
        val before = Files.readString(dir.resolve("gravelmon/state.json"))
        zipBytes = "this is not a zip".toByteArray()
        Files.delete(dir.resolve("gravelmon/cache/models-4.0.0.zip"))
        config = code(g = listOf("azure"))

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.KeptOld, outcome.toString())
        assertEquals(before, Files.readString(dir.resolve("gravelmon/state.json")))
        assertTrue(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertFalse(Files.exists(dir.resolve("gravelmon/pack.staging")))
    }

    @Test
    fun theProgressIsReportedToThePrompt() {
        config = code()
        val prompt = FakePrompt(null)

        runner(prompt).run()

        assertTrue(prompt.messages.any { it.startsWith("Downloading") })
        assertTrue(prompt.messages.contains("Installing…"))
    }
}
