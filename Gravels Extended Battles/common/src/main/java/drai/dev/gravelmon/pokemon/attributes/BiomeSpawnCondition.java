package drai.dev.gravelmon.pokemon.attributes;

import java.util.*;

public class BiomeSpawnCondition extends SpawnCondition {
    private final List<Biome> biomes;

    public BiomeSpawnCondition(List<Biome> biomes) {
        super(SpawnConditionType.BIOMES, "");
        this.biomes = biomes;
    }

    public List<Biome> getBiomes() {
        return biomes;
    }
}
