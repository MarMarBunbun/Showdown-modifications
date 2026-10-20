package drai.dev.gravelsextendedbattles

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.pokemon.FormData
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import drai.dev.gravelsextendedbattles.ondemand.SpeciesExistence

object BanListManager {
    /**
     * Set once Cobblemon has loaded its species (a world was opened). Before that nothing can be said about whether a species exists, so the
     * existence check passes and only the ban list applies as it always did (see [SpeciesExistence]).
     */
    @Volatile
    @JvmField
    var speciesLoaded: Boolean = false

    /** Whether the species the [properties] name exist, and the form with the aspects they ask for. True until the species have loaded. */
    @JvmStatic
    fun speciesExist(properties: PokemonProperties): Boolean =
        SpeciesExistence.exists(speciesLoaded, properties.species, properties.aspects) { name ->
            PokemonSpecies.getByName(name)?.let { species ->
                // The standard form is a form without aspects, whether or not the species lists it.
                val forms: List<Set<String>> = species.forms.map { it.aspects.toSet() }
                if (forms.any { it.isEmpty() }) forms else forms + listOf(emptySet<String>())
            }
        }


    fun banPokemon(pokemonSpecies: PokemonSpecies, accessor: PokemonSpeciesAccessor) {
        val currentSpecies = PokemonSpeciesAccessor.getSpeciesByIdentifier()
        PokemonSpeciesAccessor.getSpeciesByDex().clear()

        for (species in currentSpecies.values) {
            if (species != null) {
//                PokemonSpeciesAccessor.getSpeciesByDex().remove(species.resourceIdentifier.namespace, species.nationalPokedexNumber)
//                PokemonSpeciesAccessor.getSpeciesByDex().put(species.resourceIdentifier.namespace, species.nationalPokedexNumber, species)
//                if(pokemonShouldBeRemoved(species.standardForm.aspects, species.standardForm)) { }
                val forms = ArrayList<FormData>(species.forms)
                for (formData in forms) {
                    if (pokemonShouldBeRemoved(formData.aspects, formData)) {
//                        species.forms.remove(formData)
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

        //todo maybe override the base species with the next first form that's still allowed
    }

    //I want to make a method that checks if a species should be removed by passing the species object
    fun pokemonShouldBeRemoved(aspects: MutableList<String>, formData: FormData): Boolean {
//        aspects.remove("alpha")
//        aspects.remove("valencian")
//        val aspectsMatch = formData.aspects.containsAll(aspects) && aspects.containsAll(formData.aspects)
//        if(aspects.isNotEmpty() && !aspectsMatch) return true
        val isIndividuallyBanned = GravelsExtendedBattles.CONFIG.getBannedPokemonProperties()
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
        // A Pokemon the selection left out counts as removed, on top of every ban-list check below.
        if (!speciesExist(pokemonProperties)) return true
        return pokemonShouldBeRemoved(pokemonProperties.aspects.toMutableList(), pokemonProperties.asRenderablePokemon().form)
    }
}