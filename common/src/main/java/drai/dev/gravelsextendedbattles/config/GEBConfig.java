package drai.dev.gravelsextendedbattles.config;

import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.pokemon.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.additions.types.*;
import eu.midnightdust.lib.config.*;
import org.jetbrains.annotations.*;

import java.util.*;
import java.util.logging.*;

public class GEBConfig extends MidnightConfig {
    @Entry(name = "Banned Labels: ")
    public static List<String> bannedLabels = new ArrayList<>(List.of("not_modeled", "joke"));
    @Entry(name = "Allowed Labels: ")
    public static List<String> allowedLabels = new ArrayList<>(); 
    @Entry(name = "Spawn Modifiers (Formatted as <label>:<modifier number>, eg 'delta:1.5'): ")
    public static List<String> spawnModifiers = new ArrayList<>(); 
    @Entry(name = "Passwords: ")
    public static List<String> passwords = new ArrayList<>(); 
    @Entry(name = "Allowed Types: ")
    public static List<String> implementedTypes = new ArrayList<>(getInitForTypes());
    @Entry(name = "Original Fangame Typings: ")
    public static boolean enableFangameTypechart = false;
    @Entry(name = "Re-sort pokedex in evolution order: ")
    public static boolean resortPokedexInEvolutionOrder = false;
    @Entry(name = "Add Starters to the starter screen: ")
    public static boolean addStartersToTheStarterScreen = true;
    @Entry(name = "Enable automatic move insertion: ")
    public static boolean enableAutomaticMoveInsertion = true;
    @Entry(name = "Enable automatic move insertion: ")
    public static boolean battleDebugging = false;
    @Entry(name = "Banned Pokemon: ")
    public static List<String> bannedPokemon = new ArrayList<>();

    private List<RenderablePokemon> bannedRenderablePokemon;

    public List<RenderablePokemon> getBannedPokemonProperties() {
        if(bannedRenderablePokemon != null) return bannedRenderablePokemon;
        bannedRenderablePokemon = bannedPokemon.stream().map(PokemonProperties.Companion::parse).map(PokemonProperties::asRenderablePokemon).toList();
        return bannedRenderablePokemon;
    }
    public boolean getEnableOriginalFanGameTypings() {
        return enableFangameTypechart;
    }

    public boolean getEnableDexResort() {
        return resortPokedexInEvolutionOrder;
    }
    
    public boolean getAutomaticMoveInsertion() {
        return enableAutomaticMoveInsertion;
    }

    public List<String> getBannedLabels() {
        return bannedLabels;
    }

    
    public List<String> getAllowedLabels() {
        return allowedLabels;
    }

    
    public List<SpawnModifier> getSpawnModifiers() {
        return spawnModifiers.stream().map(raw-> {
            String[] parts = raw.split(":");
            if (parts.length < 2) {
                System.out.println("Invalid spawn modifier format: " + raw);
            }
            return new SpawnModifier(Float.valueOf(parts[0]), parts[1]);
        }).toList();
    }

    
    public List<String> getImplementedTypes() {
        return implementedTypes;
    }

    
    public List<String> getPasswords() {
        return passwords;
    }

    
    public boolean getShouldAddStarters() {
        return addStartersToTheStarterScreen;
    }

    
    public boolean unmuteBattleLogs() {
        return battleDebugging;
    }

    static List<String> getInitForTypes(){
        return List.of(
                "normal",
                "fire",
                "water",
                "grass",
                "electric",
                "ice",
                "fighting",
                "poison",
                "ground",
                "flying",
                "psychic",
                "bug",
                "rock",
                "ghost",
                "dragon",
                "dark",
                "steel",
                "fairy",
                "cosmic",
                "crystal",
                "digital",
                "light",
                "nuclear",
                "plastic",
                "mystery",
                "shadow",
                "slime",
                "sound",
                "wind",
                "eldritch",
                "blood"
        );
    }
}
