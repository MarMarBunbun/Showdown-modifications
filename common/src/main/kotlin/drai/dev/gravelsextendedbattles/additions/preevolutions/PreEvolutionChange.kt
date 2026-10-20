package drai.dev.gravelsextendedbattles.additions.preevolutions

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.evolution.PreEvolution

/** Sets the pre-evolution of [recipient] to [preEvolution], written as a species file writes it (`"pichu"`, `"meowth alolan"`). */
data class PreEvolutionChange(val recipient: PokemonProperties, val preEvolution: PreEvolution)
