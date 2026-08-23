package drai.dev.gravelmon.pokemon.attributes;

public class MoveLearnSetEntry {
    Move move;
    String condition;

    public MoveLearnSetEntry(Move move, String condition) {
        this.move = move;
        this.condition = condition;
    }

    public MoveLearnSetEntry(Move move, int level){
        this.move = move;
        this.condition = ""+level;
    }

    public String getCondition() {
        return condition;
    }

    public Move getMove() {
        return move;
    }


}
