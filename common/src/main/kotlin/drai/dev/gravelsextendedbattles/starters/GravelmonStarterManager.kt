package drai.dev.gravelsextendedbattles.starters

import com.cobblemon.mod.common.Cobblemon.starterConfig
import com.cobblemon.mod.common.config.starter.StarterCategory
import com.cobblemon.mod.common.util.adapters.LearnsetAdapter
import drai.dev.gravelsextendedbattles.BanListManager

object GravelmonStarterManager {
    fun processStarters()
    {
        val starterConfig = starterConfig
        val currentStarters: MutableList<StarterCategory> = starterConfig.starters
        val finalCategories: MutableList<StarterCategory> = ArrayList()
        currentStarters.forEach { starterCategory: StarterCategory ->
            val starters = starterCategory.pokemon.stream()
                .filter { pokemonProperties -> !BanListManager.pokemonShouldBeRemoved(pokemonProperties) }
                .toList()
            if(starters.isEmpty()) return@forEach
            val newCategory = StarterCategory(
                starterCategory.name,
                starterCategory.order,
                starterCategory.displayName,
                starters,
            )
            finalCategories.add(newCategory)
        }
        starterConfig.starters = ArrayList(finalCategories)
    }
}
