package drai.dev.gravelmon.pokemon.attributes;

public enum EvolutionRequirementCondition {


    LEVEL("level","minLevel"),
    TIME("time_range", "range"),
    RATIO("attack_defence_ratio", "ratio"),
    HAS_MOVE("has_move", "move"),
    HELD_ITEM("held_item", "itemCondition"),
    PROPERTY("properties", "target"),
    FRIENDSHIP("friendship", "amount"),
    PARTY_MEMBER("party_member", "target"),
    BIOME("biome", "biomeCondition"),
    WEATHER("weather", "isRaining"),
    BLOCKS_TRAVELED("blocks_traveled", "amount"),
    FRIENDSHIP_BELOW("friendship_below", "amount");
    private String name;
    private String condition;
    EvolutionRequirementCondition(String name, String condition){
        this.name = name;
        this.condition = condition;
    }
    public String getCondition(){
        return condition;
    }
    public String getName() {
        return name;
    }
}
