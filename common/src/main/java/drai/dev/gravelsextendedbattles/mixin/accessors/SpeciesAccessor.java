package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.pokemon.*;
import com.google.common.collect.*;
import net.minecraft.resources.*;
import net.minecraft.world.level.storage.loot.entries.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(Species.class)
public interface SpeciesAccessor {
    @Mutable
    @Accessor
    void setPrimaryType(ElementalType type);

    @Mutable
    @Accessor
    void setSecondaryType(ElementalType type);
}
