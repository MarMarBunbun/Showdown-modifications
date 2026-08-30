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
        val currentSpecies = PokemonSpeciesAccessor.getSpeciesByIdentifier()
//        val speciesToBeRemoved = getSpeciesToBeRemoved(currentSpecies)
        PokemonSpeciesAccessor.getSpeciesByDex().clear()

//        for ((key) in speciesToBeRemoved) {
//            currentSpecies.remove(key)
//        }
        for (species in currentSpecies.values) {
            if (species != null) {
                PokemonSpeciesAccessor.getSpeciesByDex().remove(species.resourceIdentifier.namespace, species.nationalPokedexNumber)
                PokemonSpeciesAccessor.getSpeciesByDex().put(species.resourceIdentifier.namespace, species.nationalPokedexNumber, species)
                if(pokemonShouldBeRemoved(species.standardForm)) { }
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
                    val result = evolutionData.result
                    if (pokemonShouldBeRemoved(result)) {
                        species.evolutions.remove(evolutionData)
                    }
                }
            }
        }

//        val speciesToBeRemoved = currentSpecies.values.filter { species -> species.forms.isEmpty() }.toSet()
//        speciesToBeRemoved.forEach { species ->
//            currentSpecies.remove(species.resourceIdentifier)
//        }

        //todo maybe override the base species with the next first form that's still allowed
    }

    //I want to make a method that checks if a species should be removed by passing the species object
    fun pokemonShouldBeRemoved(formData: FormData): Boolean {
        val isIndividuallyBanned = GravelsExtendedBattles.CONFIG.bannedPokemonProperties
            .any { renderablePokemon -> renderablePokemon.form == formData }
        if(isIndividuallyBanned) return true
        val labels = formData.labels
        return containsBannedLabels(labels)
    }

    fun containsBannedLabels(labels: Set<String>?): Boolean {
        if (labels == null) return false
        if (labels.isEmpty()) return false
        var shouldBeBanned = false
        for (label in labels) {
            if (GravelsExtendedBattles.CONFIG.allowedLabels.contains(label)) return false
            if (GravelsExtendedBattles.CONFIG.bannedLabels.contains(label)) {
                shouldBeBanned = true
            }
        }
        return shouldBeBanned
    }

    fun pokemonShouldBeRemoved(pokemonProperties: PokemonProperties): Boolean {
        return pokemonShouldBeRemoved(pokemonProperties.asRenderablePokemon().form)
    }
}