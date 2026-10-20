package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParseException
import java.nio.ByteBuffer
import java.nio.charset.CharacterCodingException
import java.nio.charset.CodingErrorAction
import java.security.MessageDigest
import java.util.Base64

/**
 * `GMS3`, the selection code of the Pokemon selector, ported from `gms3.ts` of the site (`docs/selector-client-contract.md`).
 *
 * ```
 * GMS3.<base64url, no padding, of the UTF-8 JSON>   { "g": disabledGames[], "s": enabledStatuses[], "i": alwaysOn[], "x": alwaysOff[] }
 * ```
 *
 * The code is built in three layers, so a player does not have to name every Pokemon:
 *
 * 1. **Games**: `g` lists the games that are switched off. A game added later is on.
 * 2. **Status**: `s` lists the statuses that are switched on (`done`, `missing` for assets missing, `none` for no assets). Each Pokemon has a
 *    status in the data the client downloads, so one that becomes `done` later is included without a new code.
 * 3. **Individual Pokemon**: `i` are always on and `x` always off, whatever the first two layers say. If an id is in both, off wins.
 *
 * A `GMS2.` code (`{ "g", "x" }`) is still read: its games are layer 1, every status is on, and its forms are `x`. It is never written;
 * [isLegacy] tells a caller to ask the player to select again.
 *
 * A code comes from a player's config file or from a server, so it is untrusted: the length is checked before anything is decoded, only
 * the strict base64url alphabet is accepted, the lists are capped, and the decoder throws nothing but [Gms3Exception].
 */
object Gms3 {
    const val PREFIX = "GMS3."
    const val LEGACY_PREFIX = "GMS2."

    /** Longest code accepted, in characters. */
    const val MAX_CODE_LENGTH = 1_000_000
    const val MAX_GAMES = 500
    const val MAX_FORMS = 50_000
    const val MAX_ID_LENGTH = 200

    /** How far a Pokemon's model is. Its wire name is what a code holds; a Pokemon the data says nothing about is [NONE]. */
    enum class Status(val wire: String) {
        DONE("done"),
        MISSING("missing"),
        NONE("none"),
        ;

        companion object {
            val ALL: Set<Status> = entries.toSet()

            fun parse(wire: String?): Status? = entries.firstOrNull { it.wire == wire }
        }
    }

    /**
     * What a player chose, layer by layer. [g] is the disabled games, [s] the enabled statuses, [i] the Pokemon that are always on and [x]
     * the ones that are always off. The lists are deduplicated and sorted by UTF-16 code unit.
     */
    data class Selection(val g: List<String>, val s: Set<Status>, val i: List<String>, val x: List<String>) {
        /** The old two-layer shape: disabled games and always-off forms, every status on. */
        constructor(g: List<String>, x: List<String>) : this(g, Status.ALL, emptyList(), x)

        companion object {
            /** Everything on. */
            val EMPTY = Selection(emptyList(), Status.ALL, emptyList(), emptyList())
        }
    }

    enum class ErrorCode { NOT_A_CODE, TOO_LONG, BAD_ENCODING, BAD_JSON, BAD_SHAPE, TOO_MANY, BAD_ID }

    /** The only exception [decode] throws. [code] is stable; the message is for a log. */
    class Gms3Exception(val code: ErrorCode, message: String) : Exception(message)

    enum class Source { COBBLEMON, GRAVELMON }

    /** The part of a form the selection needs. [folder] is `<addedByGame>/<spriteBaseName>`, computed by the site. */
    data class SelectableForm(
        val formId: String,
        val addedByGame: String,
        val source: Source,
        val folder: String? = null,
        val status: Status = Status.NONE,
    ) {
        /** Vanilla forms are not part of the selection at all: Cobblemon ships them. */
        val selectable: Boolean get() = source != Source.COBBLEMON
    }

    class Resolved(
        val enabled: List<SelectableForm>,
        val disabled: List<SelectableForm>,
        /** Disabled game ids that match no known game. Ignored. */
        val unknownGames: List<String>,
        /** Form ids in `i` or `x` that match no known form. Ignored. */
        val unknownForms: List<String>,
    )

    private val BASE64URL = Regex("^[A-Za-z0-9_-]*$")

    private fun normalised(values: Collection<String>): List<String> = values.toSortedSet().toList()

    /** The canonical code: deduplicated, sorted, compact JSON, so equal selections give equal codes. */
    fun encode(selection: Selection): String {
        val wire = linkedMapOf(
            "g" to normalised(selection.g),
            "s" to Status.entries.filter { it in selection.s }.map { it.wire },
            "i" to normalised(selection.i),
            "x" to normalised(selection.x),
        )
        val bytes = JsonText.render(wire).toByteArray(Charsets.UTF_8)
        return PREFIX + Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
    }

    /** Whether [code] is in the old `GMS2.` format: it still works, but the player should select again to get a `GMS3.` code. */
    fun isLegacy(code: String?): Boolean = code?.trim()?.startsWith(LEGACY_PREFIX) == true

    /**
     * Parses a code (`GMS3.`, or the old `GMS2.`). Whitespace around it is ignored; unknown keys are ignored; a missing list is empty and a
     * missing `s` is every status.
     */
    fun decode(code: String): Selection {
        val trimmed = code.trim()
        val legacy = trimmed.startsWith(LEGACY_PREFIX)
        if (!legacy && !trimmed.startsWith(PREFIX)) throw Gms3Exception(ErrorCode.NOT_A_CODE, "A selection code starts with $PREFIX")
        if (trimmed.length > MAX_CODE_LENGTH) throw Gms3Exception(ErrorCode.TOO_LONG, "The selection code is too long.")
        val body = trimmed.substring(PREFIX.length) // both prefixes are five characters
        if (!BASE64URL.matches(body) || body.length % 4 == 1) {
            throw Gms3Exception(ErrorCode.BAD_ENCODING, "The selection code is not valid base64url.")
        }
        val parsed: JsonElement = try {
            val bytes = Base64.getUrlDecoder().decode(body)
            val text = Charsets.UTF_8.newDecoder()
                .onMalformedInput(CodingErrorAction.REPORT)
                .onUnmappableCharacter(CodingErrorAction.REPORT)
                .decode(ByteBuffer.wrap(bytes))
                .toString()
            JsonText.parseStrict(text)
        } catch (e: IllegalArgumentException) {
            throw Gms3Exception(ErrorCode.BAD_ENCODING, "The selection code is not valid base64url.")
        } catch (e: CharacterCodingException) {
            throw Gms3Exception(ErrorCode.BAD_JSON, "The selection code does not hold valid UTF-8.")
        } catch (e: JsonParseException) {
            throw Gms3Exception(ErrorCode.BAD_JSON, "The selection code does not hold valid JSON.")
        }
        if (parsed !is JsonObject) throw Gms3Exception(ErrorCode.BAD_SHAPE, "The selection code must hold a JSON object.")
        val games = readIds(parsed, "g", MAX_GAMES)
        val off = readIds(parsed, "x", MAX_FORMS)
        if (legacy) return Selection(games, Status.ALL, emptyList(), off)
        return Selection(games, readStatuses(parsed), readIds(parsed, "i", MAX_FORMS), off)
    }

    /** [decode] that returns null instead of throwing. */
    fun tryDecode(code: String?): Selection? = try {
        if (code == null) null else decode(code)
    } catch (e: Gms3Exception) {
        null
    }

    /** The code written canonically (always as `GMS3.`), or null if it is not a valid code. Two codes for the same selection give the same text. */
    fun canonical(code: String?): String? = tryDecode(code)?.let(::encode)

    /** Hex SHA-256 of the canonical code, or null for an invalid code. Stored in the state file to see that the code changed. */
    fun hash(code: String?): String? {
        val canonical = canonical(code) ?: return null
        return MessageDigest.getInstance("SHA-256").digest(canonical.toByteArray(Charsets.UTF_8))
            .joinToString("") { "%02x".format(it) }
    }

    private fun readIds(root: JsonObject, key: String, max: Int): List<String> {
        if (!root.has(key)) return emptyList()
        val value = root.get(key)
        if (value !is JsonArray) throw Gms3Exception(ErrorCode.BAD_SHAPE, "\"$key\" must be an array.")
        if (value.size() > max) throw Gms3Exception(ErrorCode.TOO_MANY, "\"$key\" lists more than $max entries.")
        val ids = value.map { entry ->
            val text = if (entry.isJsonPrimitive && entry.asJsonPrimitive.isString) entry.asString else null
            if (text == null || text.isEmpty() || text.length > MAX_ID_LENGTH) {
                throw Gms3Exception(ErrorCode.BAD_ID, "\"$key\" holds an entry that is not a short text.")
            }
            text
        }
        return normalised(ids)
    }

    private fun readStatuses(root: JsonObject): Set<Status> {
        if (!root.has("s")) return Status.ALL
        val value = root.get("s")
        if (value !is JsonArray) throw Gms3Exception(ErrorCode.BAD_SHAPE, "\"s\" must be an array.")
        return value.map { entry ->
            val text = if (entry.isJsonPrimitive && entry.asJsonPrimitive.isString) entry.asString else null
            Status.parse(text) ?: throw Gms3Exception(ErrorCode.BAD_ID, "\"s\" holds a status this version does not know.")
        }.toSet()
    }

    /**
     * The forms a selection enables: a selectable form is on when it is not in `x`, and it is either in `i`, or its game is not disabled and
     * its status is enabled. A new game or form is on by default as long as its status is enabled.
     */
    fun resolve(selection: Selection, forms: Collection<SelectableForm>): Resolved {
        val disabledGames = selection.g.toSet()
        val alwaysOn = selection.i.toSet()
        val alwaysOff = selection.x.toSet()
        val enabled = mutableListOf<SelectableForm>()
        val disabled = mutableListOf<SelectableForm>()
        val knownGames = mutableSetOf<String>()
        val knownForms = mutableSetOf<String>()
        for (form in forms) {
            if (!form.selectable) continue
            knownGames += form.addedByGame
            knownForms += form.formId
            val on = form.formId !in alwaysOff &&
                (form.formId in alwaysOn || (form.addedByGame !in disabledGames && form.status in selection.s))
            (if (on) enabled else disabled) += form
        }
        return Resolved(
            enabled,
            disabled,
            selection.g.filter { it !in knownGames },
            (selection.i + selection.x).filter { it !in knownForms }.distinct(),
        )
    }
}
