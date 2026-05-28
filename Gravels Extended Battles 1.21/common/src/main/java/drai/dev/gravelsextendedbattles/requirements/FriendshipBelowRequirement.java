package drai.dev.gravelsextendedbattles.requirements;

import com.cobblemon.mod.common.api.pokemon.requirement.*;
import com.cobblemon.mod.common.pokemon.*;
import org.jetbrains.annotations.*;

public class FriendshipBelowRequirement implements Requirement {
    int amount = 0;
    public static String ADAPTER_VARIANT = "friendship_below";
    
    @Override
    public boolean check(@NotNull Pokemon pokemon) {
        return pokemon.getFriendship() <= this.amount;
    }
}
