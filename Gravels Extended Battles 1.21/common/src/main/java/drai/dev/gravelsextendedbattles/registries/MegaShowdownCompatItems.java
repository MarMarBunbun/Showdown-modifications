package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.yajatkaul.mega_showdown.*;
import com.cobblemon.yajatkaul.mega_showdown.item.custom.*;
import com.cobblemon.yajatkaul.mega_showdown.item.custom.tera.*;
import dev.architectury.registry.registries.*;
import drai.dev.gravelsextendedbattles.items.*;
import drai.dev.gravelsextendedbattles.items.megashowdown.*;
import net.minecraft.*;
import net.minecraft.network.chat.*;
import net.minecraft.world.item.*;

import java.util.*;

import static drai.dev.gravelsextendedbattles.registries.GravelsExtendedBattlesItems.*;

public class MegaShowdownCompatItems {

    public static RegistrySupplier<Item> registerTeraShardItem(String name, TeraType teraType) {
        RegistrySupplier<Item> register = registerItem(name, ()->new TeraShard(new Item.Properties().stacksTo(50),teraType));
        TERA_SHARDS_BY_TYPE_NAME.put(name.replaceAll("_tera_shard", ""), register);
        return register;
    }

    public static RegistrySupplier<Item> registerArceusPlateItem(String name, String type){
        return ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new MegaShowdownPlate(new Item.Properties().stacksTo(1), type) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
    }

    public static boolean isArceusPlateItem(Item item){
        return item instanceof MegaShowdownPlate;
    }
}
