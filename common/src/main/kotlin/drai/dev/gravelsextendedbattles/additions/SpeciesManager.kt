package drai.dev.gravelsextendedbattles.additions

import com.cobblemon.mod.common.api.abilities.AbilityPool
import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.moves.Learnset
import com.cobblemon.mod.common.api.types.ElementalType
import com.cobblemon.mod.common.pokemon.FormData
import com.cobblemon.mod.common.pokemon.Species
import com.cobblemon.mod.common.util.asIdentifierDefaultingNamespace
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.abilities.AbilityChange
import drai.dev.gravelsextendedbattles.additions.drops.DropChange
import drai.dev.gravelsextendedbattles.additions.preevolutions.PreEvolutionChange
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolution
import drai.dev.gravelsextendedbattles.additions.types.Type
import drai.dev.gravelsextendedbattles.additions.types.TypeChange
import drai.dev.gravelsextendedbattles.mixin.accessors.FormDataAccessor
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import drai.dev.gravelsextendedbattles.mixin.accessors.SpeciesAccessor
import kotlin.collections.component1
import kotlin.collections.component2
import kotlin.collections.forEach
import kotlin.text.equals

object SpeciesManager {
    /** The form a change is for, and its species. [isBase] when it is the species' own form: the change is then made to the species. */
    class Recipient(val species: Species, val form: FormData) {
        val isBase: Boolean get() = form === species.standardForm
    }

    /**
     * The form [recipient] names (`raichu alolan`), or null when its species does not exist (it was disabled or banned) or it has no
     * form with those aspects. Never falls back to another Pokemon, as `asRenderablePokemon()` does (a random species, the base form).
     */
    fun resolve(recipient: PokemonProperties): Recipient? {
        val name = recipient.species ?: return null
        val species = try {
            PokemonSpecies.getByIdentifier(name.asIdentifierDefaultingNamespace())
        } catch (e: Exception) {
            null
        } ?: return null
        // The aspects come from the species features; when one is not known the words after the name still say which form is meant.
        val words = recipient.originalString.split(' ').drop(1).filter { it.isNotBlank() && '=' !in it }.map { it.lowercase() }.toSet()
        val aspects = recipient.aspects.map { it.lowercase() }.toSet().ifEmpty { words }
        if (aspects.isEmpty()) return Recipient(species, species.standardForm)
        val form = species.forms.firstOrNull { form -> form.aspects.map { it.lowercase() }.toSet() == aspects }
            ?: species.forms.singleOrNull { form -> form.aspects.map { it.lowercase() }.containsAll(aspects) }
            ?: return null
        return Recipient(species, form)
    }

    /**
     * The learnset moves can be added to for [target] without changing another form: the base form's is the species' own, and a form
     * that learns the species' moves first gets a copy of them, so a move added to an alternate form is not added to the base form too.
     */
    fun ownLearnset(target: Recipient): Learnset {
        if (target.isBase) return target.species.moves
        val form = target.form as FormDataAccessor
        form.ownMoves?.let { return it }
        val shared = target.species.moves
        val copy = Learnset()
        shared.levelUpMoves.forEach { (level, moves) -> copy.levelUpMoves[level] = moves.toMutableList() }
        copy.eggMoves += shared.eggMoves
        copy.tutorMoves += shared.tutorMoves
        copy.legacyMoves += shared.legacyMoves
        copy.specialMoves += shared.specialMoves
        copy.tmMoves += shared.tmMoves
        copy.evolutionMoves += shared.evolutionMoves
        copy.formChangeMoves += shared.formChangeMoves
        form.setMoves(copy)
        return copy
    }

    private fun skipped(kind: String, recipient: PokemonProperties) {
        GravelsExtendedBattles.LOGGER.debug("Skipped the {} for {}: no such Pokemon or form.", kind, recipient.originalString)
    }

    fun processFormEvolutionAdditions(additionalEvolutions: Collection<AdditionalEvolution>) {
        additionalEvolutions.forEach { additionalEvolution : AdditionalEvolution ->
            val target = resolve(additionalEvolution.recipient) ?: return@forEach skipped("additional evolutions", additionalEvolution.recipient)
            // The base form's evolutions are the species' own set; another form without evolutions of its own gets a set of its own.
            val evolutions = if (target.isBase) target.species.evolutions else target.form.evolutions
            for (evolution in additionalEvolution.evolution) {
                if (evolutions.none { it.id == evolution.id }) evolutions.add(evolution)
            }
            if (!target.isBase) (target.form as FormDataAccessor).setEvolutions(evolutions)
        }
    }

    fun processAbilityChanges(abilityChanges: Collection<AbilityChange>) {
        abilityChanges.forEach { abilityChange ->
            val target = resolve(abilityChange.recipient) ?: return@forEach skipped("ability change", abilityChange.recipient)
            if (target.isBase) (target.species as SpeciesAccessor).setAbilities(abilityChange.abilities)
            else (target.form as FormDataAccessor).setAbilities(abilityChange.abilities)
        }
    }

    fun processDropChanges(dropChanges: Collection<DropChange>) {
        dropChanges.forEach { dropChange ->
            val target = resolve(dropChange.recipient) ?: return@forEach skipped("drop change", dropChange.recipient)
            if (target.isBase) (target.species as SpeciesAccessor).setDrops(dropChange.drops)
            else (target.form as FormDataAccessor).setDrops(dropChange.drops)
        }
    }

    fun processPreEvolutionChanges(preEvolutionChanges: Collection<PreEvolutionChange>) {
        preEvolutionChanges.forEach { preEvolutionChange ->
            val target = resolve(preEvolutionChange.recipient) ?: return@forEach skipped("pre-evolution change", preEvolutionChange.recipient)
            if (target.isBase) (target.species as SpeciesAccessor).setPreEvolution(preEvolutionChange.preEvolution)
            else (target.form as FormDataAccessor).setPreEvolution(preEvolutionChange.preEvolution)
        }
    }

    fun processTypeChanges(typeChanges: Collection<TypeChange>) {
        applyIndividualTypeChanges(typeChanges)
        val pokemonSpecies = PokemonSpecies
        val currentSpecies = PokemonSpeciesAccessor.getSpeciesByIdentifier()
        currentSpecies.forEach { (_, value) -> substituteType(value) }
    }

    private fun applyIndividualTypeChanges(typeChanges: Collection<TypeChange>) {
        val implementedTypes = GravelsExtendedBattles.CONFIG.implementedTypes
        typeChanges.forEach { typeChange: TypeChange ->
            val target = resolve(typeChange.recipient) ?: return@forEach skipped("type change", typeChange.recipient)
            val slot = typeChange.slot?.lowercase()
            val to = typeChange.to
            val newType: ElementalType? = if (to == null) {
                // Only the secondary type can be taken away.
                if (slot != "secondary") return@forEach
                null
            } else {
                if (implementedTypes.none { it.equals(to.name, ignoreCase = true) }) return@forEach
                to.elementalType ?: return@forEach
            }
            val primary = target.form.primaryType
            val secondary = target.form.secondaryType
            val oldType = typeChange.from?.elementalType
            val (newPrimary, newSecondary) = when {
                slot == "primary" -> (newType ?: return@forEach) to secondary
                slot == "secondary" -> primary to newType
                primary == oldType -> (newType ?: return@forEach) to secondary
                secondary == oldType -> primary to newType
                else -> return@forEach
            }
            setTypes(target, newPrimary, newSecondary.takeIf { it != newPrimary })
        }
    }

    /** Both types are set: a form that names only its primary type would otherwise lose the secondary type it shares with the species. */
    private fun setTypes(target: Recipient, primary: ElementalType, secondary: ElementalType?) {
        if (target.isBase) {
            val species = target.species as SpeciesAccessor
            species.setPrimaryType(primary)
            species.setSecondaryType(secondary)
        } else {
            val form = target.form as FormDataAccessor
            form.setPrimaryType(primary)
            form.setSecondaryType(secondary)
        }
    }

    private fun substituteType(species: Species) {
        val implementedTypes = GravelsExtendedBattles.CONFIG.implementedTypes
        if (implementedTypes.none { it.equals(species.primaryType.name, ignoreCase = true) }) {
            val type = Type.getByName(species.primaryType.name)
            if (type != null) {
                val substitutionType = type.substitutionType
                if (substitutionType != null) {
                    val newType = substitutionType.elementalType
                    if (newType != null) {
                        val formDataAccessor = species as SpeciesAccessor
                        formDataAccessor.setPrimaryType(newType)
                    }
                }
            }
        }
        if (species.secondaryType != null) {
            if (implementedTypes.none { it.equals(species.secondaryType!!.name, ignoreCase = true) }) {
                val type = Type.getByName(species.secondaryType!!.name)
                if (type != null) {
                    val substitutionType = type.substitutionType
                    if (substitutionType != null) {
                        val newType = substitutionType.elementalType
                        if (newType != null) {
                            val formDataAccessor = species as SpeciesAccessor
                            formDataAccessor.setSecondaryType(newType)
                        }
                    }
                }
            }
        }
        if(species.primaryType == species.secondaryType) {
            val speciesAccessor = species as SpeciesAccessor
            speciesAccessor.setSecondaryType(null)
        }
        species.forms.forEach { formData ->
            if (implementedTypes.none { it.equals(formData.primaryType.name, ignoreCase = true) }) {
                val type = Type.getByName(formData.primaryType.name)
                if (type != null) {
                    val substitutionType = type.substitutionType
                    if (substitutionType != null) {
                        val newType = substitutionType.elementalType
                        if (newType != null) {
                            val formDataAccessor = formData as FormDataAccessor
                            formDataAccessor.setPrimaryType(newType)
                        }
                    }
                }
            }
            if (formData.secondaryType != null) {
                if (implementedTypes.none { it.equals(formData.secondaryType!!.name, ignoreCase = true) }) {
                    val type = Type.getByName(formData.secondaryType!!.name)
                    if (type != null) {
                        val substitutionType = type.substitutionType
                        if (substitutionType != null) {
                            val newType = substitutionType.elementalType
                            if (newType != null) {
                                val formDataAccessor = formData as FormDataAccessor
                                formDataAccessor.setSecondaryType(newType)
                            }
                        }
                    }
                }
            }
            if (formData.primaryType == formData.secondaryType) {
                val formDataAccessor = formData as FormDataAccessor
                formDataAccessor.setSecondaryType(null)
            }
        }
    }
}
