package drai.dev.gravelsextendedbattles.neoforge;

import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.mixin.loot.*;
import net.minecraft.world.level.storage.loot.*;
import net.neoforged.fml.common.*;
import net.neoforged.fml.loading.*;
import net.neoforged.neoforge.common.*;
import net.neoforged.neoforge.event.*;

@Mod(GravelsExtendedBattles.MOD_ID)
public class GravelsExtendedBattlesNeoForge {
    public GravelsExtendedBattlesNeoForge() {
        GravelsExtendedBattles.init();
        NeoForge.EVENT_BUS.addListener(this::onLootTableLoad);
    }

    private void onLootTableLoad(LootTableLoadEvent event) {
        var pools = ((LootTableAccessor)event.getTable()).getPools();
        GravelmonFossilManager.addLootPools(pools.toArray(new LootPool[0]));
        GravelmonFossilManager.processFossilAdditions(event.getTable().getLootTableId(), lootPool->event.getTable().addPool(lootPool));
    }
}
