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
    public Map<ResourceLocation, Block> getTypeGemBlocks();
    @Mutable
    @Accessor("typeGemClusters")
    public Map<ResourceLocation, Block> getTypeGemClusters();
}
