package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive

/**
 * The national Pokedex numbers of Gravelmon's own Pokemon, given when the pack is built rather than taken from the data: the
 * Pokemon the player has enabled are counted on from the highest vanilla number, one after the other.
 *
 * - only species forms (`origin.kind` `species`) of a game other than vanilla's get a number; inline and addition forms have none;
 * - the games go in the order of their dexes ([GameDexes]: priority, then id), each game's Pokemon by local dex number, then form id;
 * - the number the data carries is ignored.
 */
object DexNumbers {
    /** The highest national Pokedex number of Cobblemon's own Pokemon (Pecharunt). */
    const val HIGHEST_VANILLA = 1025

    private class Numbered(val index: Int, val game: String, val local: Double, val formId: String)

    /** [forms] with every species form numbered; the forms that get a number are copies, the others are the same objects. */
    fun assign(forms: List<JsonObject>, priorities: Map<String, Int>, after: Int = HIGHEST_VANILLA): List<JsonObject> {
        val numbered = forms.mapIndexedNotNull { index, form ->
            val game = JsonTrees.string(form, "addedByGame")?.takeIf { it != "pokemon" } ?: return@mapIndexedNotNull null
            val species = JsonTrees.obj(form, "species") ?: return@mapIndexedNotNull null
            if (JsonTrees.obj(species, "origin")?.let { JsonTrees.string(it, "kind") } != "species") return@mapIndexedNotNull null
            val local = JsonTrees.obj(species, "catalogue")?.get("localDexNumber")
                ?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asDouble ?: Double.MAX_VALUE
            Numbered(index, game, local, JsonTrees.string(form, "formId") ?: "")
        }.sortedWith(compareBy<Numbered> { priorities[it.game] ?: 99 }.thenBy { it.game }.thenBy { it.local }.thenBy { it.formId })

        val result = forms.toMutableList()
        numbered.forEachIndexed { at, it ->
            val copy = forms[it.index].deepCopy()
            copy.getAsJsonObject("species").add("nationalPokedexNumber", JsonPrimitive(after + 1 + at))
            result[it.index] = copy
        }
        return result
    }
}
