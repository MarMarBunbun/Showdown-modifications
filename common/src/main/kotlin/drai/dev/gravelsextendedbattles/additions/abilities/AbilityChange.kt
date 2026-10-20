package drai.dev.gravelsextendedbattles.additions.abilities

import com.cobblemon.mod.common.api.abilities.AbilityPool
import com.cobblemon.mod.common.api.pokemon.PokemonProperties

/** Replaces the abilities of [recipient] with [abilities], written as a species file writes them (`"overgrow"`, `"h:chlorophyll"`). */
data class AbilityChange(val recipient: PokemonProperties, val abilities: AbilityPool)
