package drai.dev.gravelsextendedbattles.neoforge

import com.cobblemon.mod.common.CobblemonItems
import com.cobblemon.mod.common.block.TypeGemClusterBlock
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.ARCHAEOLOGY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.minecraft.core.component.DataComponents
import net.minecraft.world.item.CreativeModeTab
import net.minecraft.world.item.CreativeModeTab.Output
import net.minecraft.world.item.Item
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.component.BlockItemStateProperties
import net.minecraft.world.item.component.CustomModelData
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

            listOf(
                GEBItems.BLOOD_GEM_CLUSTER,
                GEBItems.COSMIC_GEM_CLUSTER,
                GEBItems.CRYSTAL_GEM_CLUSTER,
                GEBItems.DIGITAL_GEM_CLUSTER,
                GEBItems.ELDRITCH_GEM_CLUSTER,
                GEBItems.LIGHT_GEM_CLUSTER,
                GEBItems.MYSTERY_GEM_CLUSTER,
                GEBItems.NUCLEAR_GEM_CLUSTER,
                GEBItems.PLASTIC_GEM_CLUSTER,
                GEBItems.SHADOW_GEM_CLUSTER,
                GEBItems.SLIME_GEM_CLUSTER,
                GEBItems.SOUND_GEM_CLUSTER,
                GEBItems.WIND_GEM_CLUSTER
            ).forEach { cluster ->
                gemClusterEntries(event, cluster)
            }

            listOf(
                GEBItems.BLOOD_GEM_BLOCK,
                GEBItems.COSMIC_GEM_BLOCK,
                GEBItems.CRYSTAL_GEM_BLOCK,
                GEBItems.DIGITAL_GEM_BLOCK,
                GEBItems.ELDRITCH_GEM_BLOCK,
                GEBItems.LIGHT_GEM_BLOCK,
                GEBItems.MYSTERY_GEM_BLOCK,
                GEBItems.NUCLEAR_GEM_BLOCK,
                GEBItems.PLASTIC_GEM_BLOCK,
                GEBItems.SHADOW_GEM_BLOCK,
                GEBItems.SLIME_GEM_BLOCK,
                GEBItems.SOUND_GEM_BLOCK,
                GEBItems.WIND_GEM_BLOCK
            ).forEach { block ->
                event.insertAfter(ItemStack(CobblemonItems.TYPE_GEM_CLUSTER_FAIRY),ItemStack(block),CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS)
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

    private fun gemClusterEntries(event: BuildCreativeModeTabContentsEvent, clusterItem: Item) {
        for (i in TypeGemClusterBlock.STAGE.possibleValues) {
            val stack = ItemStack(clusterItem)
            stack.set(
                DataComponents.BLOCK_STATE,
                BlockItemStateProperties.EMPTY
                    .with(TypeGemClusterBlock.STAGE, i)
                    .with(TypeGemClusterBlock.SHOULD_GROW, false)
                    .with(TypeGemClusterBlock.STUNTED, false)
            )
            stack.set(
                DataComponents.CUSTOM_MODEL_DATA,
                CustomModelData(i)
            )
            event.insertAfter(ItemStack(CobblemonItems.TYPE_GEM_CLUSTER_FAIRY), stack, CreativeModeTab.TabVisibility.PARENT_AND_SEARCH_TABS)
        }
    }
}