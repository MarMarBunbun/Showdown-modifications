package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement
import com.google.gson.JsonNull
import com.google.gson.JsonObject

/**
 * What Gravelmon changes about a Pokemon that is not its own (a vanilla Pokemon or one of its alternate forms, `source` `cobblemon`):
 * its typing, moves, abilities, evolutions, drops and pre-evolution, each written in the format of
 * Gravel's Extended Battles for the one form it is for (`recipient`, a properties string such as `raichu alolan`). A
 * `species_additions` file would change every form of the species at once, so it only adds forms ([SpeciesFileBuilder]).
 * A port of `generatePokemonChangeFiles` (`pokemonChangeFiles.ts` on the site).
 *
 * - `data/gravelmon/type_changes/<recipient>_primary.json` and `..._secondary.json`: `{ recipient, slot, to }` (`to: null` takes the
 *   secondary type away, which the rebalanced version of a Pokemon can do);
 * - `data/gravelmon/ability_changes/<recipient>.json`: `{ recipient, abilities }`, the abilities replaced whole;
 * - `data/cobblemon/move_additions/<recipient>.json`: `{ recipient, learnsetEntries }`, added to the learnset;
 * - `data/gravelmon/additional_evolutions/<recipient>.json`: `{ recipient, evolutions }`, without the ones into a species that is left out;
 * - `data/gravelmon/drop_changes/<recipient>.json`: `{ recipient, drops }`, the drops replaced whole, without the items only a left out
 *   evolution needed;
 * - `data/gravelmon/pre_evolution_changes/<recipient>.json`: `{ recipient, preEvolution }`, unless that species is left out.
 *
 * Base stats and `removedMoves` are not applied.
 *
 * An addition to one of Gravelmon's own Pokemon (`source` `gravelmon`) is not limited: its `species_additions` file has every field
 * ([SpeciesFileBuilder]), and only its `moves` are written here, as a `move_additions` file, since in that file they would replace the
 * moves the species learns.
 */
object PokemonChangesBuilder {
    const val TYPE_CHANGES_FOLDER = "data/gravelmon/type_changes"
    const val ABILITY_CHANGES_FOLDER = "data/gravelmon/ability_changes"
    const val MOVE_ADDITIONS_FOLDER = "data/cobblemon/move_additions"
    const val ADDITIONAL_EVOLUTIONS_FOLDER = "data/gravelmon/additional_evolutions"
    const val DROP_CHANGES_FOLDER = "data/gravelmon/drop_changes"
    const val PRE_EVOLUTION_CHANGES_FOLDER = "data/gravelmon/pre_evolution_changes"

    /** The properties string of the form an addition is for: the species it targets and the aspects of the form that holds it. */
    fun recipientOf(addition: JsonObject, formId: String): String? {
        val target = JsonTrees.string(addition, "target") ?: return null
        val name = if (target.startsWith("cobblemon:")) target.substringAfter(':') else target
        val aspects = (JsonTrees.string(addition, "formId") ?: formId).split('#').getOrNull(2)
            ?.takeIf { it.isNotEmpty() && it != "normal" }?.split(',') ?: emptyList()
        return (listOf(name) + aspects).joinToString(" ")
    }

    /** The file name of a recipient: `raichu alolan` is `raichu_alolan`. */
    fun fileNameOf(recipient: String): String = recipient.replace(' ', '_').replace(':', '_')

    private fun strings(element: JsonElement?): List<String>? =
        element?.takeIf { it.isJsonArray }?.asJsonArray?.mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }

    /** Adds [files] for every form of [forms] that carries an addition. A move file that is already there gains the new entries. */
    fun build(
        forms: List<JsonObject>,
        rules: RulesVariant,
        leftOut: Set<String>,
        implementedTypes: Set<String>?,
        files: MutableMap<String, JsonElement>,
    ) {
        for (form in forms) {
            val addition = JsonTrees.obj(form, "addition") ?: continue
            val recipient = recipientOf(addition, JsonTrees.string(form, "formId") ?: "") ?: continue
            val stored = JsonTrees.obj(addition, "additions") ?: continue
            val file = fileNameOf(recipient)
            if (JsonTrees.string(form, "source") == "gravelmon") {
                strings(stored.get("moves"))?.takeIf { it.isNotEmpty() }?.let { addMoves(files, recipient, file, it) }
                continue
            }
            // No evolution into a species that is left out, nor the drops only such an evolution needed.
            val fields = SpeciesFileBuilder.withoutLeftOutEvolutions(stored, leftOut)
            // The rebalanced version replaces the faithful field whole; its typing is one value, all or nothing.
            val overlay = JsonTrees.obj(fields, "rebalanced")
                ?.takeIf { rules == RulesVariant.REBALANCED }
                ?.takeIf { implementedTypes == null || RebalancedOverlay.typingImplemented(it, implementedTypes) }

            // ---- typing
            val overlayPrimary = overlay?.let { JsonTrees.string(it, "primaryType") }
            val primary = overlayPrimary ?: JsonTrees.string(fields, "primaryType")
            val secondary: JsonElement? = when {
                overlayPrimary != null -> overlay.get("secondaryType")?.deepCopy() ?: JsonNull.INSTANCE
                else -> overlay?.get("secondaryType")?.deepCopy() ?: fields.get("secondaryType")?.deepCopy()
            }
            if (primary != null) {
                files["$TYPE_CHANGES_FOLDER/${file}_primary.json"] = typeChange(recipient, "primary", JsonTrees.text(primary))
            }
            if (secondary != null) {
                files["$TYPE_CHANGES_FOLDER/${file}_secondary.json"] = typeChange(recipient, "secondary", secondary)
            }

            // ---- abilities
            val abilities = strings(overlay?.get("abilities")) ?: strings(fields.get("abilities"))
            if (abilities != null) {
                files["$ABILITY_CHANGES_FOLDER/$file.json"] = JsonTrees.obj(
                    "recipient" to JsonTrees.text(recipient),
                    "abilities" to JsonTrees.strings(abilities),
                )
            }

            // ---- moves: the learnset only ever gains entries
            val moves = strings(overlay?.get("moves")) ?: strings(fields.get("moves"))
            if (!moves.isNullOrEmpty()) addMoves(files, recipient, file, moves)

            // ---- evolutions
            val evolutions = JsonTrees.items(fields, "evolutions")
            if (evolutions.isNotEmpty()) {
                files["$ADDITIONAL_EVOLUTIONS_FOLDER/$file.json"] = JsonTrees.obj(
                    "recipient" to JsonTrees.text(recipient),
                    "evolutions" to JsonTrees.array(evolutions.map { it.deepCopy() }),
                )
            }

            // ---- drops
            JsonTrees.obj(fields, "drops")?.let { drops ->
                files["$DROP_CHANGES_FOLDER/$file.json"] = JsonTrees.obj("recipient" to JsonTrees.text(recipient), "drops" to drops.deepCopy())
            }

            // ---- pre-evolution
            JsonTrees.string(fields, "preEvolution")
                ?.takeIf { it.trim().substringAfter(':').substringBefore(' ').lowercase() !in leftOut }
                ?.let { preEvolution ->
                    files["$PRE_EVOLUTION_CHANGES_FOLDER/$file.json"] = JsonTrees.obj(
                        "recipient" to JsonTrees.text(recipient),
                        "preEvolution" to JsonTrees.text(preEvolution),
                    )
                }
        }
    }

    private fun addMoves(files: MutableMap<String, JsonElement>, recipient: String, file: String, moves: List<String>) {
        val path = "$MOVE_ADDITIONS_FOLDER/$file.json"
        val existing = files[path]?.asJsonObject?.let { strings(it.get("learnsetEntries")) } ?: emptyList()
        files[path] = JsonTrees.obj(
            "recipient" to JsonTrees.text(recipient),
            "learnsetEntries" to JsonTrees.strings(existing + moves.filter { it !in existing }.distinct()),
        )
    }

    private fun typeChange(recipient: String, slot: String, to: JsonElement): JsonObject = JsonTrees.obj(
        "recipient" to JsonTrees.text(recipient),
        "slot" to JsonTrees.text(slot),
        "to" to to,
    )
}
