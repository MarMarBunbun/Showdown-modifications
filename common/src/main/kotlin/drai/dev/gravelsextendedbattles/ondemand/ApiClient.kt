package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonParseException
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.io.InputStream
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption
import java.time.Duration
import java.util.zip.GZIPInputStream

/** The site, the zip host or the network did not give a usable answer (after the retries). The previous install stays. */
class ApiException(message: String, val status: Int? = null, cause: Throwable? = null) : IOException(message, cause)

/**
 * A small `java.net.http` client for the selector API and the zip download: GETs only, a User-Agent, timeouts, gzip,
 * `If-None-Match`, and retries with backoff on network errors, 429 and 5xx. Nothing else (no AWS signing, no cookies).
 */
class ApiClient(
    val baseUrl: String = DEFAULT_BASE_URL,
    private val userAgent: String = "GravelsExtendedBattles",
    private val maxAttempts: Int = 4,
    private val backoffMillis: Long = 1_000,
    private val sleep: (Long) -> Unit = { Thread.sleep(it) },
    private val http: HttpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(10))
        .followRedirects(HttpClient.Redirect.NORMAL)
        .build(),
) {
    companion object {
        const val DEFAULT_BASE_URL = "https://submit.gravelmon.com"

        /** Largest JSON body read into memory. The species download is about 1.6 MB today. */
        const val MAX_JSON_BYTES = 64 * 1024 * 1024
    }

    /** [status] 304 has an empty body. [etag] is the response's `ETag`, if any. */
    class Response(val status: Int, val body: ByteArray, val etag: String?) {
        val text: String get() = String(body, Charsets.UTF_8)
    }

    /** GET [path] (or an absolute URL) as JSON text. Retries; 304 and 4xx other than 429 are returned for the caller to judge. */
    fun get(path: String, ifNoneMatch: String? = null): Response {
        val uri = if (path.startsWith("http://") || path.startsWith("https://")) URI.create(path) else URI.create(baseUrl.trimEnd('/') + path)
        val request = HttpRequest.newBuilder(uri)
            .timeout(Duration.ofSeconds(30))
            .header("User-Agent", userAgent)
            .header("Accept", "application/json")
            .header("Accept-Encoding", "gzip")
            .apply { if (ifNoneMatch != null) header("If-None-Match", ifNoneMatch) }
            .GET()
            .build()
        return withRetries("GET $uri") {
            val response = http.send(request, HttpResponse.BodyHandlers.ofInputStream())
            response.body().use { stream ->
                val retryable = response.statusCode() == 429 || response.statusCode() >= 500
                if (retryable) throw RetryableStatus(response.statusCode())
                val encoding = response.headers().firstValue("Content-Encoding").orElse("")
                val source = if (encoding.equals("gzip", ignoreCase = true)) GZIPInputStream(stream) else stream
                Response(response.statusCode(), readLimited(source, MAX_JSON_BYTES), response.headers().firstValue("ETag").orElse(null))
            }
        }
    }

    /** GET and parse a JSON object. Throws [ApiException] for any status other than 200. */
    fun getObject(path: String): JsonObject {
        val response = get(path)
        if (response.status != 200) throw ApiException("GET $path answered ${response.status}", response.status)
        return try {
            JsonText.parseStrict(response.text) as? JsonObject ?: throw ApiException("GET $path did not answer a JSON object")
        } catch (e: JsonParseException) {
            throw ApiException("GET $path did not answer valid JSON", cause = e)
        }
    }

    /**
     * Downloads [url] to [target]: into `target.part`, moved over [target] when the whole body arrived (and, if the server told
     * its length, when the length matches). Retries from the start; a partial file is never left as [target].
     * [onProgress] gets (bytes so far, total or -1).
     */
    fun download(url: String, target: Path, onProgress: (Long, Long) -> Unit = { _, _ -> }) {
        val request = HttpRequest.newBuilder(URI.create(url))
            .timeout(Duration.ofMinutes(10))
            .header("User-Agent", userAgent)
            .GET()
            .build()
        target.toAbsolutePath().parent?.let { Files.createDirectories(it) }
        val part = target.resolveSibling(target.fileName.toString() + ".part")
        withRetries("GET $url") {
            val response = http.send(request, HttpResponse.BodyHandlers.ofInputStream())
            response.body().use { stream ->
                if (response.statusCode() == 429 || response.statusCode() >= 500) throw RetryableStatus(response.statusCode())
                if (response.statusCode() != 200) throw ApiException("GET $url answered ${response.statusCode()}", response.statusCode())
                val expected = response.headers().firstValueAsLong("Content-Length").orElse(-1)
                var received = 0L
                Files.newOutputStream(part).use { out ->
                    val buffer = ByteArray(64 * 1024)
                    while (true) {
                        val read = stream.read(buffer)
                        if (read < 0) break
                        out.write(buffer, 0, read)
                        received += read
                        onProgress(received, expected)
                    }
                }
                if (expected >= 0 && received != expected) throw IOException("Download ended after $received of $expected bytes")
            }
            Files.move(part, target, StandardCopyOption.REPLACE_EXISTING)
        }
    }

    private class RetryableStatus(val status: Int) : IOException("HTTP $status")

    private fun <T> withRetries(what: String, action: () -> T): T {
        var last: Exception? = null
        for (attempt in 1..maxAttempts) {
            try {
                return action()
            } catch (e: ApiException) {
                throw e
            } catch (e: IOException) {
                last = e
            } catch (e: InterruptedException) {
                Thread.currentThread().interrupt()
                throw ApiException("$what was interrupted", cause = e)
            }
            if (attempt < maxAttempts) sleep(backoffMillis * (1L shl (attempt - 1)))
        }
        val status = (last as? RetryableStatus)?.status
        throw ApiException("$what failed after $maxAttempts attempts: ${last?.let { it.message ?: it.javaClass.simpleName }}", status, last)
    }

    private fun readLimited(stream: InputStream, limit: Int): ByteArray {
        val out = ByteArrayOutputStream()
        val buffer = ByteArray(16 * 1024)
        while (true) {
            val read = stream.read(buffer)
            if (read < 0) break
            if (out.size() + read > limit) throw ApiException("The response is larger than $limit bytes")
            out.write(buffer, 0, read)
        }
        return out.toByteArray()
    }
}

/** `GET /api/selector/status` and `GET /api/selector/species`, as the mod needs them. */
class SelectorApi(private val client: ApiClient, private val acceptZipUrl: (URI) -> Boolean = ::isGithubHttps) {
    /** [published] false means there is no zip for this version: do nothing and keep what is on disk. */
    data class Status(val version: String, val published: Boolean, val tag: String?, val zipUrl: String?, val dataRevision: String?, val refreshRevision: Long = 0)

    class Species(val dataRevision: String?, val etag: String?, val forms: List<Gms3.SelectableForm>)

    fun status(version: String): Status {
        val json = client.getObject("/api/selector/status?version=" + java.net.URLEncoder.encode(version, Charsets.UTF_8))
        val published = json.get("published")?.takeIf { it.isJsonPrimitive }?.asBoolean ?: false
        val zipUrl = json.get("zipUrl")?.takeIf { it.isJsonPrimitive }?.asString
        if (published) {
            val uri = zipUrl?.let { runCatching { URI.create(it) }.getOrNull() }
            if (uri == null || !acceptZipUrl(uri)) throw ApiException("The status names a zip address that is not allowed: $zipUrl")
        }
        return Status(
            version = json.get("version")?.takeIf { it.isJsonPrimitive }?.asString ?: version,
            published = published,
            tag = json.get("tag")?.takeIf { it.isJsonPrimitive }?.asString,
            zipUrl = if (published) zipUrl else null,
            dataRevision = json.get("dataRevision")?.takeIf { it.isJsonPrimitive }?.asString,
            refreshRevision = json.get("refreshRevision")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asLong ?: 0,
        )
    }

    /** A JSON download: its text and the ETag to ask with next time. */
    class Download(val etag: String?, val text: String)

    /** `GET /api/selector/species` as text, or null for a 304. The caller parses it ([SelectorData.parseSpecies]). */
    fun speciesText(ifNoneMatch: String? = null): Download? = download("/api/selector/species", ifNoneMatch)

    /**
     * `GET /api/selector/species/changes?since=[since]`: what changed in the species download after revision [since]. Throws
     * [ApiException] for a status other than 200 (a site that does not have the route answers 404); the caller then downloads it whole.
     */
    fun speciesChanges(since: Long): SpeciesChanges {
        val path = "/api/selector/species/changes?since=$since"
        val response = client.get(path)
        if (response.status != 200) throw ApiException("GET $path answered ${response.status}", response.status)
        return try {
            SpeciesChanges.parse(response.text)
        } catch (e: JsonParseException) {
            throw ApiException("GET $path did not answer valid changes: ${e.message}", cause = e)
        }
    }

    /** `GET /api/selector/games` as text, or null for a 304. */
    fun gamesText(ifNoneMatch: String? = null): Download? = download("/api/selector/games", ifNoneMatch)

    /** `GET /api/selector/items` (every Gravelmon item the site leads) as text, or null for a 304. Throws [ApiException] with the status otherwise. */
    fun itemsText(ifNoneMatch: String? = null): Download? = download("/api/selector/items", ifNoneMatch)

    private fun download(path: String, ifNoneMatch: String?): Download? {
        val response = client.get(path, ifNoneMatch)
        if (response.status == 304) return null
        if (response.status != 200) throw ApiException("GET $path answered ${response.status}", response.status)
        return Download(response.etag, response.text)
    }

    /** The species data; vanilla forms are marked [Gms3.Source.COBBLEMON]. Returns null for a 304 (nothing changed). */
    fun species(ifNoneMatch: String? = null): Species? {
        val response = client.get("/api/selector/species", ifNoneMatch)
        if (response.status == 304) return null
        if (response.status != 200) throw ApiException("GET /api/selector/species answered ${response.status}", response.status)
        val json = try {
            JsonText.parseStrict(response.text) as? JsonObject ?: throw ApiException("The species data is not a JSON object")
        } catch (e: JsonParseException) {
            throw ApiException("The species data is not valid JSON", cause = e)
        }
        val statuses = json.getAsJsonObject("statuses")?.entrySet()
            ?.mapNotNull { (formId, value) -> value.takeIf { it.isJsonPrimitive }?.asString?.let { formId to it } }?.toMap() ?: emptyMap()
        val forms = json.getAsJsonArray("forms")?.mapNotNull { element ->
            element.takeIf { it.isJsonObject }?.asJsonObject?.let { SelectorData.selectableForm(it, statuses) }
        } ?: throw ApiException("The species data has no forms")
        return Species(json.get("dataRevision")?.takeIf { it.isJsonPrimitive }?.asString, response.etag, forms)
    }

    companion object {
        /** The zip comes from GitHub (the archive of the version tag), over https. */
        fun isGithubHttps(uri: URI): Boolean =
            uri.scheme == "https" && uri.host != null && (uri.host == "github.com" || uri.host.endsWith(".github.com") || uri.host == "codeload.github.com")
    }
}
