package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.types.*;
import net.minecraft.resources.*;
import net.minecraft.world.level.block.*;
import org.jetbrains.annotations.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(ElementalTypes.class)
public interface ElementalTypesAccessor {
    @Mutable
    @Accessor("allTypes")
    List<ElementalType> getAllTypes();
}
