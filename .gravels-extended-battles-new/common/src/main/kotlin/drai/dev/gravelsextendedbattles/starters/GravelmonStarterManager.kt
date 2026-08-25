package drai.dev.gravelsextendedbattles.starters

import com.cobblemon.mod.common.Cobblemon.starterConfig
import com.cobblemon.mod.common.config.starter.StarterCategory

object GravelmonStarterManager {
    fun processStarters()
    {
        val starterConfig = starterConfig
        val currentStarters: MutableList<StarterCategory> = starterConfig.starters
        val finalCategories: MutableList<StarterCategory> = ArrayList()
        currentStarters.forEach { starterCategory: StarterCategory ->
            val starters = starterCategory.pokemon.stream()
                .filter { pokemonProperties -> !SpeciesManager.propertyContainsBannedLabels(pokemonProperties) }
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
