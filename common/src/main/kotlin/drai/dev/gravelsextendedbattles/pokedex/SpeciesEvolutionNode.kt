package drai.dev.gravelsextendedbattles.pokedex

import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.pokemon.Species

data class SpeciesEvolutionNode(
    override var sortingNumber: Int,
    override val species: Species,
    override val evolutions: MutableList<EvolutionNode> = ArrayList(),
    override val preEvolutions: MutableList<EvolutionNode> = ArrayList()
) : EvolutionNode {

    override fun getForm(): String? = null

    override fun getPokemonEvolutions(): MutableSet<Evolution> =
        species.evolutions

    override fun getPokedexNumber(): Int =
        species.nationalPokedexNumber

    override fun setPokedexNumber(i: Int) {
        species.nationalPokedexNumber = i
    }

    override fun getPokemon(): Species =
        species
}