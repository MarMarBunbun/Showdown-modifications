package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.google.gson.annotations.SerializedName

/** `evolutions` is what the data generation and the on-demand pack write; `evolution` is the older name. */
data class AdditionalEvolution(
    val recipient: PokemonProperties,
    @SerializedName(value = "evolutions", alternate = ["evolution"]) val evolution: List<Evolution>,
)
