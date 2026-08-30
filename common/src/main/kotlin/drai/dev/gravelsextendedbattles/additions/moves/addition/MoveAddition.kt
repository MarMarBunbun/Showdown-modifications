package drai.dev.gravelsextendedbattles.additions.moves.addition

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.util.adapters.LearnsetAdapter

data class MoveAddition(val recipient: PokemonProperties, val learnsetEntry: String) {
}