package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonPrimitive

/**
 * Everything the site's data turns into for one player's selection: the one place that applies a `GMS3` selection to the species
 * and games downloads and runs the file builders ([SpeciesFileBuilder], [ExtrasBuilder]) on what is left.
 *
 * - A form is **enabled** when its game and its id are not disabled; vanilla forms (`source` `cobblemon`) are not part of the
 *   selection and are always kept, since all they carry is what Gravelmon adds to a vanilla species.
 * - Starters follow the game and the forms ([ExtrasBuilder.filterStarters]).
 * - The enabled Pokemon of Gravelmon's own are given their national Pokedex numbers here ([DexNumbers]), so they depend on the selection.
 * - The Pokedex forms get labels ([FormLangBuilder]) unless a language file of the jars ([knownLang]) already has one.
 * - The result is text, ready to be written under the pack folder: JSON files as the Mod writes them, the mega stones' item scripts, and the language file.
 */
object PackDataBuilder {
    /**
     * Raised whenever the files built from the same data change, so installed packs are built again. 1: dex numbers and form labels.
     * 2: changes to Pokemon that are not Gravelmon's own are written in the formats of GEB, per form (typing, moves, abilities, evolutions, drops, pre-evolution).
     */
    const val REVISION = 3

    const val SPECIES_FEATURES_FOLDER = "data/cobblemon/species_features/"

    /** The species feature Cobblemon reads for an aspect: a flag that is the aspect while it is set (`speciesFeatureOf` in `aspects.ts`). */
    fun speciesFeatureOf(id: String): JsonElement = JsonTrees.obj(
        "keys" to JsonTrees.array(listOf(JsonTrees.text(id))),
        "type" to JsonTrees.text("flag"),
        "isAspect" to JsonPrimitive(true),
        "default" to JsonPrimitive(false),
    )

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

    fun build(species: SelectorData.Species, games: SelectorData.Games, chosen: Gms3.Selection, rules: RulesVariant, implementedTypes: Set<String>? = null, knownLang: Set<String> = emptySet()): Result {
        val selection = species.applicable(chosen)
        val selectable = species.selectableForms()
        val resolved = Gms3.resolve(selection, selectable)
        val enabledIds = resolved.enabled.map { it.formId }.toSet()
        val disabledIds = resolved.disabled.map { it.formId }.toSet()
        val kept: List<JsonObject> = DexNumbers.assign(species.forms.filter { JsonTrees.string(it, "formId") !in disabledIds }, species.gamePriorities)

        fun nameOf(form: JsonObject) = JsonTrees.obj(form, "species")?.let { JsonTrees.string(it, "name") }?.lowercase()
        val keptNames = kept.mapNotNull(::nameOf).toSet()
        val leftOut = species.forms.filter { JsonTrees.string(it, "formId") in disabledIds }.mapNotNull(::nameOf).toSet() - keptNames
        val speciesBuilt = SpeciesFileBuilder.build(kept, rules, leftOut, implementedTypes)
        val starters = ExtrasBuilder.filterStarters(games.games, selection.g.toSet(), enabledIds)
        val extrasBuilt = ExtrasBuilder.build(kept, starters, species.gamePriorities, rules, leftOut, implementedTypes)

        val files = LinkedHashMap<String, String>()
        (speciesBuilt.files + extrasBuilt.files).forEach { (path, json) -> files[path] = JsonTrees.renderFile(json) }
        files.putAll(extrasBuilt.texts)
        // The aspects added on the site, so forms with them work without a new release of the Mod (one the Mod ships is the same file).
        for (aspect in games.aspects) {
            files[SPECIES_FEATURES_FOLDER + aspect.id + ".json"] = JsonTrees.renderFile(speciesFeatureOf(aspect.id))
        }
        val lang = java.util.TreeMap<String, String>().also {
            it.putAll(speciesBuilt.lang)
            it.putAll(extrasBuilt.lang)
            it.putAll(FormLangBuilder.build(extrasBuilt.files, speciesBuilt.lang, knownLang + it.keys, games.aspects.associate { aspect -> aspect.id to aspect.label }))
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
