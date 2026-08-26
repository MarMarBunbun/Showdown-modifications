package drai.dev.gravelsextendedbattles.pokedex

import com.cobblemon.mod.common.api.pokedex.Dexes
import com.cobblemon.mod.common.api.pokedex.def.AggregatePokedexDef
import com.cobblemon.mod.common.api.pokedex.entry.PokedexEntry
import com.cobblemon.mod.common.api.pokedex.entry.PokedexForm
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import drai.dev.gravelsextendedbattles.mixin.accessors.SimplePokedexDefAccessor
import net.minecraft.resources.ResourceLocation

object GravelmonPokedexResorter {
    @JvmField
    var sortedSpecies: List<EvolutionNode> = ArrayList()
    fun resort(pokemonSpecies: PokemonSpecies) {
        sortedSpecies = SpeciesGraph.sortPokemonSpecies(pokemonSpecies)
    }

    fun processPokedexBans(dexes: Dexes) {
        val pokemonSpecies = PokemonSpecies
        val pokemonSpeciesAccesssor = pokemonSpecies as PokemonSpeciesAccessor
        val currentSpecies = pokemonSpeciesAccesssor.getSpeciesByIdentifier().values
        val allDexes = ArrayList(dexes.dexEntryMap.entries)
        for ((key, dexDef) in allDexes) {
            if (dexDef is AggregatePokedexDef) continue
            val entries = java.util.ArrayList(dexDef.getEntries())
            val resourceLocationEntries = java.util.ArrayList<ResourceLocation>()
            for (i in entries.indices) {
                resourceLocationEntries.add(entries[i].id)
            }
            for (entry in entries) {
                val species = pokemonSpecies.getByName(
                    entry.speciesId.path.split("-".toRegex()).dropLastWhile { it.isEmpty() }
                        .toTypedArray()[0].split(" ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()[0]
                )
                if (species == null || !currentSpecies.contains(species)) {
                    resourceLocationEntries.removeIf { currentEntry: ResourceLocation ->
                        currentEntry.path.equals(entry.id.path, ignoreCase = true)
                                && currentEntry.namespace.equals(entry.id.namespace, ignoreCase = true)
                    }
                    continue
                }
                val shouldRemoveIfNoForms = entry.forms.isNotEmpty()
                val formsToRemove = entry.forms.stream().filter { pokedexForm: PokedexForm? ->
                    val form = species.getForm(mutableSetOf(pokedexForm!!.displayForm))
                    val formNames =
                        species.forms.stream().map { formData -> formData.name }.toList()
                    if (!pokedexForm.displayForm.equals("normal", ignoreCase = true) && !formNames.contains(
                            pokedexForm.displayForm
                        )
                    ) return@filter true
                    val labels = form.labels.stream().toList()
                    if (BanListManager.containsBannedLabels(labels)) {
                        return@filter true
                    }
                    false
                }.toList()
                for (form in formsToRemove) {
                    entry.forms.remove(form)
                }
                if (shouldRemoveIfNoForms && entry.forms.isEmpty()) {
                    resourceLocationEntries.removeIf { currentEntry: ResourceLocation ->
                        currentEntry.path.equals(entry.id.path, ignoreCase = true)
                                && currentEntry.namespace.equals(entry.id.namespace, ignoreCase = true)
                    }
                }
            }
            (dexDef as Any as SimplePokedexDefAccessor).setEntries(resourceLocationEntries)
            if (resourceLocationEntries.isEmpty()) {
                dexes.dexEntryMap.remove(key)
            }
        }
        //seems to do absolutely nothing
//        for (dex in allDexes) {
//            if (dex.value.id.path.equals("national", ignoreCase = true)) continue
//            val currentEntries = java.util.ArrayList(dex.value.getEntries())
//            dex.value.getEntries().clear()
//            for (i in currentEntries.indices) {
//                dex.value.getEntries().add(currentEntries[i])
//            }
//        }
    }

    fun processPokedexResorting(nationalDexEntries: MutableList<PokedexEntry?>): MutableList<PokedexEntry?> {
        val sortedEntries = java.util.ArrayList<PokedexEntry?>()
        val pokemonSpecies = PokemonSpecies
        val mappedEntries = HashMap<ResourceLocation?, PokedexEntry?>()
        nationalDexEntries.forEach{ entry: PokedexEntry? ->
            val species = pokemonSpecies.getByIdentifier(entry!!.speciesId) ?: return@forEach
            mappedEntries[species.resourceIdentifier] = entry
        }
        for (i in sortedSpecies.indices) {
            val sortedSpeciesEntry = sortedSpecies[i]
            val species = sortedSpeciesEntry.species
            val entry = mappedEntries[species.resourceIdentifier] ?: continue
            sortedEntries.add(entry)
        }
        if (sortedEntries.isEmpty()) return nationalDexEntries
        return sortedEntries
    }
}