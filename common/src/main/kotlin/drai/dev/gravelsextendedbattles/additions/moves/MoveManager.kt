package drai.dev.gravelsextendedbattles.additions.moves

import com.cobblemon.mod.common.api.moves.MoveTemplate
import com.cobblemon.mod.common.api.moves.Moves.getByName
import com.cobblemon.mod.common.api.tms.TechnicalMachines
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
        val moveSubstitutionsByTemplate: Map<MoveTemplate?, List<MoveSubstitution>> = moveSubstitutions.filter { it.shouldSubstitute() }.groupBy { it.oldMoveTemplate }
        PokemonSpeciesAccessor.getSpeciesByIdentifier().values.flatMap { it.forms }.forEach { pokemon ->
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.tmMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.eggMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.tutorMoves)
            substituteMoves(moveSubstitutionsByTemplate, pokemon.moves.formChangeMoves)
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
            val moves = moveAddition.recipient.asRenderablePokemon().form.moves
            moveAddition.learnsetEntries.forEach { learnsetEntry ->
                val condition = learnsetEntry.split(":")[0]
                val move = getByName(learnsetEntry.split(":")[1]) ?: return@forEach
                if (condition.equals("tm", ignoreCase = true)) {
                    moves.tmMoves.add(move)
                } else if (condition.equals("egg", ignoreCase = true)) {
                    moves.eggMoves.add(move)
                } else if (condition.equals("tutor", ignoreCase = true)) {
                    moves.tutorMoves.add(move)
                } else if (condition.equals("legacy", ignoreCase = true)) {
                    moves.legacyMoves.add(move)
                } else if (condition.equals("special", ignoreCase = true)) {
                    moves.specialMoves.add(move)
                } else if (condition.equals("form_change", ignoreCase = true)) {
                    moves.formChangeMoves.add(move)
                } else if (NumberUtils.isCreatable(condition)) {
                    moves.levelUpMoves.computeIfAbsent(condition.toInt()) { ArrayList() }.add(move)
                }
            }
        }
    }
}
