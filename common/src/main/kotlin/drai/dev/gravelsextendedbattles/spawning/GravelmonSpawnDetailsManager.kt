package drai.dev.gravelsextendedbattles.spawning

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.spawning.detail.PokemonSpawnDetail
import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.config.SpawnModifier
import java.util.function.Consumer

object GravelmonSpawnDetailsManager {
    private var notSuppressedYet = true
    fun modifySpawnDetail(spawnDetail: PokemonSpawnDetail) {
        val pokemon = spawnDetail.pokemon
        val boosts = getBoostsForSpecies(pokemon)
        if (boosts.isEmpty()) {
            return
        }
        boosts.sortWith(Comparator.comparingDouble { spawnModifier -> spawnModifier.modifier.toDouble() })
        boosts.stream().findFirst().ifPresent(Consumer { boost: SpawnModifier ->
            spawnDetail.weight *= boost.modifier
        })
    }

    private fun getBoostsForSpecies(properties: PokemonProperties): MutableList<SpawnModifier> {
        val labels = getLabelsFromProperties(properties)
        if (labels.isEmpty()) return mutableListOf()
        return ArrayList(GravelsExtendedBattles.CONFIG.spawnModifiers.stream()
            .filter { spawnModifier -> labels.contains(spawnModifier.label) }.toList())
    }

    private fun getLabelsFromProperties(properties: PokemonProperties): Set<String> {
        return properties.asRenderablePokemon().form.labels
    }

    fun isSpawnForBannedPokemon(pokemon: PokemonProperties) : Boolean {
        if (pokemon.species != null) {
            return BanListManager.pokemonShouldBeRemoved(pokemon)
        } else {
            if (notSuppressedYet) {
                notSuppressedYet = false
                GravelsExtendedBattles.LOGGER.log(org.apache.logging.log4j.Level.INFO ,"Suppressed invalid species spawn detail warnings")
            }
            return false
        }
    }
}