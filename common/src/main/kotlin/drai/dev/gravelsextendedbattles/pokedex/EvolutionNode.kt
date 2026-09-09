package drai.dev.gravelsextendedbattles.pokedex

import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.pokemon.Species
import java.util.*

interface EvolutionNode : Comparable<EvolutionNode> {
    val evolutions: MutableList<EvolutionNode>
    val species: Species
    val preEvolutions: MutableList<EvolutionNode>
    var sortingNumber: Int

    fun addEvolution(node: EvolutionNode) {
        evolutions.add(node)
    }

    fun addPreEvolution(node: EvolutionNode) {
        preEvolutions.add(node)
    }

    fun getForm(): String?
    fun getPokemonEvolutions(): MutableSet<Evolution>
    fun getPokedexNumber(): Int
    fun setPokedexNumber(i: Int)
    fun getPokemon(): Species

    override fun compareTo(other: EvolutionNode): Int =
        sortingNumber.compareTo(other.sortingNumber)

    fun findLowestPokedexNumber(): Int {
        var minNode: EvolutionNode = this
        val queue: Queue<EvolutionNode> =
            LinkedList<EvolutionNode>()
        val visited: MutableSet<EvolutionNode> =
            HashSet<EvolutionNode>() // To track visited nodes

        queue.add(this)
        visited.add(this)

        while (!queue.isEmpty()) {
            val current: EvolutionNode = queue.poll()

            if (current.getPokedexNumber() < minNode.getPokedexNumber()) {
                minNode = current
            }

            for (next in current.evolutions) {
                if (visited.add(next)) { // Add only if not already visited
                    queue.add(next)
                }
            }

            for (prev in current.preEvolutions) {
                if (visited.add(prev)) { // Add only if not already visited
                    queue.add(prev)
                }
            }
        }

        return minNode.getPokedexNumber()
    }
}