package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.github.yajatkaul.mega_showdown.creative.*;
import com.github.yajatkaul.mega_showdown.item.custom.form_change.*;
import com.github.yajatkaul.mega_showdown.item.custom.z.*;
import dev.architectury.registry.registries.*;
import drai.dev.gravelsextendedbattles.items.megashowdown.*;
import net.minecraft.*;
import net.minecraft.network.chat.*;
import net.minecraft.world.item.*;

import java.util.*;
import java.util.function.*;

import static drai.dev.gravelsextendedbattles.registries.GravelsExtendedBattlesItems.*;

public class MegaShowdownCompatItems {

    public static RegistrySupplier<Item> registerTeraShardItem(String name, Supplier<TeraType> teraType) {
        return registerItem(name, ()->new GravelmonTeraShard(new Item.Properties().stacksTo(50), teraType));
    }

    public static RegistrySupplier<Item> registerArceusPlateItem(String name, String type){
        return registerFormChangeHeldItems(
                name,
                "multitype=normal",
                "multitype="+type,
                List.of("Arceus"),
                "gravels_extended_battles:arceus_"+type,
                true
        );
    }

    public static RegistrySupplier<Item> registerMemoryItem(String name, String type){
        return registerFormChangeHeldItems(
                name,
                "rks_memory=normal",
                "rks_memory="+type,
                List.of("Silvally"),
                "gravels_extended_battles:silvally_"+type+"_memory",
                true
        );
    }

    public static RegistrySupplier<Item> registerZCrystalItem(String name,  Supplier<ElementalType> type) {
        return ITEMS.register(name, () -> new GravelmonElementalZCrystal(new Item.Properties().arch$tab(MegaShowdownTabs.Z_TAB),
                null,
                null,
                List.of("Arceus"),
                "",
                true,
                type
        ));
    }

    private static RegistrySupplier<Item> registerFormChangeHeldItems(String name, String revertAspect, String applyAspect, List<String> pokemons, String effectId, boolean tradable) {
        return ITEMS.register(name,
                () -> new FormChangeHeldItem(
                        new Item.Properties().arch$tab(MegaShowdownTabs.FORM_TAB),
                        revertAspect,
                        applyAspect,
                        pokemons,
                        effectId,
                        tradable,
                        null,
                        null
                ));
    }
}
