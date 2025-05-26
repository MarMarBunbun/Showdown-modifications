package drai.dev.gravelsextendedbattles.fabric;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.item.group.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.itemgroup.v1.*;
import net.minecraft.world.item.*;

import java.util.function.*;


public class CreativeTabsInit {
    public static void initCreativeTabs(){
        ItemGroupEvents.modifyEntriesEvent(CobblemonItemGroups.getHELD_ITEMS_KEY()).register(entries -> {
            //z stones
            GravelsExtendedBattlesItems.Z_CRYSTALS.keySet().stream().map(Supplier::get).forEach(entries::accept);
            entries.addAfter(new ItemStack(CobblemonItems.FAIRY_GEM), GravelsExtendedBattlesItems.GEMS.stream().map(Supplier::get).map(ItemStack::new).toList());
            GravelsExtendedBattlesItems.PLATES.stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.MEMORIES.stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values().stream().map(Supplier::get).forEach(entries::accept);
        });
    }
}
