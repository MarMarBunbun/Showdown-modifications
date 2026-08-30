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

            event.addAfter(
                ItemStack(CobblemonItems.TYPE_GEM_CLUSTER_FAIRY),
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
                ).map { ItemStack(it) }
            )

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
}