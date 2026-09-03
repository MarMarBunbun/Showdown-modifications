package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.api.pokemon.evolution.*;
import net.minecraft.resources.*;
import net.minecraft.world.level.block.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(CobblemonBlocks.class)
public interface CobblemonBlocksAccessor {
    @Mutable
    @Accessor("typeGemBlocks")
    static Map<ResourceLocation, Block> getTypeGemBlocks() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }

    @Mutable
    @Accessor("typeGemClusters")
    static Map<ResourceLocation, Block> getTypeGemClusters() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }
}
