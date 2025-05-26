package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.api.spawning.detail.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

public class GravelmonSpawnDetailsManager {
    private static boolean notSuppressedYet = true;
    public static void modifySpawnDetail(PokemonSpawnDetail spawnDetail) {
        var pokemon = spawnDetail.getPokemon();
        if (pokemon.getSpecies() != null) {
            var boosts = getBoostsForSpecies(pokemon);
            if(boosts.isEmpty()) {
                return;
            }
            boosts.sort(Comparator.comparingDouble(SpawnModifier::getModifier));
            boosts.stream().findFirst().ifPresent(boost -> {
                spawnDetail.setWeight(boost.getModifier()* spawnDetail.getWeight());
            });
        }
    }

    private static List<SpawnModifier> getBoostsForSpecies(PokemonProperties properties) {
        var labels = SpeciesManager.getLabelsFromProperties(properties);
        if(labels.isEmpty()) return Collections.emptyList();
        return GravelsExtendedBattles.gravelmonConfig.getSpawnModifiers().stream().filter(spawnModifier -> labels.contains(spawnModifier.getLabel())).toList();
    }

    public static void checkForBannedPokemon(PokemonSpawnDetail spawnDetail, CallbackInfoReturnable<Boolean> cir) {
        var pokemon = spawnDetail.getPokemon();
        if (pokemon.getSpecies() != null) {
//            var accesssor = (GravelmonPokemonSpeciesAccessor) (Object) PokemonSpecies.INSTANCE;
            var species = PokemonSpecies.INSTANCE.getByName(pokemon.getSpecies());
            if(species == null) {
                cir.setReturnValue(false);
                cir.cancel();
                return;
            }
            if(SpeciesManager.propertyContainsBannedLabels(pokemon)) {
                cir.setReturnValue(false);
                cir.cancel();
                return;
            }
//            if(!pokemon.getAspects().isEmpty()){
//                var formData = species.getForm(pokemon.getAspects());
//                if(formData == species.getStandardForm()) {
//                    cir.setReturnValue(false);
//                    cir.cancel();
//                    return;
//                }
//            }
            /*for(var formData : species.getForms()){
                if(SpeciesManager.containsBannedLabels(formData.getLabels().stream().toList())){
                    cir.setReturnValue(false);
                    cir.cancel();
                    return;
                }
            }
            if(species.getForm().getName()!=)*/

        } else {
            if(notSuppressedYet){
                notSuppressedYet = false;
                GravelsExtendedBattles.LOGGER.fine("Suppressed invalid species spawn detail warnings");
            }
            cir.setReturnValue(false);
            cir.cancel();
        }
    }
}
