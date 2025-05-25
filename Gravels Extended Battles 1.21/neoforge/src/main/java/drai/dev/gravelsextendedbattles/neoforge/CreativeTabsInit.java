package drai.dev.gravelsextendedbattles.neoforge;

import com.cobblemon.mod.common.item.group.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.neoforged.bus.api.*;
import net.neoforged.fml.common.*;
import net.neoforged.neoforge.event.*;

import java.util.function.*;

@EventBusSubscriber(modid = GravelsExtendedBattles.MOD_ID, bus = EventBusSubscriber.Bus.MOD)
public class CreativeTabsInit {

    @SubscribeEvent
    public static void buildContents(BuildCreativeModeTabContentsEvent event) {
        if(event.getTab() == CobblemonItemGroups.getHELD_ITEMS()) {
            //z stones
            GravelsExtendedBattlesItems.Z_CRYSTALS.keySet().stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.GEMS.stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.PLATES.stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.MEMORIES.stream().map(Supplier::get).forEach(event::accept);
            GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values().stream().map(Supplier::get).forEach(event::accept);
        }
    }
}
