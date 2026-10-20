package drai.dev.gravelsextendedbattles.additions.moves

import com.cobblemon.mod.common.api.moves.MoveTemplate
import com.cobblemon.mod.common.api.moves.Moves.getByName
import com.cobblemon.mod.common.api.tms.TechnicalMachines
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.additions.moves.addition.MoveAddition
import drai.dev.gravelsextendedbattles.additions.moves.substitution.MoveSubstitution
import drai.dev.gravelsextendedbattles.additions.moves.substitution.TypeMoveSubstitution
import drai.dev.gravelsextendedbattles.additions.types.TypeChange
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.crafting.Ingredient
import org.apache.commons.lang3.math.NumberUtils

object MoveManager {
    fun processMoveSubstitutions(moveSubstitutions: MutableSet<MoveSubstitution>) {
        val moveSubstitutionsByTemplate: Map<MoveTemplate?, List<MoveSubstitution>> =
            moveSubstitutions.filter { it.shouldSubstitute() }.groupBy { it.oldMoveTemplate }
        PokemonSpeciesAccessor.getSpeciesByIdentifier().values.flatMap { it.forms }.forEach { pokemon ->
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.tmMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.eggMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.tutorMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.formChangeMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.legacyMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.specialMoves)
            val evolutionMovesList = ArrayList<MoveTemplate>(pokemon.moves.evolutionMoves)
            for (move in evolutionMovesList) {
                val moveSubs = moveSubstitutionsByTemplate[move] ?: continue
                pokemon.moves.evolutionMoves.remove(move)
                moveSubs.forEach moveSubLoop@{
                    val newMove = it.newMoveTemplate ?: continue
                    pokemon.moves.evolutionMoves.add(newMove)
                }
            }
            val levelUpMoves = pokemon.moves.levelUpMoves
            for ((key, value) in levelUpMoves) {
                val movesOnLevel = ArrayList<MoveTemplate>(value)
                for (move in movesOnLevel) {
                    val moveSubs = moveSubstitutionsByTemplate[move] ?: continue
                    pokemon.moves.levelUpMoves[key]?.remove(move)
                    moveSubs.forEach moveSubLoop@{
                        val newMove = it.newMoveTemplate ?: continue
                        pokemon.moves.levelUpMoves[key]?.add(newMove)
                    }
                }
            }
        }
        applyTMChanges(moveSubstitutions)
    }
    
    private fun applyTMChanges(moveSubstitutions: Collection<MoveSubstitution>) {
        val substitutionsByMove = moveSubstitutions
            .filter { it.shouldSubstitute() }
            .groupBy { it.oldMoveTemplate }

        TechnicalMachines.tmMap.entries
            .filter { (_, tm) -> substitutionsByMove.containsKey(tm.moveName) }
            .forEach { (resourceLocation, tm) ->
                val substitution = substitutionsByMove[tm.moveName]
                    ?.firstOrNull { it.newMoveTemplate != null }
                    ?: return@forEach
                val newMove = substitution.newMoveTemplate ?: return@forEach
                val newMoveAlreadyHasTM = TechnicalMachines.tmMap.any { (otherLocation, otherTm) ->
                    otherLocation != resourceLocation && otherTm.moveName == newMove
                }
                if (newMoveAlreadyHasTM) {
                    // Another TM already teaches the new move; keeping both would add identical stacks to the creative tab.
                    TechnicalMachines.tmMap.remove(resourceLocation)
                    if (TechnicalMachines.moveToTM[tm.moveName] === tm) {
                        TechnicalMachines.moveToTM.remove(tm.moveName)
                    }
                    return@forEach
                }
                val newRecipe = tm.recipe?.map { recipe ->
                    val typeSubstitution = substitution as? TypeMoveSubstitution
                    val oldGem = typeSubstitution?.let { findTypeGem(tm.type) }
                    val newGem = typeSubstitution?.let { findTypeGem(newMove.elementalType.name) }

                    if (oldGem != null && newGem != null &&
                        recipe.ingredient.test(ItemStack(oldGem))
                    ) {
                        recipe.copy(ingredient = Ingredient.of(newGem))
                    } else {
                        recipe
                    }
                }
                val replacement = com.cobblemon.mod.common.api.tms.TechnicalMachine(
                    moveName = newMove,
                    recipe = newRecipe,
                    obtainMethods = tm.obtainMethods,
                    type = newMove.elementalType.name
                )

                TechnicalMachines.tmMap[resourceLocation] = replacement
                TechnicalMachines.moveToTM.remove(tm.moveName)
                TechnicalMachines.moveToTM[newMove] = replacement
                replacement.id = resourceLocation
            }
    }

    private fun findTypeGem(typeName: String) =
        BuiltInRegistries.ITEM.entrySet()
            .firstOrNull { (resourceLocation, item) ->
                resourceLocation.location().path.equals("${typeName.lowercase()}_gem", ignoreCase = true)
            }
            ?.value

    private fun substituteMoves(moveSubstitutionsByTemplate: Map<MoveTemplate?, List<MoveSubstitution>>, moves: MutableList<MoveTemplate>) {
        val moveList = java.util.ArrayList(moves)
         for (move in moveList) {
             val moveSubstitutions = moveSubstitutionsByTemplate[move] ?: continue
             moves.remove(move)
             moveSubstitutions.forEach moveSubLoop@{ moveSubstitution ->
                 val newMove = moveSubstitution.newMoveTemplate ?: return@moveSubLoop
                 moves.add(newMove)
             }
        }
    }

    fun processMoveAdditions(moveAdditions: MutableSet<MoveAddition>) {
        moveAdditions.forEach { moveAddition: MoveAddition ->
            // Never another Pokemon's learnset: a recipient that does not exist (disabled, banned) is skipped, and an alternate form that
            // learns the species' moves gets its own copy first, so the base form does not learn them too.
            val moves = SpeciesManager.resolve(moveAddition.recipient)?.let(SpeciesManager::ownLearnset) ?: return@forEach
            moveAddition.learnsetEntries.forEach { learnsetEntry ->
                val condition = learnsetEntry.split(":")[0]
                val move = getByName(learnsetEntry.split(":").getOrNull(1) ?: return@forEach) ?: return@forEach
                // An entry the learnset already has is not added twice (a change can list the whole learnset).
                fun MutableList<MoveTemplate>.addNew() { if (move !in this) add(move) }
                if (condition.equals("tm", ignoreCase = true)) {
                    moves.tmMoves.addNew()
                } else if (condition.equals("egg", ignoreCase = true)) {
                    moves.eggMoves.addNew()
                } else if (condition.equals("tutor", ignoreCase = true)) {
                    moves.tutorMoves.addNew()
                } else if (condition.equals("legacy", ignoreCase = true)) {
                    moves.legacyMoves.addNew()
                } else if (condition.equals("special", ignoreCase = true)) {
                    moves.specialMoves.addNew()
                } else if (condition.equals("form_change", ignoreCase = true)) {
                    moves.formChangeMoves.addNew()
                } else if (NumberUtils.isCreatable(condition)) {
                    moves.levelUpMoves.computeIfAbsent(condition.toInt()) { ArrayList() }.addNew()
                }
            }
        }
    }
}
