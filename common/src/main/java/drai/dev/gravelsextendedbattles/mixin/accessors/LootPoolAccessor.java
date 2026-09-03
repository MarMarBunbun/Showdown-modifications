package drai.dev.gravelsextendedbattles.mixin.accessors;

import net.minecraft.world.level.storage.loot.*;
import net.minecraft.world.level.storage.loot.entries.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(LootPool.class)
public interface LootPoolAccessor {
    @Mutable
    @Accessor
    public List<LootPoolEntryContainer> getEntries();

    @Mutable
    @Accessor
    void setEntries(List<LootPoolEntryContainer> entries);
}
