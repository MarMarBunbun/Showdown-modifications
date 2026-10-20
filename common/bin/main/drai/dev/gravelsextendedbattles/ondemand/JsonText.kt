package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.Gson
import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken
import java.io.StringReader

/**
 * JSON text the way the site writes and reads it, so the same input gives the same bytes and the same verdict.
 * No dependencies beyond Gson (which Minecraft already ships).
 */
object JsonText {
    /**
     * `JSON.stringify(value, null, indent)`: keys in the order of the map, `"` `\` and control characters escaped, everything else
     * (including non-ASCII) written as it is, `indent` spaces per level (0 = compact), no trailing newline.
     * Understands `Map<String, *>`, `Iterable`, `Array<*>`, `String`, `Number`, `Boolean` and `null`.
     */
    fun render(value: Any?, indent: Int = 0): String = StringBuilder().also { write(it, value, indent, 0) }.toString()

    private fun write(out: StringBuilder, value: Any?, indent: Int, depth: Int) {
        when (value) {
            null -> out.append("null")
            is String -> quote(out, value)
            is Boolean -> out.append(value)
            is Number -> out.append(number(value))
            is Map<*, *> -> container(out, value.entries.toList(), '{', '}', indent, depth) { entry ->
                quote(out, entry.key as String)
                out.append(if (indent > 0) ": " else ":")
                write(out, entry.value, indent, depth + 1)
            }
            is Iterable<*> -> container(out, value.toList(), '[', ']', indent, depth) { write(out, it, indent, depth + 1) }
            is Array<*> -> container(out, value.toList(), '[', ']', indent, depth) { write(out, it, indent, depth + 1) }
            else -> throw IllegalArgumentException("Cannot write ${value.javaClass.name} as JSON")
        }
    }

    private fun <T> container(
        out: StringBuilder,
        items: List<T>,
        open: Char,
        close: Char,
        indent: Int,
        depth: Int,
        item: (T) -> Unit,
    ) {
        out.append(open)
        if (items.isEmpty()) {
            out.append(close)
            return
        }
        items.forEachIndexed { index, element ->
            if (index > 0) out.append(',')
            newline(out, indent, depth + 1)
            item(element)
        }
        newline(out, indent, depth)
        out.append(close)
    }

    private fun newline(out: StringBuilder, indent: Int, depth: Int) {
        if (indent <= 0) return
        out.append('\n')
        repeat(indent * depth) { out.append(' ') }
    }

    private fun number(value: Number): String {
        if (value is Double || value is Float) {
            val d = value.toDouble()
            require(d.isFinite()) { "JSON has no NaN or infinity" }
            return if (d == Math.rint(d) && Math.abs(d) < 1e15) d.toLong().toString() else d.toString()
        }
        return value.toString()
    }

    private fun quote(out: StringBuilder, text: String) {
        out.append('"')
        for (c in text) {
            when (c) {
                '"' -> out.append("\\\"")
                '\\' -> out.append("\\\\")
                '\b' -> out.append("\\b")
                '\u000C' -> out.append("\\f")
                '\n' -> out.append("\\n")
                '\r' -> out.append("\\r")
                '\t' -> out.append("\\t")
                else -> if (c < ' ') out.append(String.format("\\u%04x", c.code)) else out.append(c)
            }
        }
        out.append('"')
    }

    private val adapter = Gson().getAdapter(JsonElement::class.java)

    /**
     * Strict parse: one value and nothing after it, no comments, no unquoted names, no trailing commas (Gson's default readers are
     * lenient). Any top level value is accepted, not only an object or array. Throws [JsonParseException] otherwise.
     */
    fun parseStrict(text: String): JsonElement {
        // Wrapping in an array lets the strict reader accept a bare top level value like `5` or `null`, and the size check
        // rejects `1,2` and `1],[2`.
        val reader = JsonReader(StringReader("[$text]"))
        reader.isLenient = false
        val array = try {
            val element = adapter.read(reader)
            if (reader.peek() != JsonToken.END_DOCUMENT) throw JsonParseException("Text after the value")
            element
        } catch (e: JsonParseException) {
            throw e
        } catch (e: java.io.IOException) {
            throw JsonParseException(e)
        } catch (e: IllegalStateException) {
            throw JsonParseException(e)
        }
        if (array !is JsonArray || array.size() != 1) throw JsonParseException("Not exactly one value")
        return array[0]
    }
}
