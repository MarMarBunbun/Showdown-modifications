package drai.dev.gravelsextendedbattles.resorting;

import com.cobblemon.mod.common.api.moves.*;
import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import drai.dev.gravelmon.pokemon.attributes.*;
import drai.dev.gravelmon.pokemon.attributes.Move;
import drai.dev.gravelsextendedbattles.*;
import org.apache.commons.lang3.math.*;

import java.util.*;

public class GravelmonMoveSubstitution {
    private static Map<String, String> moveUpdateMap = new HashMap<>();
    private static Map<String, List<MoveLearnSetEntry>> movesToAdd = new HashMap<>();
    public static void registerMoveForSubstitution(String original, String replacement){
        moveUpdateMap.put(original, replacement);
    }

    public static void registerMoveInsertion(String pokemon, MoveLearnSetEntry moveToInsert){
        movesToAdd.computeIfAbsent(pokemon, k -> new ArrayList<>()).add(moveToInsert);
    }

    public static void substituteMoves(){
        registerGEBMovesForSubstitution();
        var pokemonSpecies = PokemonSpecies.INSTANCE.getSpecies();
        var keys = moveUpdateMap.keySet();
        for(var pokemon : pokemonSpecies){
            if(movesToAdd.containsKey(pokemon.getName())) {
                movesToAdd.get(pokemon.getName()).forEach(moveLearnSetEntry -> {
                    var condition = moveLearnSetEntry.getCondition();
                    var move = Moves.INSTANCE.getByName(moveLearnSetEntry.getMove().getName());
                    var moves = pokemon.getMoves();
                    if(move == null) return;
                    if (condition.equalsIgnoreCase("tutor")) {
                        moves.getTutorMoves().add(move);
                    } else if (condition.equalsIgnoreCase("tm")) {
                        moves.getTmMoves().add(move);
                    } else if (condition.equalsIgnoreCase("egg")) {
                        moves.getEggMoves().add(move);
                    } else if (NumberUtils.isCreatable(condition)) {
                        moves.getLevelUpMoves().computeIfAbsent(Integer.parseInt(condition), i -> new ArrayList<>())
                                .add(move);
                    }
                });
            }

            substituteMoves(keys, pokemon.getMoves().getTmMoves());
            substituteMoves(keys, pokemon.getMoves().getEggMoves());
            substituteMoves(keys, pokemon.getMoves().getTutorMoves());
            substituteMoves(keys, pokemon.getMoves().getFormChangeMoves());
            var moveList = new ArrayList<>(pokemon.getMoves().getEvolutionMoves());
            for(var move : moveList){
                if(keys.contains(move.getName())){
                    var newMove = Moves.INSTANCE.getByName(moveUpdateMap.get(move.getName()));
                    if (newMove == null) continue;
                    pokemon.getMoves().getEvolutionMoves().remove(move);
                    pokemon.getMoves().getEvolutionMoves().add(newMove);
                }
            }

            var levelUpMoves = pokemon.getMoves().getLevelUpMoves();
            for(var levelMoves : levelUpMoves.entrySet()){
                var movesOnLevel = new ArrayList<>(levelMoves.getValue());

                for(var move : movesOnLevel){
                    if(keys.contains(move.getName())){
                        var newMove = Moves.INSTANCE.getByName(moveUpdateMap.get(move.getName()));
                        if (newMove == null) continue;
                        levelMoves.getValue().remove(move);
                        levelMoves.getValue().add(newMove);
                    }
                }
                levelUpMoves.put(levelMoves.getKey(), levelMoves.getValue());
            }
        }
    }

    private static void substituteMoves(Set<String> keys, List<MoveTemplate> moves) {
        var moveList = new ArrayList<>(moves);
        for(var move : moveList){
            if(keys.contains(move.getName())){
                var newMove = Moves.INSTANCE.getByName(moveUpdateMap.get(move.getName()));
                if (newMove == null) continue;
                moves.remove(move);
                moves.add(Moves.INSTANCE.getByName(moveUpdateMap.get(move.getName())));
            }
        }
    }

    private static void registerGEBMovesForSubstitution() {
        Move.getTypeOverwrittenMoves().stream().filter(move-> GravelsExtendedBattles.IMPLEMENTED_TYPES.contains(move.getTypeOverwrite()) && move.isImplemented()).forEach(move ->
                moveUpdateMap.put(move.getName(), move.getOverwittenMoveName())
        );
    }
}
