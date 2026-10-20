package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonNull
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive
import java.security.MessageDigest

/**
 * Small helpers over Gson trees for the file builders: the same canonical text and hash the site uses for spawn entries,
 * and the rendering of a built file the way the Mod's files are written (two space indent, a final newline).
 */
object JsonTrees {
    /** `canonicalJson` of the site: keys of every object in sorted (UTF-16) order, compact. */
    fun canonical(element: JsonElement): String = JsonText.render(sorted(element), 0)

    /** The first 16 hex digits of the SHA-256 of the canonical text: the key a spawn entry is stored under. */
    fun contentHash(element: JsonElement): String {
        val digest = MessageDigest.getInstance("SHA-256").digest(canonical(element).toByteArray(Charsets.UTF_8))
        return digest.joinToString("") { "%02x".format(it) }.take(16)
    }

    /** The element as the plain maps, lists and values [JsonText] understands, keys in the element's own order. */
    fun plain(element: JsonElement?): Any? = when {
        element == null || element is JsonNull -> null
        element is JsonObject -> LinkedHashMap<String, Any?>().also { map -> element.entrySet().forEach { map[it.key] = plain(it.value) } }
        element is JsonArray -> element.map { plain(it) }
        else -> primitive(element as JsonPrimitive)
    }

    private fun sorted(element: JsonElement): Any? = when {
        element is JsonObject -> java.util.TreeMap<String, Any?>().also { map -> element.entrySet().forEach { map[it.key] = sorted(it.value) } }
        element is JsonArray -> element.map { sorted(it) }
        element is JsonPrimitive -> primitive(element)
        else -> null
    }

    private fun primitive(value: JsonPrimitive): Any = when {
        value.isBoolean -> value.asBoolean
        value.isNumber -> value.asNumber
        else -> value.asString
    }

    /** A built file as it is written: two space indent and a final newline. */
    fun renderFile(element: JsonElement): String = JsonText.render(plain(element), 2) + "\n"

    fun obj(vararg pairs: Pair<String, JsonElement>): JsonObject = JsonObject().also { o -> pairs.forEach { o.add(it.first, it.second) } }

    fun array(items: Iterable<JsonElement>): JsonArray = JsonArray().also { a -> items.forEach(a::add) }

    fun strings(items: Iterable<String>): JsonArray = JsonArray().also { a -> items.forEach(a::add) }

    fun text(value: String): JsonElement = JsonPrimitive(value)

    /** The string at [key], or null when it is missing or not a string. */
    fun string(o: JsonObject, key: String): String? = o.get(key)?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString

    fun obj(o: JsonObject, key: String): JsonObject? = o.get(key)?.takeIf { it.isJsonObject }?.asJsonObject

    /** The elements of the array at [key], or none when it is missing or not an array. */
    fun items(o: JsonObject, key: String): List<JsonElement> = list(o, key)?.toList() ?: emptyList()

    /** The object elements of the array at [key]. */
    fun objects(o: JsonObject, key: String): List<JsonObject> = items(o, key).mapNotNull { it.takeIf { e -> e.isJsonObject }?.asJsonObject }

    fun list(o: JsonObject, key: String): JsonArray? = o.get(key)?.takeIf { it.isJsonArray }?.asJsonArray
}
