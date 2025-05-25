package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.yajatkaul.mega_showdown.item.custom.*;
import dev.architectury.registry.registries.*;
import net.minecraft.world.item.*;

import static drai.dev.gravelsextendedbattles.registries.GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME;
import static drai.dev.gravelsextendedbattles.registries.GravelsExtendedBattlesItems.registerItem;

public class MegaShowdownCompatItems {

    public static RegistrySupplier<Item> registerTeraShardItem(String name){
        RegistrySupplier<Item> register = registerItem(name, new TeraShard(new Item.Properties().stacksTo(50)));
        TERA_SHARDS_BY_TYPE_NAME.put(name.replaceAll("_tera_shard", ""), register);
        return register;
    }
}
