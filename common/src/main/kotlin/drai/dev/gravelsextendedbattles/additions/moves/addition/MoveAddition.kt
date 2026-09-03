package drai.dev.gravelsextendedbattles.additions.moves.addition

import com.cobblemon.mod.common.api.pokemon.PokemonProperties

data class MoveAddition(val recipient: PokemonProperties, val learnsetEntries: Set<String>) {
}