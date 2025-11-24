package drai.dev.gravelsextendedbattles.mixin.loot;

import net.minecraft.core.*;
import net.minecraft.world.item.*;
import net.minecraft.world.level.storage.loot.entries.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(LootItem.class)
public interface LootItemAccessor {
    @Mutable
    @Accessor
    Holder<Item> getItem();

    @Accessor()
    @Mutable
    void setItem(Holder<Item> item);
}
