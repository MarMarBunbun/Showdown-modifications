package drai.dev.gravelsextendedbattles.items;

import net.minecraft.world.item.*;

public class TypedItem extends Item implements HasType {
    private String type;
    public TypedItem(String type, Properties properties) {
        super(properties);
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
