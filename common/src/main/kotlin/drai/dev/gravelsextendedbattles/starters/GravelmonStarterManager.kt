package drai.dev.gravelsextendedbattles.starters

import com.cobblemon.mod.common.Cobblemon.starterConfig
import com.cobblemon.mod.common.config.starter.StarterCategory
import com.cobblemon.mod.common.data.StarterDataLoader
import com.cobblemon.mod.common.util.adapters.LearnsetAdapter
import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.mixin.accessors.StarterDataLoaderAccessor

object GravelmonStarterManager {
    fun processStarters()
    {
        val starterConfig = StarterDataLoaderAccessor.getCategories()
        val currentStarters = ArrayList(starterConfig)
        val finalCategories: MutableList<StarterCategory> = ArrayList()
        currentStarters.forEach { starterCategory: StarterCategory ->
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
