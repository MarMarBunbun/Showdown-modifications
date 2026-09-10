package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.block.*;
import com.cobblemon.mod.common.item.berry.*;
import net.minecraft.resources.*;
import net.minecraft.world.level.block.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(CobblemonItems.class)
public interface CobblemonItemsAccessor {
    @Mutable
    @Accessor("berries")
    static Map<ResourceLocation, BerryItem> getBerries() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }
}
