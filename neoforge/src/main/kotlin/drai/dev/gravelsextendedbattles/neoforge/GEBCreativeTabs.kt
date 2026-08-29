package drai.dev.gravelsextendedbattles.neoforge

import com.cobblemon.mod.common.CobblemonItems
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.ARCHAEOLOGY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.minecraft.world.item.CreativeModeTab
import net.minecraft.world.item.ItemStack
import net.neoforged.bus.api.SubscribeEvent
import net.neoforged.fml.common.EventBusSubscriber
import net.neoforged.neoforge.event.BuildCreativeModeTabContentsEvent

@EventBusSubscriber(modid = GravelsExtendedBattles.MOD_ID)
object GEBCreativeTabs {
    @SubscribeEvent
    fun buildContents(event: BuildCreativeModeTabContentsEvent) {
        if (event.tab === HELD_ITEMS) {
            //only when mega showdown is added
            //GEBItems.zCrystals.stream().forEach(event::accept)
//            GEBItems.plates.stream().forEach(event::accept)
//            GEBItems.memories.stream().forEach(event::accept)
//            GEBItems.teraShards.stream().forEach(event::accept)

            GEBItems.gems.stream().forEach { item ->
                event.insertAfter(ItemStack(CobblemonItems.FAIRY_GEM),ItemStack(item),CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS)
            }
            GEBItems.heldItems.stream().forEach { item ->
                event.insertAfter(ItemStack(CobblemonItems.PSYCHIC_SEED),ItemStack(item),CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS)
            }
        }
        if (event.tab === ARCHAEOLOGY) {
            GEBItems.gems.stream().forEach { item ->
                event.insertAfter(ItemStack(CobblemonItems.FAIRY_GEM),ItemStack(item),CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS)
            }
        }

        if (event.tab === CONSUMABLES) {
            event.insertAfter(
                ItemStack(CobblemonItems.BURN_HEAL),
                ItemStack(GEBItems.FROST_HEAL),
                CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS
            )
        }
    }
}