package drai.dev.gravelsextendedbattles.additions.types

import com.cobblemon.mod.common.api.pokemon.PokemonProperties

/**
 * Changes one type of [recipient] to [to]. Which type is changed: the one named by [slot] (`primary` or `secondary`) when it is
 * given, otherwise the one that is [from] (no [from]: the missing secondary type is added). A null [to] is only meaningful for
 * the `secondary` slot, and removes the secondary type.
 */
data class TypeChange(val from: Type?, val to: Type?, val recipient: PokemonProperties, val slot: String? = null)
