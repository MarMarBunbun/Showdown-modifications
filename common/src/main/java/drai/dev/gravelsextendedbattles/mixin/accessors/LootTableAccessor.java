package drai.dev.gravelsextendedbattles.mixin.accessors;

import net.minecraft.world.level.storage.loot.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(LootTable.class)
public interface LootTableAccessor {
    @Accessor
    public List<LootPool> getPools();
}
