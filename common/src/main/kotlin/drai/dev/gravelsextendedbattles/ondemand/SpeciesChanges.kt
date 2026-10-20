package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonArray
import com.google.gson.JsonObject
import com.google.gson.JsonParseException

/**
 * `GET /api/selector/species/changes?since=<revision>`: what changed in the species download after the revision the cached copy
 * holds, so a start downloads only the Pokemon that changed instead of the whole download (about 1.6 MB). Every change to the
 * site's species data is a numbered revision, whoever made it, and an approval or "approve selected" is one revision.
 * See `docs/selector-client-contract.md` in the web app.
 */
sealed class SpeciesChanges {
    abstract val since: Long
    abstract val dataRevision: Long

    /**
     * The changed forms exactly as the download now carries them, the ids of the changed forms it no longer carries, the whole game list,
     * and the status (`done`, `missing`, `none`) of every form in [forms].
     */
    class Delta(
        override val since: Long,
        override val dataRevision: Long,
        val games: JsonArray,
        val forms: List<JsonObject>,
        val removed: List<String>,
        val statuses: Map<String, String>?,
    ) : SpeciesChanges() {
        /** Nothing changed: the cached copy is the current download. */
        val isEmpty: Boolean get() = forms.isEmpty() && removed.isEmpty() && dataRevision == since
    }

    /** The site cannot say what changed ([reason]: `expired`, `ahead`, `full`, `too-many`, `no-log`): download everything. */
    class Full(override val since: Long, override val dataRevision: Long, val reason: String) : SpeciesChanges()

    companion object {
        fun parse(text: String): SpeciesChanges {
            val root = JsonText.parseStrict(text) as? JsonObject ?: throw JsonParseException("The changes are not a JSON object")
            val full = root.get("full")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isBoolean }?.asBoolean
                ?: throw JsonParseException("The changes do not say whether they are full")
            val since = number(root, "since")
            val revision = number(root, "dataRevision")
            if (full) return Full(since, revision, JsonTrees.string(root, "reason") ?: "unknown")
            val forms = JsonTrees.list(root, "forms") ?: throw JsonParseException("The changes have no forms")
            val removed = JsonTrees.list(root, "removed") ?: throw JsonParseException("The changes have no removed list")
            val games = root.get("games")?.takeIf { it.isJsonArray }?.asJsonArray ?: throw JsonParseException("The changes have no games")
            return Delta(
                since = since,
                dataRevision = revision,
                games = games,
                forms = forms.map { element ->
                    element.takeIf { it.isJsonObject }?.asJsonObject?.takeIf { JsonTrees.string(it, "formId") != null }
                        ?: throw JsonParseException("A changed form has no formId")
                },
                removed = removed.map { element ->
                    element.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString
                        ?: throw JsonParseException("A removed form is not an id")
                },
                statuses = JsonTrees.obj(root, "statuses")?.entrySet()?.associate { (formId, value) ->
                    formId to (value.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString
                        ?: throw JsonParseException("The status of $formId is not text"))
                },
            )
        }

        private fun number(root: JsonObject, key: String): Long =
            root.get(key)?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asLong
                ?: throw JsonParseException("The changes have no $key")

        /**
         * The cached download [cached] with [delta] applied: each changed form replaces the one with its id (or is added), each removed
         * id is dropped, the games are replaced, the statuses of the changed forms are set (`none` removes the entry) and `dataRevision`
         * becomes the new one. The forms keep the download's order (by game, then form id), so the result is the new download.
         */
        fun apply(cached: String, delta: Delta): String {
            val root = JsonText.parseStrict(cached) as? JsonObject ?: throw JsonParseException("The cached species data is not a JSON object")
            val forms = JsonTrees.list(root, "forms") ?: throw JsonParseException("The cached species data has no forms")
            val byId = LinkedHashMap<String, JsonObject>()
            forms.forEach { element ->
                val form = element.takeIf { it.isJsonObject }?.asJsonObject ?: return@forEach
                JsonTrees.string(form, "formId")?.let { byId[it] = form }
            }
            delta.removed.forEach { byId.remove(it) }
            delta.forms.forEach { byId[JsonTrees.string(it, "formId")!!] = it }
            val ordered = byId.values.sortedWith(
                compareBy<JsonObject>({ JsonTrees.string(it, "addedByGame") ?: "" }, { JsonTrees.string(it, "formId")!! }),
            )

            val result = JsonObject()
            result.addProperty("dataRevision", delta.dataRevision)
            result.add("games", delta.games)
            result.add("forms", JsonArray().also { array -> ordered.forEach { array.add(it) } })
            val cachedStatuses = JsonTrees.obj(root, "statuses")
            if (cachedStatuses != null || delta.statuses != null) {
                val statuses = sortedMapOf<String, String>()
                cachedStatuses?.entrySet()?.forEach { (formId, value) ->
                    if (value.isJsonPrimitive && value.asJsonPrimitive.isString) statuses[formId] = value.asString
                }
                delta.removed.forEach { statuses.remove(it) }
                delta.statuses?.forEach { (formId, status) -> if (status == "none") statuses.remove(formId) else statuses[formId] = status }
                result.add("statuses", JsonObject().also { obj -> statuses.forEach { (formId, status) -> obj.addProperty(formId, status) } })
            }
            return JsonText.render(JsonTrees.plain(result))
        }
    }
}
