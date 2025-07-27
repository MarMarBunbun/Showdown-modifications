package drai.dev.gravelsextendedbattles;

import com.cobblemon.mod.common.api.pokedex.*;
import com.cobblemon.mod.common.api.pokedex.def.*;
import com.cobblemon.mod.common.api.pokedex.entry.*;
import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import drai.dev.gravelmon.pokemon.attributes.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import drai.dev.gravelsextendedbattles.mixin.*;
import drai.dev.gravelsextendedbattles.resorting.*;
import net.minecraft.resources.*;

import java.util.*;

import static drai.dev.gravelsextendedbattles.SpeciesManager.containsBannedLabels;
import static drai.dev.gravelsextendedbattles.SpeciesManager.getSpeciesToBeRemoved;

public class GravelmonPokedexManager {

    public static void processPokedexBans(Dexes dexes){
        var pokemonSpecies = PokemonSpecies.INSTANCE;
        var pokemonSpeciesAccesssor = ((GravelmonPokemonSpeciesAccessor) (Object) pokemonSpecies);
        var currentSpecies = pokemonSpeciesAccesssor.getSpeciesByIdentifier().values();
        var allDexes = new ArrayList<>(dexes.getDexEntryMap().entrySet());
        for (var dex : allDexes){
            var dexDef = dex.getValue();
            if(dexDef instanceof AggregatePokedexDef) continue;
            var entries = new ArrayList<>(dexDef.getEntries());
            var resourceLocationEntries = new ArrayList<ResourceLocation>();
            for (int i = 0; i < entries.size(); i++) {
                resourceLocationEntries.add(entries.get(i).getId());
            }
            for (var entry : entries){
                var species = pokemonSpecies.getByName(entry.getSpeciesId().getPath().split("-")[0].split(" ")[0]);
                if(species == null || !currentSpecies.contains(species)) {
                    resourceLocationEntries.removeIf(
                            currentEntry->currentEntry.getPath().equalsIgnoreCase(entry.getId().getPath())
                            && currentEntry.getNamespace().equalsIgnoreCase(entry.getId().getNamespace()));
                    continue;
                }
                var forms = new ArrayList<>(entry.getForms());
                var shouldRemoveIfNoForms = !entry.getForms().isEmpty();
                var formsToRemove = entry.getForms().stream().filter(pokedexForm -> {
                    var form = species.getForm(Set.of(pokedexForm.getDisplayForm()));
                    var formNames = species.getForms().stream().map(FormData::getName).toList();
                    if(!pokedexForm.getDisplayForm().equalsIgnoreCase("normal") && !formNames.contains(pokedexForm.getDisplayForm())) return true;
                    List<String> labels = form.getLabels().stream().toList();
                    if (containsBannedLabels(labels)) {
                        return true;
                    }
                    return false;
                }).toList();
                for(var form : formsToRemove){
                    entry.getForms().remove(form);
                }
                if(shouldRemoveIfNoForms && entry.getForms().isEmpty()) {
                    resourceLocationEntries.removeIf(
                            currentEntry -> currentEntry.getPath().equalsIgnoreCase(entry.getId().getPath())
                                    && currentEntry.getNamespace().equalsIgnoreCase(entry.getId().getNamespace()));
                }
            }
            ((SimplePokedexDefAccessor)(Object)dexDef).setEntries(resourceLocationEntries);
            //empty pokedexes should be removed
            if(resourceLocationEntries.isEmpty()) {
                dexes.getDexEntryMap().remove(dex.getKey());
//                if(national !=null) ((NationalDexAccessor)(Object)national).getSubDexIds().remove(dex.getKey());
            }
        }

        for (var dex : allDexes) {
            if (dex.getValue().getId().getPath().equalsIgnoreCase("national")) continue;
            var currentEntries = new ArrayList<>(dex.getValue().getEntries());
            dex.getValue().getEntries().clear();
            for (int i = 0; i < currentEntries.size(); i++) {
                dex.getValue().getEntries().add(currentEntries.get(i));
            }
        }
    }

    public static List<PokedexEntry> processPokedexResorting(List<PokedexEntry> nationalDexEntries){
        var evolutionGraph = GravelmonPokedexResorter.GRAPH_INSTANCE;
        var sortedSpecies = evolutionGraph.getSortedSpecies();
        var sortedEntries = new ArrayList<PokedexEntry>();
        var pokemonSpecies = PokemonSpecies.INSTANCE;
        var mappedEntries = new HashMap<ResourceLocation, PokedexEntry>();
        nationalDexEntries.forEach(entry -> {
            var species = pokemonSpecies.getByIdentifier(entry.getSpeciesId());
            if(species == null) return;
            mappedEntries.put(species.resourceIdentifier, entry);
        });
        for (int i = 0; i < sortedSpecies.size(); i++) {
            var sortedSpeciesEntry = sortedSpecies.get(i);
            var species = sortedSpeciesEntry.getSpecies();
            var entry = mappedEntries.get(species.resourceIdentifier);
            if(entry == null) continue;
            sortedEntries.add(entry);
        }
        if (sortedEntries.isEmpty()) return nationalDexEntries;
        return sortedEntries;
    }
}
