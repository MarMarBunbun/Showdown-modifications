package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject

/** Which implementation of a Pokemon the files are written for: as the game has it, or with the rebalanced overlay. */
enum class RulesVariant {
    FAITHFUL,
    REBALANCED;

    companion object {
        /** The config value (`faithful` or `rebalanced`, any case); anything else is the default, rebalanced. */
        fun parse(text: String?): RulesVariant = if (text?.trim().equals("faithful", ignoreCase = true)) FAITHFUL else REBALANCED
    }
}

/** Port of `applyRebalanced` (`rebalanced.ts` on the site). */
object RebalancedOverlay {
    /**
     * [fields] with the `rebalanced` overlay laid over them: the overlay's `baseStats`, `abilities` and `moves` replace the
     * faithful ones whole, and so does its typing: when the overlay names a `primaryType` the typing is the overlay's primary
     * type and its secondary type, which when it names none drops the faithful secondary type. Fields the overlay does not name
     * stay as they are. The `rebalanced` field itself is never part of the result. [fields] is not changed.
     *
     * When [implementedTypes] is given (lower case) and the overlay's typing names a type outside it, the whole overlay is rejected and
     * the faithful form is kept: the game would otherwise swap the missing type for its fallback (a digital Porygon becoming electric).
     * Null accepts every type.
     */
    fun apply(fields: JsonObject, implementedTypes: Set<String>? = null): JsonObject {
        val result = JsonObject()
        fields.entrySet().forEach { if (it.key != "rebalanced") result.add(it.key, it.value.deepCopy()) }
        val patch = JsonTrees.obj(fields, "rebalanced") ?: return result
        if (implementedTypes != null && !typingImplemented(patch, implementedTypes)) return result
        for (name in listOf("baseStats", "abilities", "moves")) {
            patch.get(name)?.let { result.add(name, it.deepCopy()) }
        }
        val primary = patch.get("primaryType")
        val secondary = patch.get("secondaryType")
        if (primary != null) {
            result.add("primaryType", primary.deepCopy())
            if (secondary == null) result.remove("secondaryType") else result.add("secondaryType", secondary.deepCopy())
        } else if (secondary != null) {
            result.add("secondaryType", secondary.deepCopy())
        }
        return result
    }

    /** Whether every type the overlay's typing names is in [implementedTypes] (lower case). */
    fun typingImplemented(patch: JsonObject, implementedTypes: Set<String>): Boolean =
        listOf("primaryType", "secondaryType").all { key ->
            val type = JsonTrees.string(patch, key)?.trim()?.substringAfter(':')?.lowercase()
            type == null || type in implementedTypes
        }
}
