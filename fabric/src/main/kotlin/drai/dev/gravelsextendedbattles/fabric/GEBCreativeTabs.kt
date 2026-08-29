package drai.dev.gravelsextendedbattles.fabric

import com.cobblemon.mod.common.CobblemonItems
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.ARCHAEOLOGY_KEY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.CONSUMABLES_KEY
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS
import com.cobblemon.mod.common.item.group.CobblemonItemGroups.HELD_ITEMS_KEY
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.fabricmc.fabric.api.itemgroup.v1.ItemGroupEvents
import net.minecraft.world.item.CreativeModeTab
import net.minecraft.world.item.ItemStack

object GEBCreativeTabs {
    fun initCreativeTabs() {
        ItemGroupEvents.modifyEntriesEvent(HELD_ITEMS_KEY).register { event ->
                //only when mega showdown is added
//            GEBItems.zCrystals.stream().forEach(event::accept)
//            GEBItems.plates.stream().forEach(event::accept)
//            GEBItems.memories.stream().forEach(event::accept)
//            GEBItems.teraShards.stream().forEach(event::accept)

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
        }

        ItemGroupEvents.modifyEntriesEvent(CONSUMABLES_KEY).register { event ->
                event.addAfter(
                    ItemStack(CobblemonItems.BURN_HEAL),
                    ItemStack(GEBItems.FROST_HEAL)
                )
        }
    }
}