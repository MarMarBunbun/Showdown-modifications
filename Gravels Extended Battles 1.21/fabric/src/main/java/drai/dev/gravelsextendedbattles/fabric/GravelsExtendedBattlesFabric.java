package drai.dev.gravelsextendedbattles.fabric;

import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.mixin.loot.*;
import net.fabricmc.api.*;
import net.fabricmc.fabric.api.loot.v3.*;
import net.fabricmc.loader.api.*;
import net.minecraft.world.level.storage.loot.*;

public class GravelsExtendedBattlesFabric implements ModInitializer {


    @Override
    public void onInitialize() {
        GravelsExtendedBattles.init();
        LootTableEvents.MODIFY.register((key, tableBuilder, source, lookupProvider)-> {
            var pools = ((LootTableAccessor)tableBuilder.build()).getPools();
            GravelmonFossilManager.addLootPools(pools.toArray(new LootPool[0]));
            GravelmonFossilManager.processFossilAdditions(key.location(), tableBuilder);
        });
        CreativeTabsInit.initCreativeTabs();
    }
}
