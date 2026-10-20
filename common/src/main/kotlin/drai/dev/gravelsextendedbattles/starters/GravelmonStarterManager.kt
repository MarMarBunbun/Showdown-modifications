package drai.dev.gravelsextendedbattles.starters

import com.cobblemon.mod.common.Cobblemon.starterConfig
import com.cobblemon.mod.common.config.starter.StarterCategory
import com.cobblemon.mod.common.data.StarterDataLoader
import com.cobblemon.mod.common.util.adapters.LearnsetAdapter
import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.config.GEBConfig
import drai.dev.gravelsextendedbattles.ondemand.Gms3
import drai.dev.gravelsextendedbattles.mixin.accessors.StarterDataLoaderAccessor

object GravelmonStarterManager {
    /**
     * Drops the starters whose Pokemon are removed, the categories left without any, and the categories the selection code does not want
     * offered (its `c`), Cobblemon's own included.
     */
    fun processStarters()
    {
        val starterConfig = StarterDataLoaderAccessor.getCategories()
        val currentStarters = ArrayList(starterConfig)
        val finalCategories: MutableList<StarterCategory> = ArrayList()
        val unwanted = Gms3.tryDecode(GEBConfig.selectionCode)?.c.orEmpty().toSet()
        currentStarters.forEach { starterCategory: StarterCategory ->
            if (starterCategory.name in unwanted) return@forEach
            val starters = starterCategory.pokemon.stream()
                .filter { pokemonProperties -> !BanListManager.pokemonShouldBeRemoved(pokemonProperties) }
                .toList()
            if(starters.isEmpty()) return@forEach
            val newCategory = StarterCategory(
                name = starterCategory.name,
                order = starterCategory.order,
                displayName = starterCategory.displayName,
                pokemon = starters,
                false
            )
            finalCategories.add(newCategory)
        }
        StarterDataLoaderAccessor.setCategories(finalCategories)
    }
}
