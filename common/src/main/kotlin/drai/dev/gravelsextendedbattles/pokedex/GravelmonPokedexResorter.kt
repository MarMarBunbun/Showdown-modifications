package drai.dev.gravelsextendedbattles.pokedex

import com.cobblemon.mod.common.api.pokedex.Dexes
import com.cobblemon.mod.common.api.pokedex.def.AggregatePokedexDef
import com.cobblemon.mod.common.api.pokedex.entry.DexEntries
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
        val allDexes = ArrayList(dexes.dexEntryMap.entries)
        val currentEntries = HashMap<ResourceLocation, PokedexEntry>()
        currentEntries.putAll(DexEntries.entries)
        currentEntries.forEach loop@{ (location, entry) ->
            val species = pokemonSpecies.getByName(entry.speciesId.path)
            if (species == null) {
                DexEntries.entries.remove(location)
                return@loop
            }
            val currentForms = entry.forms.toMutableList()
            currentForms.forEach {
                val form = species.getForm(mutableSetOf(it.displayForm.lowercase()))
                if (BanListManager.pokemonShouldBeRemoved(form) || (form.name.equals("Normal", ignoreCase = true))&&!it.displayForm.equals("normal", ignoreCase = true)) {
                    entry.forms.remove(it)
                }
            }
            val shouldRemoveIfNoForms = entry.forms.isEmpty()
            if (shouldRemoveIfNoForms) DexEntries.entries.remove(location)
        }
        for ((key, dexDef) in allDexes) {
            if (dexDef is AggregatePokedexDef) continue
            val entries = java.util.ArrayList(dexDef.getEntries())
            val resourceLocationEntries = java.util.ArrayList<ResourceLocation>()
            for (i in entries.indices) {
                resourceLocationEntries.add(entries[i].id)
            }
            (dexDef as Any as SimplePokedexDefAccessor).setEntries(resourceLocationEntries)
            if (resourceLocationEntries.isEmpty()) {
                dexes.dexEntryMap.remove(key)
            }
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

    fun processPokedexResorting(nationalDexEntries: MutableList<PokedexEntry?>): MutableList<PokedexEntry?> {
        if (sortedSpecies.isEmpty() && PokemonSpecies.species.isNotEmpty()) {
            resort(PokemonSpecies)
        }

        val entriesBySpecies = HashMap<ResourceLocation, PokedexEntry>()
        val unmatchedEntries = java.util.ArrayList<PokedexEntry?>()

        nationalDexEntries.forEach { entry ->
            if (entry == null) {
                unmatchedEntries.add(null)
            } else {
                entriesBySpecies[entry.speciesId] = entry
            }
        }

        val sortedEntries = java.util.ArrayList<PokedexEntry?>()
        val sortedSpeciesIds = HashSet<ResourceLocation>()

        sortedSpecies.forEach { node ->
            val speciesId = node.species.resourceIdentifier
            val entry = entriesBySpecies[speciesId] ?: return@forEach

            sortedEntries.add(entry)
            sortedSpeciesIds.add(speciesId)
        }

        nationalDexEntries.forEach { entry ->
            if (entry != null && entry.speciesId !in sortedSpeciesIds) {
                sortedEntries.add(entry)
            }
        }

        if (sortedEntries.isEmpty()) {
            return nationalDexEntries
        }

        sortedEntries.addAll(unmatchedEntries)
        return sortedEntries
    }
}