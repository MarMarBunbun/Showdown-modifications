package drai.dev.gravelmon.pokemon.attributes;

public enum SpawnPreset {
    DERELICT("derelict"),
    FOLIAGE("foliage"),
    @Deprecated
    FRESHWATER("freshwater"),
    LAVA_SURFACE("lava"),
    NATURAL("natural"),
    REDSTONE("redstone"),
    RIVER("river"),
    JUNGLE_PYRAMID("jungle_pyramid"),
    ANCIENT_CITY("ancient_city"),
    OCEAN_RUINS("ocean_ruins"),
    RUINED_PORTAL("ruined_portal"),
    TRAIL_RUINS("trail_ruins"),
    TREE_TOP("treetop"),
    UNDERLAVA("lava"),
    UNDERWATER("water"),
    VILLAGE("village"),
    HONEY_TREE("honey_tree"),
    MANSION("mansion"),
    MINESHAFT("mineshaft"),
    NEAR_BERRY_BUSH("near_berry_bush"),
    NEAR_WATER("near_water"),
    OCEAN_MONUMENT("ocean_monument"),
    SPIDERWEBS("spiderwebs"),
    AMETHYST_GEODE("amethyst_geode"),
    WATER_SURFACE("water"),
    DESERT_PYRAMID("desert_pyramid"),
    NEAR_LAVA("near_lava"),
    NEAR_CAMPFIRE("near_campfire"),
    NEAR_CROPS("near_crops"),
    NEAR_MAGMA("near_magma"),
    ILLAGER_STRUCTURES("illager_structures"),
    GEMSTONES("gemstones"),
    STRONGHOLD("stronghold"),
    SHIP_WRECK("shipwreck"),
    END_CITY("end_city"),
    WILD("wild"),
    NEAR_BOOKSHELVES("near_bookshelves"),
    REEF("reef"),
    NETHER_FORTRESS("nether_structures"),
    UNDERGROUND("underground"),
    NEAR_MUD("near_mud");

    SpawnPreset(String name){
        this.name = name;
    }

    private String name;

    public String getName() {
        return name;
    }
}
