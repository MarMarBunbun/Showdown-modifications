package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject

/**
 * The Pokedex of each game, derived from the forms the game adds (nothing is stored for it): a port of `gameDexes.ts` on the site, which says how close it is to
 * the Mod's hand kept dexes (96% of their entries; the plain vanilla Pokemon a dex lists without the game adding a form of it cannot be known).
 *
 * - a form needs a `localDexNumber` in the catalogue and a game other than vanilla's;
 * - a Pokemon of Gravelmon's own is listed by its species name (`cobblemon:spramarro`);
 * - a form an addition or species file adds is listed as `<species>-<form>` (`cobblemon:bulbasaur-egho`), except the mega forms and the flag forms
 *   (`nuclear`, `armored`);
 * - entries are ordered by local dex number (then form id) and listed once; the games by priority and id.
 *
 * Built from the **enabled** forms, so a Pokemon the selection left out is not in any dex, and a game with nothing left has no dex.
 */
object GameDexes {
    const val FIRST_SORT_ORDER = 11

    private val HIDDEN_FORM = Regex("^(nuclear|armored(_.*)?)$", RegexOption.IGNORE_CASE)

    class Dex(val game: String, val sortOrder: Int, val entries: List<String>)

    private class Listed(val number: Double, val formId: String, val entry: String)

    /** The dex entry (without its namespace) a form is listed as, or null when a dex does not list it. */
    fun entryOf(form: JsonObject): String? {
        val species = JsonTrees.obj(form, "species") ?: return null
        val formId = JsonTrees.string(form, "formId") ?: return null
        val origin = JsonTrees.obj(species, "origin")
        val pokemon = formId.split('#').getOrNull(1) ?: return null
        if (origin != null && JsonTrees.string(origin, "kind") == "species") return JsonTrees.string(origin, "file") ?: pokemon
        val name = JsonTrees.string(species, "name") ?: ""
        if (name.isEmpty() || HIDDEN_FORM.matches(name) || name.lowercase().startsWith("mega")) return null
        return "$pokemon-${name.lowercase()}"
    }

    fun derive(forms: List<JsonObject>, priorities: Map<String, Int>): List<Dex> {
        val byGame = LinkedHashMap<String, MutableList<Listed>>()
        for (form in forms) {
            val game = JsonTrees.string(form, "addedByGame") ?: continue
            if (game == "pokemon") continue
            val species = JsonTrees.obj(form, "species") ?: continue
            val number = JsonTrees.obj(species, "catalogue")?.get("localDexNumber")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asDouble ?: continue
            val entry = entryOf(form) ?: continue
            byGame.getOrPut(game) { mutableListOf() } += Listed(number, JsonTrees.string(form, "formId") ?: continue, entry)
        }
        val order = byGame.keys.sortedWith(compareBy<String> { priorities[it] ?: 99 }.thenBy { it })
        return order.mapIndexed { at, game ->
            val listed = byGame.getValue(game).sortedWith(compareBy<Listed> { it.number }.thenBy { it.formId })
            Dex(game, FIRST_SORT_ORDER + at, listed.map { "cobblemon:${it.entry}" }.distinct())
        }
    }
}
