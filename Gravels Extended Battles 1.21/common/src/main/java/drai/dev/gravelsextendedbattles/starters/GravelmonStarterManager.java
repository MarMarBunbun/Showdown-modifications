package drai.dev.gravelsextendedbattles.starters;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.api.pokemon.feature.*;
import drai.dev.gravelsextendedbattles.*;

import java.util.*;

public class GravelmonStarterManager {
    public static Map<String, List<StarterCategoryDataHolder>> NEW_STARTERS = new HashMap<>();

    public static void registerNewStarter(String afterCategory, StarterCategoryDataHolder newStarter) {
        NEW_STARTERS.computeIfAbsent(afterCategory == null ? "" : afterCategory, k -> new ArrayList<>()).add(newStarter);
    }

    public static void processStarters(){
        var starterConfig = Cobblemon.INSTANCE.getStarterConfig();
        var currentStarters = starterConfig.getStarters();
        if(GravelsExtendedBattles.ADD_STARTERS){
            NEW_STARTERS.keySet().stream().sorted().forEach(key -> {
                for(var starterCategoryData : NEW_STARTERS.get(key).stream().sorted().toList()){
                    var newStarter = starterCategoryData.toStarterCategory();
                    if(!currentStarters.contains(newStarter)){
                        var afterCategory = currentStarters.stream().filter(starterCategory -> starterCategory.getName().equalsIgnoreCase(key)).findFirst();
                        if(afterCategory.isPresent()){
                            var index = currentStarters.indexOf(afterCategory.get()) + 1;
                            currentStarters.add(index, newStarter);
                        } else {
                            currentStarters.add(newStarter);
                        }

                    }
                }
            });
        }
        currentStarters.forEach(starterCategory -> {
            var starters = new ArrayList<>(starterCategory.component3().stream()
                    .filter(pokemonProperties -> !SpeciesManager.propertyContainsBannedLabels(pokemonProperties)).toList());
            starterCategory.component3().clear();
            starterCategory.component3().addAll(starters);
        });
        var finalCategories = currentStarters.stream().filter(starter -> !starter.component3().isEmpty()).toList();
        starterConfig.setStarters(finalCategories);
    }
}
