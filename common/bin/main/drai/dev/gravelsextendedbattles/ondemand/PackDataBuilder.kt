package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement
import com.google.gson.JsonObject

/**
 * Everything the site's data turns into for one player's selection: the one place that applies a `GMS3` selection to the species
 * and games downloads and runs the file builders ([SpeciesFileBuilder], [ExtrasBuilder]) on what is left.
 *
 * - A form is **enabled** when its game and its id are not disabled; vanilla forms (`source` `cobblemon`) are not part of the
 *   selection and are always kept, since all they carry is what Gravelmon adds to a vanilla species.
 * - Starters follow the game and the forms ([ExtrasBuilder.filterStarters]).
 * - The result is text, ready to be written under the pack folder: JSON files as the Mod writes them, the mega stones' item scripts, and the language file.
 */
object PackDataBuilder {
    class Result(
        /** Pack path to the text of the file. */
        val files: Map<String, String>,
        val enabledForms: Int,
        val disabledForms: Int,
        /** Things wrong in the data; the caller keeps the old pack when there are any. */
        val problems: List<String>,
        /** Forms left out because the file they belong in has no enabled base (not an error). */
        val skipped: List<String>,
        /** Disabled ids in the code that match nothing known (ignored, worth a log line). */
        val unknownGames: List<String>,
        val unknownForms: List<String>,
    )

    fun build(species: SelectorData.Species, games: SelectorData.Games, chosen: Gms3.Selection, rules: RulesVariant, implementedTypes: Set<String>? = null): Result {
        val selection = species.applicable(chosen)
        val selectable = species.selectableForms()
        val resolved = Gms3.resolve(selection, selectable)
        val enabledIds = resolved.enabled.map { it.formId }.toSet()
        val disabledIds = resolved.disabled.map { it.formId }.toSet()
        val kept: List<JsonObject> = species.forms.filter { JsonTrees.string(it, "formId") !in disabledIds }

        fun nameOf(form: JsonObject) = JsonTrees.obj(form, "species")?.let { JsonTrees.string(it, "name") }?.lowercase()
        val keptNames = kept.mapNotNull(::nameOf).toSet()
        val leftOut = species.forms.filter { JsonTrees.string(it, "formId") in disabledIds }.mapNotNull(::nameOf).toSet() - keptNames
        val speciesBuilt = SpeciesFileBuilder.build(kept, rules, leftOut, implementedTypes)
        val starters = ExtrasBuilder.filterStarters(games.games, selection.g.toSet(), enabledIds)
        val extrasBuilt = ExtrasBuilder.build(kept, starters, species.gamePriorities)

        val files = LinkedHashMap<String, String>()
        (speciesBuilt.files + extrasBuilt.files).forEach { (path, json) -> files[path] = JsonTrees.renderFile(json) }
        files.putAll(extrasBuilt.texts)
        val lang = java.util.TreeMap<String, String>().also {
            it.putAll(speciesBuilt.lang)
            it.putAll(extrasBuilt.lang)
        }
        if (lang.isNotEmpty()) files[SpeciesFileBuilder.LANG_PATH] = JsonTrees.renderFile(JsonTrees.obj(*lang.map { it.key to JsonTrees.text(it.value) }.toTypedArray()))

        return Result(
            files,
            resolved.enabled.size,
            resolved.disabled.size,
            speciesBuilt.problems + extrasBuilt.problems,
            speciesBuilt.skipped,
            resolved.unknownGames,
            resolved.unknownForms,
        )
    }

    /** The parsed JSON of a built file, for tests and for validation before the swap. */
    fun parse(text: String): JsonElement = JsonText.parseStrict(text)
}
