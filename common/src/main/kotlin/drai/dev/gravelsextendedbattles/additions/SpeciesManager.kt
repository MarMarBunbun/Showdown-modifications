package drai.dev.gravelsextendedbattles.additions

import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.pokemon.Species
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolution
import drai.dev.gravelsextendedbattles.additions.types.Type
import drai.dev.gravelsextendedbattles.additions.types.TypeChange
import drai.dev.gravelsextendedbattles.mixin.accessors.FormDataAccessor
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import kotlin.collections.component1
import kotlin.collections.component2
import kotlin.collections.forEach
import kotlin.text.equals

@Suppress("CAST_NEVER_SUCCEEDS")
object SpeciesManager {
    fun processFormEvolutionAdditions(additionalEvolutions: Collection<AdditionalEvolution>) {
        additionalEvolutions.forEach { additionalEvolution : AdditionalEvolution ->
            val form = additionalEvolution.recipient.asRenderablePokemon().form
                if (form.name.equals("normal", ignoreCase = true)) return@forEach
                val evolutions = form.evolutions
                for (evolution in additionalEvolution.evolution) {
                    evolutions.add(evolution)
                    (form as FormDataAccessor).setEvolutions(evolutions)
                }
        }
    }

    fun processTypeChanges(typeChanges: Collection<TypeChange>) {
        applyIndividualTypeChanges(typeChanges)
        val pokemonSpecies = PokemonSpecies
        val accessor: PokemonSpeciesAccessor = (pokemonSpecies as PokemonSpeciesAccessor)
        val currentSpecies = accessor.getSpeciesByIdentifier()
        currentSpecies.forEach { (_, value) -> substituteType(value) }
    }

    private fun applyIndividualTypeChanges(typeChanges: Collection<TypeChange>) {
        val implementedTypes = GravelsExtendedBattles.CONFIG.implementedTypes
        typeChanges.forEach { typeChange: TypeChange ->
            val form = typeChange.recipient.asRenderablePokemon().form
            if (!implementedTypes.contains(typeChange.to.name)) return@forEach
            val newType = typeChange.to.elementalType ?: return@forEach
            val oldType = typeChange.from?.elementalType
            val agreeableForm: FormDataAccessor = form as FormDataAccessor
            if (form.primaryType == oldType) agreeableForm.setPrimaryType(newType)
            else if (form.secondaryType == oldType) agreeableForm.setSecondaryType(newType)
        }
    }

    private fun substituteType(species: Species) {
        val implementedTypes = GravelsExtendedBattles.CONFIG.implementedTypes

        species.forms.forEach { formData ->
            if (!implementedTypes.contains(formData.primaryType.name)) {
                val type = Type.getByName(formData.primaryType.name)
                if (type != null) {
                    val substitutionType = type.substitutionType
                    if (substitutionType != null) {
                        val newType = substitutionType.elementalType
                        if (newType != null) {
                            val formDataAccessor: FormDataAccessor = formData as FormDataAccessor
                            formDataAccessor.setPrimaryType(newType)
                        }
                    }
                }
            }
            if (formData.secondaryType != null) {
                if (!implementedTypes.contains(formData.secondaryType!!.name)) {
                    val type = Type.getByName(formData.secondaryType!!.name)
                    if (type != null) {
                        val substitutionType = type.substitutionType
                        if (substitutionType != null) {
                            val newType = substitutionType.elementalType
                            if (newType != null) {
                                val formDataAccessor: FormDataAccessor = formData as FormDataAccessor
                                formDataAccessor.setSecondaryType(newType)
                            }
                        }
                    }
                }
            }
        }
    }
}
