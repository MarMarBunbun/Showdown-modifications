package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonParseException

/**
 * The bodies of `GET /api/selector/species` and `GET /api/selector/games` as the builders take them: the forms as JSON objects
 * and the games' starter categories. Parsing is strict (see [JsonText.parseStrict]); a body of the wrong shape is refused whole.
 */
object SelectorData {
    /** [gamePriorities] is each game's `priority`, which orders the games' dexes. */
    class Species(
        val dataRevision: String?,
        val forms: List<JsonObject>,
        val gamePriorities: Map<String, Int> = emptyMap(),
        /**
         * The `statuses` of the download: form id to wire status (`done`, `missing`); a form that is not in it has no assets yet (`none`).
         * Null when the download has none at all (a server that cannot tell), which is not the same as every form being `none`.
         */
        val statuses: Map<String, String>? = null,
    ) {
        /** The forms as the selection sees them, each with its status. */
        fun selectableForms(): List<Gms3.SelectableForm> = forms.mapNotNull { form -> selectableForm(form, statuses ?: emptyMap()) }

        /** Whether the download says how far the models are. Without it the status layer of a selection cannot be applied. */
        val hasStatuses: Boolean get() = statuses != null

        /** [selection] as it can be applied to this download: without statuses every status counts as on, rather than every form as `none`. */
        fun applicable(selection: Gms3.Selection): Gms3.Selection =
            if (hasStatuses || selection.s == Gms3.Status.ALL) selection else selection.copy(s = Gms3.Status.ALL)
    }

    /** An aspect added on the site (`aspects.ts`): the mod registers it as a species feature, [label] names its forms in the Pokedex. */
    class Aspect(val id: String, val label: String)

    /** [aspects] are the aspects added on the site, from the games download's `aspects` (none in an older download). */
    class Games(val dataRevision: String?, val games: List<ExtrasBuilder.GameStarters>, val aspects: List<Aspect> = emptyList())

    /** What the site accepts as an aspect id, so a file name made from one stays inside its folder. */
    private val ASPECT_ID = Regex("^[a-z][a-z0-9_]{0,39}$")

    private fun root(text: String, what: String): JsonObject =
        JsonText.parseStrict(text) as? JsonObject ?: throw JsonParseException("The $what data is not a JSON object")

    private fun revision(root: JsonObject): String? = root.get("dataRevision")?.takeIf { it.isJsonPrimitive }?.asString

    fun parseSpecies(text: String): Species {
        val root = root(text, "species")
        val forms = JsonTrees.list(root, "forms") ?: throw JsonParseException("The species data has no forms")
        val priorities = JsonTrees.objects(root, "games").mapNotNull { game ->
            val id = JsonTrees.string(game, "id") ?: return@mapNotNull null
            val priority = game.get("priority")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asInt ?: return@mapNotNull null
            id to priority
        }.toMap()
        val statuses = JsonTrees.obj(root, "statuses")?.entrySet()
            ?.mapNotNull { (formId, value) -> value.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString?.let { formId to it } }
            ?.toMap()
        return Species(revision(root), forms.mapNotNull { it.takeIf { form -> form.isJsonObject }?.asJsonObject }, priorities, statuses)
    }

    fun parseGames(text: String): Games {
        val root = root(text, "games")
        val games = JsonTrees.list(root, "games") ?: throw JsonParseException("The games data has no games")
        return Games(
            revision(root),
            games.mapNotNull { element ->
                val game = element.takeIf { it.isJsonObject }?.asJsonObject ?: return@mapNotNull null
                val id = JsonTrees.string(game, "id") ?: return@mapNotNull null
                ExtrasBuilder.GameStarters(id, JsonTrees.objects(game, "starters"))
            },
            JsonTrees.objects(root, "aspects").mapNotNull { aspect ->
                val id = JsonTrees.string(aspect, "id")?.takeIf { ASPECT_ID.matches(it) } ?: return@mapNotNull null
                Aspect(id, JsonTrees.string(aspect, "label")?.takeIf { it.isNotBlank() } ?: id)
            },
        )
    }

    /** One form of the download as the selection sees it, or null when it lacks an id or a game. [statuses] is the download's `statuses`. */
    fun selectableForm(form: JsonObject, statuses: Map<String, String>): Gms3.SelectableForm? {
        val formId = JsonTrees.string(form, "formId") ?: return null
        val game = JsonTrees.string(form, "addedByGame") ?: return null
        val source = if (JsonTrees.string(form, "source") == "cobblemon") Gms3.Source.COBBLEMON else Gms3.Source.GRAVELMON
        val status = Gms3.Status.parse(statuses[formId]) ?: Gms3.Status.NONE
        return Gms3.SelectableForm(formId, game, source, JsonTrees.string(form, "folder"), status)
    }
}
