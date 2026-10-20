package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement

/**
 * The Pokedex form labels (`cobblemon.ui.pokedex.info.form.<species>[-<form>]`) of the forms the built Pokedex entries show. Cobblemon
 * looks one up for every form of an entry and shows the raw key when there is none, so a form added on the site needs one.
 *
 * - the key is the species' Showdown id, then `-` and the display form (lower case, without `-`), or nothing for `Normal`;
 * - a `Normal` form is labelled with nothing, as Cobblemon's own are; a mega form `Mega_epoch` of Absol is `Mega Epoch Absol`; any other
 *   `Delta_spider` is `Delta Spider Form`;
 * - keys in [known] (the language files of the jars) are left alone, so the hand written labels stay as they are;
 * - a form whose display form is an aspect added on the site ([aspectLabels], by id) is called by that aspect's label: `Ferran Form`.
 */
object FormLangBuilder {
    const val PREFIX = "cobblemon.ui.pokedex.info.form."

    private const val DEX_ENTRIES = "data/cobblemon/dex_entries/"
    private const val DEX_ENTRY_ADDITIONS = "data/gravelmon/dex_entry_additions/"

    private fun showdownId(name: String) = name.lowercase().replace(Regex("[^a-z0-9]"), "")

    private fun words(text: String) = text.split('_', ' ').filter { it.isNotEmpty() }.joinToString(" ") { it.replaceFirstChar(Char::uppercaseChar) }

    fun keyOf(species: String, displayForm: String): String =
        PREFIX + showdownId(species) + if (displayForm.equals("normal", ignoreCase = true)) "" else "-" + displayForm.lowercase().replace("-", "")

    fun labelOf(speciesName: String, displayForm: String, aspectLabels: Map<String, String> = emptyMap()): String = when {
        displayForm.equals("normal", ignoreCase = true) -> ""
        displayForm.lowercase().let { it == "mega" || it.startsWith("mega_") } -> "${words(displayForm)} $speciesName"
        else -> "${aspectLabels[displayForm.lowercase()] ?: words(displayForm)} Form"
    }

    /** [files] are the built files (pack path to JSON); [speciesLang] the built `cobblemon.species.*` entries, for the names of the species. */
    fun build(files: Map<String, JsonElement>, speciesLang: Map<String, String>, known: Set<String>, aspectLabels: Map<String, String> = emptyMap()): Map<String, String> {
        val lang = sortedMapOf<String, String>()
        for ((path, json) in files) {
            val idField = when {
                path.startsWith(DEX_ENTRIES) -> "speciesId"
                path.startsWith(DEX_ENTRY_ADDITIONS) -> "entryId"
                else -> continue
            }
            val entry = json.takeIf { it.isJsonObject }?.asJsonObject ?: continue
            val species = JsonTrees.string(entry, idField)?.substringAfter(':') ?: continue
            val name = speciesLang[SpeciesFileBuilder.LANG_SPECIES_PREFIX + showdownId(species) + ".name"] ?: words(species)
            // An addition lists only the forms it adds: the species' own Normal form needs its label too.
            val forms = JsonTrees.objects(entry, "forms").mapNotNull { JsonTrees.string(it, "displayForm") } + "Normal"
            for (form in forms) {
                val key = keyOf(species, form)
                if (key !in known && key !in lang) lang[key] = labelOf(name, form, aspectLabels)
            }
        }
        return lang
    }
}
