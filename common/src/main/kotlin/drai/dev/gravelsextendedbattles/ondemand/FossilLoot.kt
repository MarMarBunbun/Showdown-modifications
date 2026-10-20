package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException

/**
 * `data/gravelmon/fossil_loot.json` of the downloaded pack: which fossil items the dig-site loot tables gain, built from the site's `fossil`
 * fields of the enabled Pokemon (`ExtrasBuilder`). It replaces the dig sites the Mod's code used to queue when it registered a fossil.
 */
object FossilLoot {
    const val PATH = "data/gravelmon/fossil_loot.json"

    /** [table] is a loot table id (`cobblemon:fossils/common/prehistoric_mud_pit`), [items] the item ids that are added to it. */
    data class Addition(val table: String, val items: List<String>)

    /** The additions of a file's text. Anything of the wrong shape is skipped, so a damaged file cannot stop the game. */
    fun parse(text: String): List<Addition> {
        val root = try {
            JsonText.parseStrict(text).asJsonObject
        } catch (e: JsonParseException) {
            return emptyList()
        } catch (e: IllegalStateException) {
            return emptyList()
        }
        return JsonTrees.objects(root, "additions").mapNotNull { entry ->
            val table = JsonTrees.string(entry, "table") ?: return@mapNotNull null
            val items = JsonTrees.items(entry, "items").mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }
            if (items.isEmpty()) null else Addition(table, items)
        }
    }
}
