package drai.dev.gravelsextendedbattles.additions.types;

import com.cobblemon.mod.common.api.types.*;
import org.jetbrains.annotations.*;

import java.util.*;

public enum Type {
    NORMAL("normal", null, "minecraft:white_wool", null, null),
    FIRE("fire", null, "minecraft:magma_block", null, "Cannot be burned by regular means"),
    FIGHTING("fighting", null, "minecraft:target_block", null, null),
    WATER("water", null, "minecraft:prismarine", null, null),
    FLYING("flying", null, "minecraft:hay_block", null, null),
    GRASS("grass", null, "minecraft:moss_block", null, "Immune to Powder moves"),
    POISON("poison", null, "minecraft:cauldron", null, "Cannot be poisoned by regular means"),
    ELECTRIC("electric", null, "minecraft:redstone_block", null, "Cannot be paralyzed by regular means"),
    GROUND("ground", null, "minecraft:packed_mud", null, "Immune to Thunder Wave"),
    PSYCHIC("psychic", null, "minecraft:amethyst_block", null, null),
    ROCK("rock", null, "minecraft:tuff", null, null),
    ICE("ice", null, "minecraft:packed_ice", null, null),
    BUG("bug", null, "minecraft:honeycomb_block", null, null),
    DRAGON("dragon", null, "minecraft:raw_gold_block", null, null),
    GHOST("ghost", null, "minecraft:bone_block", null, "Can always escape or switch out"),
    DARK("dark", null, "minecraft:black_wool", null, null),
    STEEL("steel", null, "minecraft:iron_block", null, "Cannot be poisoned by regular means"),
    FAIRY("fairy", null, "minecraft:pink_stained_glass", null, null),
    SHADOW("shadow", Type.DARK, "minecraft:soul_soil", null, null),//unused by gravelmon
    WIND("wind", Type.FLYING, "minecraft:white_stained_glass", null, null),//unused by gravelmon
    COSMIC("cosmic", Type.PSYCHIC, "minecraft:purpur",
        List.of("infinity", "vanguard", "kuria",
                "novrai", "olysos", "soulstones",
                "sorin", "theos", "form"),
        null),
    SOUND("sound", Type.NORMAL, "minecraft:note_block",
            List.of("aldao", "vanguard", "kuria",
                    "mahal", "raian", "realidea",
                    "soulstones", "xenoverse"),
            null),
    NUCLEAR("nuclear", Type.POISON, "minecraft:iron_trap_door",
            List.of("uranium", "dhiome", "ferran", "soulstones", "form"), null),
    DIGITAL("digital", Type.ELECTRIC, "minecraft:pc", null, null),//unused by gravelmon
    PLASTIC("plastic", Type.NORMAL, "minecraft:yellow_glazed_teracotta", null, null),//unused by gravelmon
    LIGHT("light", Type.PSYCHIC, "minecraft:glowstone",
        List.of("kuria", "mongratis", "nodorro", "olysos", "soulstones"), null),
    SLIME("slime", Type.POISON, "minecraft:slime_block", null, null),//unused by gravelmon
    CRYSTAL("crystal", Type.ROCK, "minecraft:amethyst_block", List.of("kuria", "mastenia", "insurgence"), null),
    ELDRITCH("eldritch", Type.GHOST, "minecraft:sculk", null, null),//unused by gravelmon
    MYSTERY("mystery", Type.NORMAL, "minecraft:infested_stone",
        List.of("kuria", "blazing_emerald", "infinity",
                "interregional", "ionos", "nodorro",
                "okeno", "qamor"), null),
    BLOOD("blood", Type.DARK, "minecraft:nether_wart_block",
            List.of("raian"), null);
    private final String name;
    private final String secondaryEffect;
    private final String preferredBlock;
    @Nullable
    private final Type substitutionType;
    private final List<String> games = new ArrayList<>();
    Type(String name, @Nullable Type substitutionType, String preferredBlock, List<String> introducedByGames, @Nullable String secondaryEffect) {
        this.name = name;
        this.substitutionType = substitutionType;
        this.preferredBlock = preferredBlock;
        if(introducedByGames != null) this.games.addAll(introducedByGames);
        this.secondaryEffect = secondaryEffect;
    }

    public String getPreferredBlock() {
        return preferredBlock;
    }

    public String getName() {
            return name;
    }

    public @Nullable String getSecondaryEffect() {
        return secondaryEffect;
    }

    public @Nullable Type getSubstitutionType() {
        return substitutionType;
    }

    public static Type getByName(String name) {
        for (Type type : Type.values()) {
            if (type.getName().equalsIgnoreCase(name)) {
                return type;
            }
        }
        return null;
    }

    public List<String> getGames() {
        return games;
    }

    public @Nullable ElementalType getElementalType() {
        return ElementalTypes.get(name);
    }
}
