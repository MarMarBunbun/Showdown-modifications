package drai.dev.gravelsextendedbattles.neoforge;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.item.*;
import com.cobblemon.mod.common.item.group.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.world.item.*;
import net.neoforged.bus.api.*;
import net.neoforged.fml.common.*;
import net.neoforged.neoforge.event.*;

import java.util.function.*;

@EventBusSubscriber(modid = GravelsExtendedBattles.MOD_ID)
public class CreativeTabsInit {

    @SubscribeEvent
    public static void buildContents(BuildCreativeModeTabContentsEvent event) {
        if(event.getTab() == CobblemonItemGroups.getHELD_ITEMS()) {
            //z stones
            GravelsExtendedBattlesItems.Z_CRYSTALS.keySet().stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.GEMS.stream().map(Supplier::get).forEach(item ->
                    event.insertAfter(new ItemStack(CobblemonItems.FAIRY_GEM), new ItemStack(item), CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS));
            GravelsExtendedBattlesItems.PLATES.stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.MEMORIES.stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values().stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.HELD_ITEMS.stream().map(Supplier::get)
                    .forEach(item ->
                            event.insertAfter(
                                    new ItemStack(CobblemonItems.PSYCHIC_SEED),
                                    new ItemStack(item),
                                    CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS));
        }

        if(event.getTab() == CobblemonItemGroups.getCONSUMABLES()) {
            event.insertAfter(new ItemStack(CobblemonItems.BURN_HEAL), new ItemStack(GravelsExtendedBattlesItems.FROST_HEAL.get()), CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS );
        }
    }
}
