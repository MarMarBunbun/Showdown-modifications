package drai.dev.gravelsextendedbattles.neoforge;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.api.types.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.mixin.loot.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.world.entity.npc.*;
import net.minecraft.world.item.*;
import net.minecraft.world.item.trading.*;
import net.minecraft.world.level.storage.loot.*;
import net.neoforged.fml.common.*;
import net.neoforged.fml.loading.*;
import net.neoforged.neoforge.common.*;
import net.neoforged.neoforge.event.*;
import net.neoforged.neoforge.event.village.*;
import net.neoforged.neoforge.registries.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;
import java.util.function.*;

@Mod(GravelsExtendedBattles.MOD_ID)
public class GravelsExtendedBattlesNeoForge {
    public GravelsExtendedBattlesNeoForge() {
        GravelsExtendedBattles.init();
        NeoForge.EVENT_BUS.addListener(this::onLootTableLoad);
        NeoForge.EVENT_BUS.addListener(this::onVillagerTrade);
    }

    private void onLootTableLoad(LootTableLoadEvent event) {
        var pools = ((LootTableAccessor)event.getTable()).getPools();
        GravelmonFossilManager.addLootPools(pools.toArray(new LootPool[0]));
        GravelmonFossilManager.processFossilAdditions(event.getTable().getLootTableId(), lootPool->event.getTable().addPool(lootPool));
    }


    public static void registerVillagerTrades(){
        //do it through the event
    }

    public void onVillagerTrade(VillagerTradesEvent event) {
        if (event.getType() == VillagerProfession.FARMER) {
            int level = 5; // Novice

            List<VillagerTrades.ItemListing> trades = event.getTrades().get(level);

            trades.add((entity, random) -> new MerchantOffer(new ItemCost(Items.EMERALD, 10),
                    Optional.of(new ItemCost(Items.GLASS_BOTTLE)),
                    new ItemStack(CobblemonItems.ANTIDOTE, 1),
                    12, 30,.75f)
            );
        }
    }

    public static void registerBrewingRecipes(){
//        BrewingRecipeRegistryBuilderMixin.BUILD.registerItemRecipe(Potions.AWKWARD, Items.FEATHER, FROST_HEAL);
    }

    public static Item getTeraShardForType(Iterable<ElementalType> types, DeferredItem<Item> defaultItem) {
        for (var type : types) {
            var teraShard = GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.get(type.getName().toLowerCase());
            if (teraShard != null) {
                return teraShard.get();
            }
        }
        return defaultItem.get();
    }
}
