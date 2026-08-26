package drai.dev.gravelsextendedbattles

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies.getByName
import com.cobblemon.mod.common.pokemon.FormData
import com.cobblemon.mod.common.pokemon.Species
import drai.dev.GEBConfig.GEBConfig
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import net.minecraft.resources.ResourceLocation

object BanListManager {

    fun banPokemon(pokemonSpecies: PokemonSpecies, accessor: PokemonSpeciesAccessor) {
        val currentSpecies = accessor.getSpeciesByIdentifier()
        val speciesToBeRemoved = getSpeciesToBeRemoved(currentSpecies)
        accessor.getSpeciesByDex().clear()

        for ((key) in speciesToBeRemoved) {
            currentSpecies.remove(key)
        }
        for (species in currentSpecies.values) {
            if (species != null) {
                accessor.getSpeciesByDex().remove(species.resourceIdentifier.getNamespace(), species.nationalPokedexNumber)
                accessor.getSpeciesByDex().put(species.resourceIdentifier.getNamespace(), species.nationalPokedexNumber, species)
                
                val forms: ArrayList<*> = ArrayList<Any?>(species.getForms())
                for (formData in forms) {
                    val labels: MutableList<String?>? = formData.getLabels().stream().toList()
                    if (pokemonShouldBeRemoved(labels)) {
                        species.getForms().remove(formData)
                        continue
                    }

                    val formEvolutions: ArrayList<*> = ArrayList<Any?>(formData.getEvolutions())
                    for (formEvolutionData in formEvolutions) {
                        val result =
                            formEvolutionData.getResult()
                        if (evolutionShouldBeRemoved(
                                currentSpecies,
                                result
                            )
                        ) {
                            formData.getEvolutions().remove(formEvolutionData)
                        }
                    }
                }
                val evolutions: ArrayList<*> = ArrayList<Any?>(species.getEvolutions())
                for (evolutionData in evolutions) {
                    val result =
                        evolutionData.getResult()
                    if (evolutionShouldBeRemoved(
                            currentSpecies,
                            result
                        )
                    ) {
                        species.getEvolutions().remove(evolutionData)
                    }
                }
            }
        }
    }

    fun getSpeciesToBeRemoved(currentSpecies: HashMap<ResourceLocation?, Species>): List<MutableMap.MutableEntry<ResourceLocation?, Species>> {
        val speciesToBeRemoved = currentSpecies.entries.stream()

            .filter { resourceLocationSpeciesEntry: MutableMap.MutableEntry<ResourceLocation?, Species> ->
                pokemonShouldBeRemoved(resourceLocationSpeciesEntry.value)
            }
            .filter { resourceLocationSpeciesEntry: MutableMap.MutableEntry<ResourceLocation?, Species> ->
                val speciesEntry = resourceLocationSpeciesEntry.value
                val labels = speciesEntry.labels.stream().toList()
                pokemonShouldBeRemoved(labels)
            }.toList()
        return speciesToBeRemoved
    }

    fun pokemonShouldBeRemoved(species: String?, form: String?): Boolean {
        if (species == null) return true
        val pokemon = getByName(species)
        if (pokemon == null) return true

        val aspects = HashSet<String>()
        if (form != null) aspects.addAll(
            listOf(
                *form.split(" ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
            )
        )
        return pokemonShouldBeRemoved(pokemon.getForm(aspects).labels.stream().toList())
    }

    fun pokemonShouldBeRemoved(species: String?, aspects: Set<String>): Boolean {
        if (species == null) return true
        val pokemon = getByName(species)
        if (pokemon == null) return true
        if (aspects.isEmpty()) return pokemonShouldBeRemoved(pokemon.getForm(aspects).labels.stream().toList())
        val form1 = pokemon.getForm(aspects)
        if (form1.name.equals("normal", ignoreCase = true)) return true
        val foundForm = form1.labels.stream().toList()
        return containsBannedLabels(foundForm)
    }

    fun getLabelsFromProperties(pokemon: PokemonProperties): MutableList<String?> {
        return drai.dev.gravelsextendedbattles.SpeciesManager.getLabelsFromSpecies(
            pokemon.species,
            drai.dev.gravelsextendedbattles.SpeciesManager.getAspectsFromProperties(pokemon)
        )
    }

    fun getLabelsFromSpecies(species: String?, aspects: Set<String>): List<String> {
        if (species == null) return mutableListOf()
        val pokemon = getByName(species) ?: return mutableListOf()
        return pokemon.getForm(aspects).labels.stream().toList()
    }
    //I want to make a method that checks if a species should be removed by passing the species object
    fun pokemonShouldBeRemoved(species: Species, aspects: Set<String>): Boolean {

        return containsBannedLabels(getLabelsFromSpecies(species.name, aspects))
    }

    fun containsBannedLabels(labels: List<String>?): Boolean {
        if (labels == null) return false
        if (labels.isEmpty()) return false
        for (label in labels) {
            if (GEBConfig.allowedLabels.contains(label)) return false
            if (GEBConfig.bannedLabels.contains(label)) {
                return true
            }
        }
        return false
    }
}