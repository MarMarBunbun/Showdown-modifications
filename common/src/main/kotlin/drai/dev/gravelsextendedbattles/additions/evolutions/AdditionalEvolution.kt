package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution

data class AdditionalEvolution(val recipient: PokemonProperties, val evolution: List<Evolution>)
