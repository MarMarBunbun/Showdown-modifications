package drai.dev.gravelsextendedbattles.ondemand

import com.sun.net.httpserver.HttpExchange
import com.sun.net.httpserver.HttpServer
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.io.ByteArrayOutputStream
import java.net.InetSocketAddress
import java.net.URI
import java.nio.file.Files
import java.nio.file.Path
import java.util.zip.GZIPOutputStream

class ApiClientTest {
    @TempDir
    lateinit var dir: Path

    private lateinit var server: HttpServer
    private val hits = java.util.concurrent.ConcurrentHashMap<String, Int>()
    private val sleeps = mutableListOf<Long>()

    private fun url(path: String) = "http://localhost:${server.address.port}$path"

    private fun client(attempts: Int = 3) = ApiClient("http://localhost:${server.address.port}", "test-agent", attempts, 10, { sleeps += it })

    private fun route(path: String, handler: (HttpExchange, Int) -> Unit) {
        server.createContext(path) { exchange ->
            val n = hits.merge(path, 1, Int::plus)!!
            try {
                handler(exchange, n)
            } finally {
                exchange.close()
            }
        }
    }

    private fun HttpExchange.reply(status: Int, body: ByteArray = ByteArray(0), headers: Map<String, String> = emptyMap()) {
        headers.forEach { (k, v) -> responseHeaders.add(k, v) }
        if (body.isEmpty() && status == 304) {
            sendResponseHeaders(status, -1)
        } else {
            sendResponseHeaders(status, body.size.toLong())
            responseBody.write(body)
        }
    }

    private fun gzip(text: String): ByteArray = ByteArrayOutputStream().also { GZIPOutputStream(it).use { gz -> gz.write(text.toByteArray()) } }.toByteArray()

    @BeforeEach
    fun start() {
        server = HttpServer.create(InetSocketAddress("localhost", 0), 0)
        server.start()
    }

    @AfterEach
    fun stop() = server.stop(0)

    @Test
    fun get_SendsTheUserAgent_DecodesGzip_AndReadsTheEtag() {
        route("/api/x") { ex, _ ->
            assertEquals("test-agent", ex.requestHeaders.getFirst("User-Agent"))
            assertTrue(ex.requestHeaders.getFirst("Accept-Encoding").contains("gzip"))
            ex.reply(200, gzip("""{"a":1}"""), mapOf("Content-Encoding" to "gzip", "ETag" to "\"v1\""))
        }

        val response = client().get("/api/x")

        assertEquals(200, response.status)
        assertEquals("""{"a":1}""", response.text)
        assertEquals("\"v1\"", response.etag)
    }

    @Test
    fun get_SendsIfNoneMatch_AndReturnsA304WithoutBody() {
        route("/api/x") { ex, _ ->
            if (ex.requestHeaders.getFirst("If-None-Match") == "\"v1\"") ex.reply(304) else ex.reply(200, "new".toByteArray())
        }

        assertEquals(304, client().get("/api/x", "\"v1\"").status)
        assertEquals(200, client().get("/api/x", "\"other\"").status)
    }

    @Test
    fun get_RetriesServerErrorsWithGrowingBackoff_ThenSucceeds() {
        route("/api/x") { ex, n -> if (n < 3) ex.reply(503) else ex.reply(200, "ok".toByteArray()) }

        val response = client().get("/api/x")

        assertEquals("ok", response.text)
        assertEquals(3, hits["/api/x"])
        assertEquals(listOf(10L, 20L), sleeps)
    }

    @Test
    fun get_GivesUpAfterTheAttempts_WithAnApiException() {
        route("/api/x") { ex, _ -> ex.reply(500) }

        val error = assertThrows(ApiException::class.java) { client(attempts = 2).get("/api/x") }

        assertEquals(2, hits["/api/x"])
        assertEquals(500, error.status)
    }

    @Test
    fun get_RetriesTooManyRequests_ButNotAnOrdinaryClientError() {
        route("/api/busy") { ex, n -> if (n == 1) ex.reply(429) else ex.reply(200, "ok".toByteArray()) }
        route("/api/missing") { ex, _ -> ex.reply(404) }

        assertEquals("ok", client().get("/api/busy").text)
        assertEquals(404, client().get("/api/missing").status)
        assertEquals(1, hits["/api/missing"])
    }

    @Test
    fun getObject_ThrowsForANon200_OrNonObject_OrBadJson() {
        route("/api/404") { ex, _ -> ex.reply(404) }
        route("/api/array") { ex, _ -> ex.reply(200, "[]".toByteArray()) }
        route("/api/bad") { ex, _ -> ex.reply(200, "{".toByteArray()) }
        route("/api/ok") { ex, _ -> ex.reply(200, """{"k":"v"}""".toByteArray()) }

        for (path in listOf("/api/404", "/api/array", "/api/bad")) assertThrows(ApiException::class.java) { client().getObject(path) }
        assertEquals("v", client().getObject("/api/ok").get("k").asString)
    }

    @Test
    fun get_ARefusedConnection_IsAnApiException_AfterTheRetries() {
        val port = server.address.port
        server.stop(0)

        val error = assertThrows(ApiException::class.java) { ApiClient("http://localhost:$port", "t", 2, 1, { sleeps += it }).get("/api/x") }

        assertTrue(error.message!!.contains("failed after 2 attempts"))
    }

    @Test
    fun download_WritesTheFileAtomically_AndReportsProgress() {
        val body = ByteArray(300_000) { (it % 251).toByte() }
        route("/zip") { ex, _ -> ex.reply(200, body) }
        val target = dir.resolve("out/models.zip")
        var last = 0L

        client().download(url("/zip"), target) { done, _ -> last = done }

        assertTrue(body.contentEquals(Files.readAllBytes(target)))
        assertEquals(body.size.toLong(), last)
        assertFalse(Files.exists(dir.resolve("out/models.zip.part")))
    }

    @Test
    fun download_RetriesAfterAServerError_AndNeverLeavesAPartialTarget() {
        route("/zip") { ex, n -> if (n == 1) ex.reply(502) else ex.reply(200, "complete".toByteArray()) }
        val target = dir.resolve("models.zip")

        client().download(url("/zip"), target)

        assertEquals("complete", Files.readString(target))
        assertEquals(2, hits["/zip"])
    }

    @Test
    fun download_FollowsRedirects() {
        route("/start") { ex, _ -> ex.reply(302, headers = mapOf("Location" to url("/final"))) }
        route("/final") { ex, _ -> ex.reply(200, "payload".toByteArray()) }

        client().download(url("/start"), dir.resolve("r.zip"))

        assertEquals("payload", Files.readString(dir.resolve("r.zip")))
    }

    @Test
    fun download_A404_Fails_WithoutRetry_AndLeavesNoFile() {
        route("/zip") { ex, _ -> ex.reply(404) }

        assertThrows(ApiException::class.java) { client().download(url("/zip"), dir.resolve("none.zip")) }

        assertEquals(1, hits["/zip"])
        assertFalse(Files.exists(dir.resolve("none.zip")))
    }

    // SelectorApi

    private fun selectorApi() = SelectorApi(client()) { true }

    @Test
    fun status_ReadsAPublishedVersion() {
        route("/api/selector/status") { ex, _ ->
            assertEquals("version=4.0.0", ex.requestURI.rawQuery)
            ex.reply(200, """{"version":"4.0.0","published":true,"tag":"v4.0.0","zipUrl":"https://github.com/Gravelmon/Gravelmon-Models/archive/refs/tags/v4.0.0.zip","dataRevision":"7"}""".toByteArray())
        }

        val status = SelectorApi(client()).status("4.0.0")

        assertTrue(status.published)
        assertEquals("v4.0.0", status.tag)
        assertEquals("7", status.dataRevision)
        assertTrue(status.zipUrl!!.startsWith("https://github.com/"))
    }

    @Test
    fun status_NotPublished_HasNoZipUrl() {
        route("/api/selector/status") { ex, _ -> ex.reply(200, """{"version":"4.0.1","published":false}""".toByteArray()) }

        val status = selectorApi().status("4.0.1")

        assertFalse(status.published)
        assertNull(status.zipUrl)
    }

    @Test
    fun status_RefusesAZipAddressOutsideGithubHttps() {
        route("/api/selector/status") { ex, _ -> ex.reply(200, """{"version":"4.0.0","published":true,"zipUrl":"https://evil.example.com/a.zip"}""".toByteArray()) }

        assertThrows(ApiException::class.java) { SelectorApi(client()).status("4.0.0") }
    }

    @Test
    fun zipUrlPolicy() {
        assertTrue(SelectorApi.isGithubHttps(URI.create("https://github.com/Gravelmon/Gravelmon-Models/archive/refs/tags/v4.0.0.zip")))
        assertTrue(SelectorApi.isGithubHttps(URI.create("https://codeload.github.com/Gravelmon/Gravelmon-Models/zip/refs/tags/v4.0.0")))
        assertFalse(SelectorApi.isGithubHttps(URI.create("http://github.com/x.zip")))
        assertFalse(SelectorApi.isGithubHttps(URI.create("https://github.com.evil.example/x.zip")))
        assertFalse(SelectorApi.isGithubHttps(URI.create("https://notgithub.com/x.zip")))
        assertFalse(SelectorApi.isGithubHttps(URI.create("file:///etc/passwd")))
    }

    @Test
    fun species_ReadsFormsAndMarksVanilla_AndA304IsNull() {
        route("/api/selector/species") { ex, _ ->
            if (ex.requestHeaders.getFirst("If-None-Match") == "\"r2\"") {
                ex.reply(304)
            } else {
                ex.reply(
                    200,
                    """{"dataRevision":2,"games":[],"forms":[{"formId":"sage#foliat#normal","addedByGame":"sage","source":"gravelmon","folder":"sage/foliat","spawns":[]},{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","spawns":[]},{"bad":true}]}""".toByteArray(),
                    mapOf("ETag" to "\"r2\""),
                )
            }
        }

        val species = selectorApi().species()!!

        assertEquals("\"r2\"", species.etag)
        assertEquals(2, species.forms.size)
        assertEquals(Gms3.SelectableForm("sage#foliat#normal", "sage", Gms3.Source.GRAVELMON, "sage/foliat"), species.forms[0])
        assertEquals(Gms3.Source.COBBLEMON, species.forms[1].source)
        assertNull(selectorApi().species("\"r2\""))
    }
}
