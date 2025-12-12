package drai.dev.gravelsextendedbattles;

import drai.dev.gravelmon.pokemon.attributes.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import eu.midnightdust.lib.config.*;

import java.util.*;
import java.util.logging.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.*;

public class GravelmonConfig extends MidnightConfig implements IGravelmonConfig {
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

    @Override
    public boolean getEnableOriginalFanGameTypings() {
        return enableFangameTypechart;
    }

    @Override
    public boolean getEnableDexResort() {
        return resortPokedexInEvolutionOrder;
    }

    @Override
    public boolean getAutomaticMoveInsertion() {
        return enableAutomaticMoveInsertion;
    }

    @Override
    public List<String> getBannedLabels() {
        var allBannedLabels = new ArrayList<>(bannedLabels);
        for (Label label : Label.passwordProtectedLabels.keySet()) {
            if (!PASSWORDS.contains(Label.passwordProtectedLabels.get(label))) allBannedLabels.add(label.getName());
        }

        LOGGER.log(Level.INFO, "Banned Labels: {0}", String.join(",\n", allBannedLabels));

        return allBannedLabels;
    }

    @Override
    public List<String> getAllowedLabels() {
        return allowedLabels;
    }

    @Override
    public List<SpawnModifier> getSpawnModifiers() {
        return spawnModifiers.stream().map(raw-> {
            String[] parts = raw.split(":");
            if (parts.length < 2) {
                System.out.println("Invalid spawn modifier format: " + raw);
            }
            return new SpawnModifier(Float.valueOf(parts[0]), parts[1]);
        }).toList();
    }

    @Override
    public List<String> getImplementedTypes() {
        return implementedTypes;
    }

    @Override
    public List<String> getPasswords() {
        return passwords;
    }

    @Override
    public boolean getShouldAddStarters() {
        return addStartersToTheStarterScreen;
    }

    @Override
    public boolean unmuteBattleLogs() {
        return battleDebugging;
    }
    /*
    The .json language file for your config class could look similar to this:
    {
	    "modid.midnightconfig.title":"I am a title",        // "*.midnightconfig.title" defines the title of the screen
	    "modid.midnightconfig.text1":"I am a comment *u*",  // Translation for the comment "text1" defined in the example config
	    "modid.midnightconfig.text2":"I am a centered comment (╯°□°）╯︵ ┻━┻",
	    "modid.midnightconfig.name":"I am a string!",             // Translation for the field "name" defined in the example config
	    "modid.midnightconfig.name.tooltip":"I am a tooltip uwu \nI am a new line",
	    // When hovering over the option "showInfo",
	    // this text will appear as a tooltip.
	    // "\n" inserts a line break.
	    "modid.midnightconfig.fabric":"I am an int",
	    "modid.midnightconfig.world":"I am a double",
	    "modid.midnightconfig.showInfo":"I am a boolean",
	    "modid.midnightconfig.hello":"I am a limited int!",
	    "modid.midnightconfig.testEnum":"I am an enum!",
	    "modid.midnightconfig.enum.TestEnum.FORGE":"Slow",
	    "modid.midnightconfig.enum.TestEnum.FABRIC":"Fancy",
	    "modid.midnightconfig.enum.TestEnum.QUILT":"Fabulous",
	    "modid.midnightconfig.category.numbers": "Numbers",
	    "modid.midnightconfig.category.text": "Text",
	    "modid.midnightconfig.category.sliders": "Sliders"
    }
    To initialize the config you have to call "MidnightConfig.init("modid", MidnightConfigExample.class)" in your ModInitializer
    To get an instance of the config screen you have to call "MidnightConfig.getScreen(parent, "modid");"
    If you don't use the whole library and therefore not the automatic ModMenu integration, the code in your ModMenu integration class would look something like this:
    @Override
    public ConfigScreenFactory<?> getModConfigScreenFactory() {
        return parent -> MidnightConfig.getScreen(parent, "modid");
    }
    */

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
                "questionmark",
                "shadow",
                "slime",
                "sound",
                "wind",
                "eldritch",
                "blood"
        );
    }
}
