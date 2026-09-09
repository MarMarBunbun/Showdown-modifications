package drai.dev.gravelsextendedbattles.pokedex

import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.pokemon.FormData
import com.cobblemon.mod.common.pokemon.Species
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import org.apache.logging.log4j.Level

object SpeciesGraph {
    private val nodes: MutableMap<String, EvolutionNode> = HashMap()
    var sortedSpecies: List<EvolutionNode> = emptyList()
    private val speciesWithMultiplePreEvolutions = mutableListOf<EvolutionNode>()

    fun sortPokemonSpecies(pokemonSpecies: PokemonSpecies): List<EvolutionNode> {
        val species = pokemonSpecies.species
        sortedSpecies = ArrayList()
        species.forEach(::addPokemon)

        species.forEach { species ->
            val name = species.name.lowercase()

            species.evolutions.forEach { evolution ->
                val result = evolution.result
                addEvolution(
                    fromName = name,
                    fromForm = null,
                    toName = result.species,
                    toForm = null
                )
            }

            species.forms.forEach { formData ->
                if (!isValidEvolutionForm(formData)) {
                    return@forEach
                }

                if (formData.name.equals("normal", ignoreCase = true)) {
                    return@forEach
                }

                formData.evolutions.forEach { evolution ->
                    val result = evolution.result

                    addEvolution(
                        fromName = name,
                        fromForm = null,
                        toName = result.species,
                        toForm = null
                    )
                }
            }
        }

        sortedSpecies = nodes.values.sorted()

        resolveMultiplePreEvolutions()

        sortedSpecies = sortedSpecies
            .sortedBy { it.findLowestPokedexNumber() }

        updateDexNumbers()

        sortedSpecies = sortedSpecies.sortedBy { it.getPokedexNumber() }

        return sortedSpecies
    }

    fun addPokemon(species: Species) {
        val name = species.name.lowercase()

        nodes.putIfAbsent(
            name,
            SpeciesEvolutionNode(
                sortingNumber = species.nationalPokedexNumber,
                species = species
            )
        )
    }

    fun addEvolution(
        fromName: String,
        fromForm: String?,
        toName: String?,
        toForm: String?
    ) {
        val fromKey = fromForm?.let { "$fromName-$it" } ?: fromName
        val toKey = toForm?.let { "$toName-$it" } ?: toName

        if (toName == null) {
            GravelsExtendedBattles.LOGGER.log(
                Level.WARN,
                "Invalid evolution result for evolution of $fromKey"
            )
            return
        }

        if (fromKey == toKey) {
            return
        }

        val fromNode = nodes[fromKey]
        val toNode = nodes[toKey]

        if (fromNode == null || toNode == null) {
            return
        }

        if (fromNode.evolutions.contains(toNode)) {
            return
        }

        if (toNode.evolutions.contains(fromNode)) {
            return
        }

        fromNode.addEvolution(toNode)
        toNode.addPreEvolution(fromNode)

        if (
            toNode.preEvolutions.size > 1 &&
            toNode !in speciesWithMultiplePreEvolutions
        ) {
            speciesWithMultiplePreEvolutions += toNode
        }
    }

    fun shiftDex(node: EvolutionNode, newNumber: Int) {
        val mutableSortedSpecies = sortedSpecies.toMutableList()

        mutableSortedSpecies.remove(node)
        mutableSortedSpecies.add(newNumber - 1, node)

        sortedSpecies = mutableSortedSpecies
    }

    fun getBaseForm(node: EvolutionNode): EvolutionNode {
        val preEvolution = node.preEvolutions.firstOrNull()
            ?: return node

        return getBaseForm(preEvolution)
    }

    fun getMaxPokedexNumber(node: EvolutionNode): Int {
        return getMaxPokedexNumber(
            node,
            node.getPokedexNumber()
        )
    }

    private fun getMaxPokedexNumber(
        node: EvolutionNode,
        currentMax: Int
    ): Int {
        var max = maxOf(
            currentMax,
            node.getPokedexNumber()
        )

        node.evolutions.forEach { evolution ->
            max = getMaxPokedexNumber(evolution, max)
        }

        return max
    }

    private fun getMinPokedexNumber(
        node: EvolutionNode,
        currentMin: Int
    ): Int {
        var min = minOf(
            currentMin,
            node.getPokedexNumber()
        )

        node.evolutions.forEach { evolution ->
            min = getMinPokedexNumber(evolution, min)
        }

        return min
    }

    private fun isBeginningNode(node: EvolutionNode?): Boolean {
        return node != null &&
            node.preEvolutions.isEmpty() &&
            node.getForm() == null
    }

    private fun printEvolutions(
        node: EvolutionNode,
        depth: Int,
        indent: String
    ) {
        println(
            "$indent└${node.getPokedexNumber()}-${node.species}" +
                if (node.getForm() == null) {
                    ""
                } else {
                    " ${node.getForm()}"
                }
        )

        node.evolutions.forEach { evolution ->
            printEvolutions(
                evolution,
                depth + 1,
                "$indent  "
            )
        }
    }

    private fun updateDexNumbers() {
        var dexNumber = 0

        sortedSpecies.forEach { node ->
            if (isBeginningNode(node)) {
                dexNumber = updateDexNumbersRecursive(
                    node,
                    dexNumber
                )
            }
        }
    }

    private fun updateDexNumbersRecursive(
        node: EvolutionNode,
        currentDexNumber: Int
    ): Int {
        var dexNumber = currentDexNumber + 1

        node.setPokedexNumber(dexNumber)

        node.evolutions.forEach { evolution ->
            dexNumber = updateDexNumbersRecursive(
                evolution,
                dexNumber
            )
        }

        return dexNumber
    }

    private fun resolveMultiplePreEvolutions() {
        speciesWithMultiplePreEvolutions.forEach { multiplePreEvolutionSpecies ->
            val baseForms = multiplePreEvolutionSpecies
                .preEvolutions
                .associateBy(::getBaseForm)

            if (baseForms.isEmpty()) {
                return@forEach
            }

            val sortedBaseForms = baseForms.keys
                .sortedBy(::getMaxPokedexNumber)

            val baseFormWithHighestPokedexNumber =
                sortedBaseForms.first()

            val baseFormWithLowestPokedexNumber =
                sortedBaseForms.last()

            baseForms.keys
                .filter { it !== baseFormWithHighestPokedexNumber }
                .forEach { baseForm ->
                    baseForms[baseForm]
                        ?.let { preEvolution ->
                            preEvolution
                                .evolutions
                                .remove(multiplePreEvolutionSpecies)

                            multiplePreEvolutionSpecies
                                .preEvolutions
                                .remove(preEvolution)
                        }
                }

            val baseFormList = baseForms.keys
                .filter { it !== baseFormWithLowestPokedexNumber }
                .sorted()

            val startingSortingNumber =
                sortedSpecies.indexOf(baseFormWithLowestPokedexNumber)

            baseFormList.forEachIndexed { index, node ->
                shiftDex(
                    node,
                    startingSortingNumber + 1 + index
                )
            }
        }
    }

    private fun isValidEvolutionForm(formData: FormData): Boolean =
        formData.aspects.isNotEmpty() &&
                "female" !in formData.aspects &&
                "mega" !in formData.aspects &&
                "mega-x" !in formData.aspects &&
                "mega-y" !in formData.aspects &&
                "primal" !in formData.aspects &&
                "alola-totem" !in formData.aspects &&
                "gmax" !in formData.aspects
}