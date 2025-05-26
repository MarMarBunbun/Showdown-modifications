package drai.dev.gravelsextendedbattles;

public class SpawnModifier {
    private float modifier;
    private String label;

    public SpawnModifier(float modifier, String label) {
        this.modifier = modifier;
        this.label = label;
    }

    public float getModifier() {
        return modifier;
    }

    public String getLabel() {
        return label;
    }
}
