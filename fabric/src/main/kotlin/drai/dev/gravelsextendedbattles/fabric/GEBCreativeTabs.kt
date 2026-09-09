package drai.dev.gravelsextendedbattles.fabric

import com.cobblemon.mod.common.CobblemonItems
import com.cobblemon.mod.common.block.TypeGemClusterBlock
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.ARCHAEOLOGY_KEY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES_KEY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS_KEY
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.fabricmc.fabric.api.itemgroup.v1.FabricItemGroupEntries
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents
import net.minecraft.core.component.DataComponents
import net.minecraft.world.item.CreativeModeTab
import net.minecraft.world.item.CreativeModeTab.Output
import net.minecraft.world.item.Item
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.component.BlockItemStateProperties
import net.minecraft.world.item.component.CustomModelData

object GEBCreativeTabs {
    fun initCreativeTabs() {
        ItemGroupEvents.modifyEntriesEvent(HELD_ITEMS_KEY).register { event ->
                //only when mega showdown is added
//            if(GravelsExtendedBattles.megaShowdownIsLoaded()) {
//                GEBItems.zCrystals.stream().forEach(event::accept)
//                GEBItems.plates.stream().forEach(event::accept)
//                GEBItems.memories.stream().forEach(event::accept)
//                GEBItems.teraShards.stream().forEach(event::accept)
//            }

                    event.addAfter(
                        ItemStack(CobblemonItems.FAIRY_GEM),
                        GEBItems.gems.map { ItemStack(it) }
                    )
                    event.addAfter(
                        ItemStack(CobblemonItems.PSYCHIC_SEED),
                        GEBItems.heldItems.map { ItemStack(it) }
                    )

            }
        ItemGroupEvents.modifyEntriesEvent(ARCHAEOLOGY_KEY).register { event ->
            event.addAfter(
                ItemStack(CobblemonItems.FAIRY_GEM),
                GEBItems.gems.map { ItemStack(it) }
            )
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

            event.addAfter(
                ItemStack(CobblemonItems.TYPE_GEM_CLUSTER_FAIRY),
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
                ).map { ItemStack(it) }
            )
        }

        ItemGroupEvents.modifyEntriesEvent(CONSUMABLES_KEY).register { event ->
                event.addAfter(
                    ItemStack(CobblemonItems.BURN_HEAL),
                    ItemStack(GEBItems.FROST_HEAL)
                )
        }
    }

    private fun gemClusterEntries(entries: FabricItemGroupEntries, clusterItem: Item) {
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
            entries.addAfter(ItemStack(CobblemonItems.TYPE_GEM_CLUSTER_FAIRY),stack)
        }
    }
}