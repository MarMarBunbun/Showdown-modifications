package drai.dev.gravelsextendedbattles.ondemand

import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertThrows
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
    /** What `GET /api/selector/species/changes` answers: by default "download everything", as an old log would. */
    private var changesStatus = 200
    private var changesJson: (Long) -> String = { since -> """{"since":$since,"dataRevision":5,"full":true,"reason":"expired"}""" }
    private val changesAsked = mutableListOf<String>()
    /** The site is blocked: every `/api` request is refused, as a block page would. The zips (GitHub in real life) still answer. */
    private var siteDown = false
    /** What `GET /api/selector/items` answers; null is a site without the route (404). */
    private var itemsJson: String? = null
    private var itemsEtag = "\"i1\""

    private val itemsBody = """{"dataRevision":5,"items":[""" +
        """{"id":"gravelmon:long_club","name":"long_club","texture":"gravelmon:item/long_club","definition":{"type":"held_item","displayNames":{"en_us":"Long Club"},"recipes":[{"type":"crafting_shaped","pattern":["B","B"],"key":{"B":{"item":"minecraft:bone"}},"count":1}]}},""" +
        """{"id":"gravelmon:regalientite","name":"regalientite","texture":"gravelmon:item/megastones/regalientite","definition":{"type":"mega_stone","displayNames":{"en_us":"Regalientite"}}}""" +
        """]}"""

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
            entry("Models-4.0.0/_items/long_club/install.json", """{"files":{"long_club.png":"assets/gravelmon/textures/item/long_club.png"}}""")
            entry("Models-4.0.0/_items/long_club/long_club.png", "PNG-long-club")
            entry("Models-4.0.0/_items/regalientite/install.json", """{"files":{"regalientite.png":"assets/gravelmon/textures/item/megastones/regalientite.png"}}""")
            entry("Models-4.0.0/_items/regalientite/regalientite.png", "PNG-regalientite")
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
                if (siteDown && path.startsWith("/api")) exchange.reply(403) else handler(exchange)
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
        route("/api/selector/species/changes") { ex ->
            val since = ex.requestURI.query.orEmpty().substringAfter("since=").substringBefore('&')
            changesAsked += since
            ex.reply(changesStatus, changesJson(since.toLong()).toByteArray())
        }
        route("/api/selector/games") { ex ->
            if (ex.requestHeaders.getFirst("If-None-Match") == "\"g1\"") ex.reply(304) else ex.reply(200, gamesJson.toByteArray(), "\"g1\"")
        }
        route("/api/selector/items") { ex ->
            val body = itemsJson
            when {
                body == null -> ex.reply(404)
                ex.requestHeaders.getFirst("If-None-Match") == itemsEtag -> ex.reply(304)
                else -> ex.reply(200, body.toByteArray(), itemsEtag)
            }
        }
        route("/zip") { ex -> ex.reply(200, zipBytes) }
        route("/tagzip") { ex -> ex.reply(404) }
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

    private fun runner(prompt: SelectionPrompt? = null, dedicated: Boolean = false, rules: String? = "rebalanced", force: Boolean = false, version: String = "4.0.0", allItems: Boolean = false): OnDemandRunner {
        val client = ApiClient("http://localhost:${server.address.port}", "test", 1, 1, {})
        return OnDemandRunner(
            OnDemandSettings(
                dir, version, dedicated, rules, { config }, { config = it }, force,
                offlineZipUrls = { listOf("http://localhost:${server.address.port}/tagzip", "http://localhost:${server.address.port}/zip") },
                allItems = allItems,
            ),
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

    private fun state() = InstallStateStore.load(dir.resolve("gravelmon/state.json"))

    private val registry get() = dir.resolve("gravelmon/registry.json")

    @Test
    fun theSitesItems_AreAllRegistered_ButOnlyTheNeededOnesGetFilesAndTextures() {
        itemsJson = itemsBody
        config = code(g = listOf("azure"))

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(itemsBody, Files.readString(registry), "registry.json is the download as it came: every item, needed or not")
        // A held item is always needed; a mega stone whose mega form is not there is not.
        assertTrue(exists("assets/gravelmon/models/item/long_club.json"))
        assertTrue(exists("data/gravelmon/recipe/long_club.json"))
        assertTrue(exists("assets/gravelmon/textures/item/long_club.png"))
        assertFalse(exists("assets/gravelmon/models/item/regalientite.json"))
        assertFalse(exists("assets/gravelmon/textures/item/megastones/regalientite.png"))
        // Every registered item has its name, so a pruned one a server has still shows one.
        val lang = Files.readString(pack.resolve("assets/gravelmon/lang/en_us.json"))
        assertTrue(lang.contains("item.gravelmon.long_club") && lang.contains("item.gravelmon.regalientite"), lang)
        assertEquals("\"i1\"", state().itemsEtag)
        assertEquals(
            listOf("gravelmon:long_club"),
            JsonText.parseStrict(Files.readString(pack.resolve(ItemSelection.PATH))).asJsonObject.getAsJsonArray("needed").map { it.asString },
            "The Mod reads which items to show from the pack",
        )

        assertTrue(runner().run() is OnDemandOutcome.UpToDate, "Unchanged items are revalidated with a 304")
    }

    @Test
    fun theAllItemsToggle_BuildsEveryItem_AndTurningItOnRebuilds() {
        itemsJson = itemsBody
        config = code(g = listOf("azure"))
        runner().run()
        assertFalse(exists("assets/gravelmon/models/item/regalientite.json"))

        val outcome = runner(allItems = true).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(exists("assets/gravelmon/models/item/regalientite.json"))
        assertTrue(exists("assets/gravelmon/textures/item/megastones/regalientite.png"))
        assertTrue(runner(allItems = true).run() is OnDemandOutcome.UpToDate)
        assertTrue(runner().run() is OnDemandOutcome.Built, "Turning it off again prunes the extra items")
        assertFalse(exists("assets/gravelmon/textures/item/megastones/regalientite.png"))
    }

    @Test
    fun changedItems_RebuildTheData_AndTheRegistry() {
        itemsJson = itemsBody
        config = code(g = listOf("azure"))
        runner().run()

        itemsJson = itemsBody.replace("Long Club", "Longer Club")
        itemsEtag = "\"i2\""
        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(Files.readString(registry).contains("Longer Club"))
        assertTrue(Files.readString(pack.resolve("assets/gravelmon/lang/en_us.json")).contains("Longer Club"))
        assertEquals("\"i2\"", state().itemsEtag)
    }

    @Test
    fun aSiteWithoutItems_StillBuildsThePack_WithoutARegistry() {
        config = code(g = listOf("azure"))

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertFalse(Files.exists(registry))
        assertFalse(exists("assets/gravelmon/textures/item/long_club.png"), "No item is needed without the site's items")
        assertNull(state().itemsEtag)
    }

    @Test
    fun aKnownRevision_DownloadsOnlyTheChangedForms_AndAppliesThemToTheCachedCopy() {
        config = code()
        runner().run()
        assertEquals(5L, state().speciesRevision)
        changesJson = { since ->
            val changed = form("sage", "foliat").replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":45")
            """{"since":$since,"dataRevision":7,"full":false,"games":[],"forms":[$changed],"removed":["azure#aguade#normal"]}"""
        }

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(listOf("5"), changesAsked)
        assertEquals(1, hits["/api/selector/species"], "The whole download is not fetched again")
        assertTrue(Files.readString(pack.resolve("data/cobblemon/species/sage/foliat.json")).contains("\"catchRate\": 45"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
        assertEquals(7L, state().speciesRevision)
        assertEquals("rev-7", state().dataRevision)
        val cached = SelectorData.parseSpecies(Files.readString(dir.resolve("gravelmon/cache/species.json")))
        assertEquals("7", cached.dataRevision)
    }

    /** Marks a pack file as old, so a test can tell whether a run wrote it again. */
    private fun age(relative: String): java.nio.file.attribute.FileTime {
        val old = java.nio.file.attribute.FileTime.fromMillis(1_000_000_000_000)
        Files.setLastModifiedTime(pack.resolve(relative), old)
        return old
    }

    @Test
    fun aChange_InstallsOnlyTheFilesItChanges_AndLeavesTheRestOfThePackAlone() {
        config = code()
        runner().run()
        val untouchedData = age("data/cobblemon/species/azure/aguade.json")
        val untouchedModel = age("assets/cobblemon/textures/pokemon/sage/foliat.png")
        Files.writeString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"), "LOCAL")
        age("assets/cobblemon/textures/pokemon/sage/foliat.png")
        changesJson = { since ->
            val changed = form("sage", "foliat").replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":45")
            """{"since":$since,"dataRevision":6,"full":false,"games":[],"forms":[$changed],"removed":[]}"""
        }

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(Files.readString(pack.resolve("data/cobblemon/species/sage/foliat.json")).contains("\"catchRate\": 45"))
        assertEquals(untouchedData, Files.getLastModifiedTime(pack.resolve("data/cobblemon/species/azure/aguade.json")), "An unchanged data file is not written")
        assertEquals(untouchedModel, Files.getLastModifiedTime(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
        assertEquals("LOCAL", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")), "The models are not installed again")
        assertFalse(Files.exists(dir.resolve("gravelmon/pack.old")))
        assertFalse(Files.exists(dir.resolve("gravelmon/pack.staging")))
    }

    @Test
    fun aNewlyEnabledPokemon_InstallsOnlyItsModels_FromTheCachedZip() {
        config = Gms3.encode(Gms3.Selection(emptyList(), setOf(Gms3.Status.DONE), emptyList(), emptyList()))
        speciesJson = speciesBody().dropLast(1) + ""","statuses":{"sage#foliat#normal":"done"}}"""
        runner().run()
        Files.writeString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"), "LOCAL")
        changesJson = { since ->
            """{"since":$since,"dataRevision":6,"full":false,"games":[],"forms":[${form("azure", "aguade")}],"removed":[],"statuses":{"azure#aguade#normal":"done"}}"""
        }

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/zip"])
        assertEquals("PNG-aguade", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/azure/aguade.png")))
        assertTrue(exists("data/cobblemon/species/azure/aguade.json"))
        assertEquals("LOCAL", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")), "A model already installed is left alone")
        assertTrue("assets/cobblemon/textures/pokemon/azure/aguade.png" in state().files)
    }

    @Test
    fun aDisabledPokemon_LosesOnlyItsModelsAndData() {
        config = code()
        runner().run()
        Files.writeString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"), "LOCAL")

        config = code(g = listOf("azure"))
        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertFalse(exists("assets/cobblemon/textures/pokemon/azure/aguade.png"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
        assertEquals("LOCAL", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
        assertFalse("assets/cobblemon/textures/pokemon/azure/aguade.png" in state().files)
        assertFalse("data/cobblemon/species/azure/aguade.json" in state().files)
    }

    @Test
    fun nothingChangedSinceTheKnownRevision_IsUpToDate_WithoutTheWholeDownload() {
        config = code()
        runner().run()
        changesJson = { since -> """{"since":$since,"dataRevision":$since,"full":false,"games":[],"forms":[],"removed":[]}""" }

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.UpToDate, outcome.toString())
        assertEquals(1, hits["/api/selector/species"])
    }

    @Test
    fun theSiteAskingForEverything_DownloadsTheWholeDataAgain() {
        config = code()
        runner().run()
        speciesJson = speciesBody().replace("\"dataRevision\":5", "\"dataRevision\":9").replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":3")
        speciesEtag = "\"s9\""

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(2, hits["/api/selector/species"])
        assertEquals(9L, state().speciesRevision)
        assertEquals("\"s9\"", state().dataRevision)
    }

    @Test
    fun aSiteWithoutTheChangesRoute_FallsBackToTheWholeDownload() {
        config = code()
        runner().run()
        changesStatus = 404
        changesJson = { "{}" }
        speciesJson = speciesBody().replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":12")
        speciesEtag = "\"s2\""

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(Files.readString(pack.resolve("data/cobblemon/species/sage/foliat.json")).contains("\"catchRate\": 12"))
    }

    @Test
    fun aForcedUpdate_NeverAsksForChanges() {
        config = code()
        runner().run()

        runner(force = true).run()

        assertTrue(changesAsked.isEmpty())
        assertEquals(2, hits["/api/selector/species"])
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

    /** Not one the runner catches: it stands for the game being closed. */
    private class GameClosed : RuntimeException()

    @Test
    fun aRefreshStoppedAfterTheDownload_ReusesTheZip_AtTheNextStart() {
        config = code()
        runner().run()
        val zipHits = hits["/zip"]!!
        refreshRevision = 1
        // The player closes the game while the models are being installed.
        val stopped = object : SelectionPrompt {
            override fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?) = error("not asked")
            override fun progress(text: String, fraction: Double?) {
                if (text.startsWith("Installing Pokemon models")) throw GameClosed()
            }
            override fun finish(message: String?) {}
        }
        assertThrows(GameClosed::class.java) { runner(stopped).run() }
        assertEquals(zipHits + 1, hits["/zip"])

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(zipHits + 1, hits["/zip"])
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
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

        // The data cached by the install is used offline: it is what the pack was built from, so nothing is redone.
        assertTrue(outcome is OnDemandOutcome.UpToDate, outcome.toString())
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertEquals(pack, (outcome as OnDemandOutcome.UpToDate).packDir)
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
        val reason = (outcome as OnDemandOutcome.KeptOld).reason
        assertTrue(reason.startsWith("The update failed while reading the Pokemon models. The downloaded models zip is incomplete or damaged"), reason)
        assertTrue(reason.contains("downloaded again at the next start"), reason)
        // Kept, it would fail the same way at every start.
        assertFalse(Files.exists(dir.resolve("gravelmon/cache/models-4.0.0.zip")))
    }

    @Test
    fun fileErrorsNameTheFileAndTheLikelyCause() {
        val locked = OnDemandRunner.describe(java.nio.file.FileSystemException("C:\\g\\pack", null, "The process cannot access the file because it is being used by another process"))
        assertTrue(locked.startsWith("C:\\g\\pack is in use."), locked)
        assertTrue(locked.contains("antivirus"), locked)
        assertTrue(OnDemandRunner.describe(java.nio.file.AccessDeniedException("C:\\g\\pack")).contains("access was denied"))
        assertEquals("The disk is full.", OnDemandRunner.describe(java.io.IOException("There is not enough space on the disk")))
        assertEquals("ConnectException (no message).", OnDemandRunner.describe(java.net.ConnectException()))
        assertEquals("The data has problems: [x].", OnDemandRunner.describe(IllegalStateException("the data has problems: [x]")))
        assertEquals("writing data", OnDemandRunner.stepPhrase("Writing data…"))
    }

    @Test
    fun theProgressIsReportedToThePrompt() {
        config = code()
        val prompt = FakePrompt(null)

        runner(prompt).run()

        assertTrue(prompt.messages.any { it.startsWith("Downloading") })
        assertTrue(prompt.messages.contains("Installing…"))
    }

    // ---- the site cannot be reached ---------------------------------------------------------------------------------------

    /** What the selector page's "Download offline cache" puts in the game folder. */
    private fun placeOfflineCache() {
        val cache = dir.resolve("gravelmon/cache")
        Files.createDirectories(cache)
        Files.writeString(cache.resolve("species.json"), speciesJson)
        Files.writeString(cache.resolve("games.json"), gamesJson)
    }

    @Test
    fun aBlockedSiteWithNoCachedData_KeepsWhatIsThere_AndSaysHowToGetTheOfflineCache() {
        config = code()
        siteDown = true

        val outcome = runner().run() as OnDemandOutcome.KeptOld

        assertTrue(outcome.reason.contains("Download offline cache"), outcome.reason)
        assertNull(hits["/zip"])
    }

    @Test
    fun aBlockedSite_BuildsFromTheOfflineCache_WithTheModelsFromTheFirstZipAddressThatHasThem() {
        config = code(g = listOf("azure"))
        siteDown = true
        placeOfflineCache()

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/tagzip"])
        assertEquals(1, hits["/zip"])
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertFalse(exists("data/cobblemon/species/azure/aguade.json"))
        assertTrue(exists("assets/cobblemon/textures/pokemon/sage/foliat.png"))
        assertTrue(exists("data/gravelmon/starters/sage_1.json"))
        assertEquals(5L, state().speciesRevision)

        val second = runner().run()

        assertTrue(second is OnDemandOutcome.UpToDate, second.toString())
        assertEquals(1, hits["/zip"])
    }

    @Test
    fun aSiteThatGoesDownAfterAnInstall_UsesWhatWasDownloaded_WithoutRebuilding() {
        config = code()
        runner().run()
        siteDown = true

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.UpToDate, outcome.toString())
        assertEquals(1, hits["/zip"])
        assertNull(hits["/tagzip"])
    }

    /** The offline cache with the species data at [revision] (the test data is revision 5). */
    private fun placeOfflineCache(revision: Int) {
        speciesJson = speciesBody().replace("\"dataRevision\":5", "\"dataRevision\":$revision")
            .replace("\"name\":\"foliat\"", "\"name\":\"foliat\",\"catchRate\":$revision")
        placeOfflineCache()
    }

    private fun installOnlineThenBlock() {
        config = code()
        runner().run()
        siteDown = true
    }

    @Test
    fun offline_TheSameOrAnOlderRevision_RebuildsNothing() {
        installOnlineThenBlock()

        placeOfflineCache(5)
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
        placeOfflineCache(4)
        assertTrue(runner().run() is OnDemandOutcome.UpToDate)
        assertEquals(5L, state().speciesRevision)
    }

    @Test
    fun offline_ANewerRevision_RebuildsTheData_FromTheCachedZip() {
        installOnlineThenBlock()
        placeOfflineCache(6)

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(Files.readString(pack.resolve("data/cobblemon/species/sage/foliat.json")).contains("\"catchRate\": 6"))
        assertEquals(6L, state().speciesRevision)
        assertEquals(1, hits["/zip"])
        assertNull(hits["/tagzip"])
    }

    @Test
    fun offline_AMissingPack_IsBuiltAgain() {
        installOnlineThenBlock()
        Files.walk(pack).use { files -> files.sorted(Comparator.reverseOrder()).forEach { Files.delete(it) } }

        val outcome = runner().run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertTrue(exists("data/cobblemon/species/sage/foliat.json"))
        assertEquals(1, hits["/zip"])
    }

    @Test
    fun offline_AnUpdatedMod_DownloadsItsModelsFromGitHub_AndBuilds() {
        installOnlineThenBlock()

        val outcome = runner(version = "4.0.1").run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals(1, hits["/tagzip"])
        assertEquals(2, hits["/zip"])
        assertEquals("4.0.1", state().lastDownloadedVersion)
    }

    @Test
    fun offline_AForcedUpdate_BuildsTheWholePackAgainFromTheCache() {
        installOnlineThenBlock()
        Files.writeString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png"), "damaged")

        val outcome = runner(force = true).run()

        assertTrue(outcome is OnDemandOutcome.Built, outcome.toString())
        assertEquals("PNG-foliat", Files.readString(pack.resolve("assets/cobblemon/textures/pokemon/sage/foliat.png")))
        assertEquals(1, hits["/zip"], "The cached zip is used, not downloaded again")
        assertNull(hits["/tagzip"])
        assertEquals(5L, state().speciesRevision)
    }

    @Test
    fun theSiteBackAfterAnOfflineInstall_AsksForTheChangesSinceTheOfflineRevision() {
        config = code()
        siteDown = true
        placeOfflineCache()
        runner().run()
        siteDown = false
        changesJson = { since -> """{"since":$since,"dataRevision":$since,"full":false,"games":[],"forms":[],"removed":[]}""" }

        runner().run()

        assertEquals(listOf("5"), changesAsked)
    }
}
