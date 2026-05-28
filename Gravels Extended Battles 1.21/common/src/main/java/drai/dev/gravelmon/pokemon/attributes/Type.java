package drai.dev.gravelmon.pokemon.attributes;

import org.jetbrains.annotations.*;

public enum Type {
    NORMAL("normal", null, "minecraft:white_wool"),
    FIRE("fire", null, "minecraft:magma_block"),
    FIGHTING("fighting", null, "minecraft:target_block"),
    WATER("water", null, "minecraft:prismarine"),
    FLYING("flying", null, "minecraft:hay_block"),
    GRASS("grass", null, "minecraft:moss_block"),
    POISON("poison", null, "minecraft:cauldron"),
    ELECTRIC("electric", null, "minecraft:redstone_block"),
    GROUND("ground", null, "minecraft:packed_mud"),
    PSYCHIC("psychic", null, "minecraft:amethyst_block"),
    ROCK("rock", null, "minecraft:tuff"),
    ICE("ice", null, "minecraft:packed_ice"),
    BUG("bug", null, "minecraft:honeycomb_block"),
    DRAGON("dragon", null, "minecraft:raw_gold_block"),
    GHOST("ghost", null, "minecraft:bone_block"),
    DARK("dark", null, "minecraft:black_wool"),
    STEEL("steel", null, "minecraft:iron_block"),
    FAIRY("fairy", null, "minecraft:pink_stained_glass"),
    SHADOW("shadow", Type.DARK, "minecraft:soul_soil"),
    WIND("wind", Type.FLYING, "minecraft:white_stained_glass"),
    COSMIC("cosmic", Type.PSYCHIC, "minecraft:purpur"),
    SOUND("sound", Type.NORMAL, "minecraft:note_block"),
    NUCLEAR("nuclear", Type.POISON, "minecraft:iron_trap_door"),
    DIGITAL("digital", Type.ELECTRIC, "minecraft:pc"),
    PLASTIC("plastic", Type.NORMAL, "minecraft:yellow_glazed_teracotta"),
    LIGHT("light", Type.PSYCHIC, "minecraft:glowstone"),
    SLIME("slime", Type.POISON, "minecraft:slime_block"),
    CRYSTAL("crystal", Type.ROCK, "minecraft:amethyst_block"),
    ELDRITCH("eldritch", Type.GHOST, "minecraft:sculk"),
    MYSTERY("mystery", Type.NORMAL, "minecraft:infested_stone"),
    BLOOD("blood", Type.DARK, "minecraft:nether_wart_block");
    private final String name;
    private final String preferredBlock;
    @Nullable
    private final Type substitutionType;
    Type(String name, @Nullable Type substitutionType, String preferredBlock) {
        this.name = name;
        this.substitutionType = substitutionType;
        this.preferredBlock = preferredBlock;
    }

    public String getPreferredBlock() {
        return preferredBlock;
    }

    public String getName() {
            return name;
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
}
