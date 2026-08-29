package drai.dev.gravelsextendedbattles

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies.getByName
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.pokemon.FormData
import com.cobblemon.mod.common.pokemon.Species
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
                accessor.getSpeciesByDex().remove(species.resourceIdentifier.namespace, species.nationalPokedexNumber)
                accessor.getSpeciesByDex().put(species.resourceIdentifier.namespace, species.nationalPokedexNumber, species)
                
                val forms = ArrayList<FormData>(species.forms)
                for (formData in forms) {
                    if (pokemonShouldBeRemoved(formData)) {
                        species.forms.remove(formData)
                        continue
                    }

                    val formEvolutions = ArrayList<Evolution>(formData.evolutions)
                    for (formEvolutionData in formEvolutions) {
                        val result =
                            formEvolutionData.result
                        if (pokemonShouldBeRemoved(result)) {
                            formData.evolutions.remove(formEvolutionData)
                        }
                    }
                }
                val evolutions = ArrayList<Evolution>(species.evolutions)
                for (evolutionData in evolutions) {
                    val result =
                        evolutionData.result
                    if (pokemonShouldBeRemoved(result)) {
                        species.evolutions.remove(evolutionData)
                    }
                }
            }
        }
    }

    fun getSpeciesToBeRemoved(currentSpecies: HashMap<ResourceLocation?, Species>): List<MutableMap.MutableEntry<ResourceLocation?, Species>> {
        val speciesToBeRemoved = currentSpecies.entries.stream()
            .filter { resourceLocationSpeciesEntry: MutableMap.MutableEntry<ResourceLocation?, Species> ->
                pokemonShouldBeRemoved(resourceLocationSpeciesEntry.value)
            }.toList()
        return speciesToBeRemoved
    }

    fun pokemonShouldBeRemoved(species: Species?, form: String? = null): Boolean {
        if (species == null) return true

        val aspects = HashSet<String>()
        if (form != null) aspects.addAll(
            listOf(
                *form.split(" ".toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
            )
        )
        return pokemonShouldBeRemoved( species.getForm(aspects))
    }

    fun pokemonShouldBeRemoved(species: String?, form: String?): Boolean {
        if (species == null) return true
        val pokemon = getByName(species)
        return pokemonShouldBeRemoved(pokemon, form)
    }

    fun pokemonShouldBeRemoved(species: String?, aspects: Set<String>): Boolean {
        if (species == null) return true
        val pokemon = getByName(species) ?: return true
        return pokemonShouldBeRemoved(pokemon.getForm(aspects))
    }

    //I want to make a method that checks if a species should be removed by passing the species object
    fun pokemonShouldBeRemoved(formData: FormData): Boolean {
        val isIndividuallyBanned = GravelsExtendedBattles.CONFIG.getBannedPokemonProperties()
            .any { bannedProperties ->
                bannedProperties.species == formData.name
                        &&
                        ((formData.aspects.isNotEmpty() && formData.name.equals("normal", ignoreCase = true))
                                && bannedProperties.aspects.containsAll(formData.aspects)) }
        if(isIndividuallyBanned) return true
        val labels = formData.labels
        return containsBannedLabels(labels)
    }

    fun containsBannedLabels(labels: Set<String>?): Boolean {
        if (labels == null) return false
        if (labels.isEmpty()) return false
        for (label in labels) {
            if (GravelsExtendedBattles.CONFIG.allowedLabels.contains(label)) return false
            if (GravelsExtendedBattles.CONFIG.bannedLabels.contains(label)) {
                return true
            }
        }
        return false
    }

    fun pokemonShouldBeRemoved(pokemonProperties: PokemonProperties): Boolean {
        return pokemonShouldBeRemoved(pokemonProperties.asRenderablePokemon().form)
    }
}