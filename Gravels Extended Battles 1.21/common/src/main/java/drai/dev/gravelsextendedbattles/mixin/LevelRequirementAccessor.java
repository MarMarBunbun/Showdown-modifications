package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.pokemon.requirements.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(LevelRequirement.class)
public interface LevelRequirementAccessor {

    @Mutable
    @Accessor("minLevel")
    public void setMinLevel(int evolutions);
}
