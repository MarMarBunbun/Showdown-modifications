package drai.dev.gravelsextendedbattles.additions.moves

import com.cobblemon.mod.common.api.moves.MoveTemplate
import com.cobblemon.mod.common.api.moves.Moves.getByName
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import drai.dev.gravelsextendedbattles.additions.moves.addition.MoveAddition
import drai.dev.gravelsextendedbattles.additions.moves.substitution.MoveSubstitution
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import org.apache.commons.lang3.math.NumberUtils

object MoveManager {
    fun processFormEvolutionAdditions(moveSubstitutions: MutableSet<MoveSubstitution>) {
        val moveSubstitutionsByTemplate: Map<MoveTemplate?, List<MoveSubstitution>> = moveSubstitutions.filter { it.shouldSubstitute() }.groupBy { it.oldMoveTemplate }
        (PokemonSpecies as PokemonSpeciesAccessor).speciesByIdentifier.values.flatMap { it.forms }.forEach { pokemon ->
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
    }

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
            val condition = moveAddition.learnsetEntry.split(":")[0]
            val move = getByName(moveAddition.learnsetEntry.split(":")[1]) ?: return@forEach
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
