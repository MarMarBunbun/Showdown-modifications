package drai.dev.gravelsextendedbattles.fabric;

import com.cobblemon.mod.common.item.group.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.itemgroup.v1.*;

import java.util.function.*;


public class CreativeTabsInit {
    public static void initCreativeTabs(){
        ItemGroupEvents.modifyEntriesEvent(CobblemonItemGroups.getHELD_ITEMS_KEY()).register(entries -> {
            //z stones
            GravelsExtendedBattlesItems.Z_CRYSTALS.keySet().stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.GEMS.stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.PLATES.stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.MEMORIES.stream().map(Supplier::get).forEach(entries::accept);
            GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values().stream().map(Supplier::get).forEach(entries::accept);
        });
    }
}
