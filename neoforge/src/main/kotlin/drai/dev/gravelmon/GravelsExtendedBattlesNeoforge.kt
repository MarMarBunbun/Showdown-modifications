package drai.dev.gravelmon

import com.cobblemon.mod.common.Cobblemon
import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.minecraft.server.packs.PackLocationInfo
import net.minecraft.server.packs.PackSelectionConfig
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.PathPackResources
import net.minecraft.server.packs.repository.BuiltInPackSource
import net.minecraft.server.packs.repository.KnownPack
import net.minecraft.server.packs.repository.Pack
import net.minecraft.server.packs.repository.Pack.Position
import net.minecraft.server.packs.repository.PackSource
import net.minecraft.util.RandomSource
import net.minecraft.world.entity.Entity
import net.minecraft.world.entity.npc.VillagerProfession
import net.minecraft.world.entity.npc.VillagerTrades
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.Items
import net.minecraft.world.item.trading.ItemCost
import net.minecraft.world.item.trading.MerchantOffer
import net.neoforged.fml.ModList
import net.neoforged.fml.common.Mod
import net.neoforged.neoforge.common.NeoForge
import net.neoforged.neoforge.event.AddPackFindersEvent
import net.neoforged.neoforge.event.village.VillagerTradesEvent
import net.neoforged.neoforge.registries.RegisterEvent
import thedarkcolour.kotlinforforge.neoforge.forge.MOD_BUS
import java.util.*

@Mod(Cobblemon.MODID)
object GravelsExtendedBattlesNeoforge {
    init {
        with(MOD_BUS) {
            GravelsExtendedBattles.initialize()
            addListener(::onAddPackFindersEvent)
        }
        with(NeoForge.EVENT_BUS) {
            addListener(::onVillagerTrade)
        }
    }

    fun onAddPackFindersEvent(event: AddPackFindersEvent) {
        val modFile = ModList.get().getModContainerById(GravelsExtendedBattles.MODID).get().modInfo
        GravelsExtendedBattles.builtinPacks
            .filter { it.packType == event.packType }
            .forEach {
                val subPath = if (it.packType == PackType.CLIENT_RESOURCES) "resourcepacks" else "datapacks"
                val packLocation = gravelmonResource("$subPath/${it.id}")
                val resourcePath = modFile.owningFile.file.findResource(packLocation.path)

                val version = modFile.version

                val pack = Pack.readMetaAndCreate(PackLocationInfo("mod/$packLocation", it.displayName, PackSource.BUILT_IN, Optional.of(KnownPack("neoforge", "mod/$packLocation", version.toString()))),
                    BuiltInPackSource.fromName { PathPackResources(it, resourcePath) },
                    it.packType,
                    PackSelectionConfig(it.activationBehaviour == ResourcePackActivationBehaviour.ALWAYS_ENABLED, Position.TOP, false)
                )

                if (pack == null) {
                    GravelsExtendedBattles.LOGGER.error("Failed to register built-in pack ${it.id}. If you are in dev you can ignore this")
                    return@forEach
                }

                event.addRepositorySource { it.accept(pack) }
            }
    }

    fun registerItems() {
        with(MOD_BUS) {
            addListener<RegisterEvent> { event ->
                event.register(GEBItems.resourceKey) { helper ->
                    GEBItems.register { identifier, item -> helper.register(identifier, item) }
                }
            }
            addListener<RegisterEvent> { event ->
                event.register(GEBBlocks.resourceKey) { helper ->
                    GEBBlocks.register { identifier, item -> helper.register(identifier, item) }
                }
            }
//            addListener<RegisterEvent> { event ->
//                event.register(Registries.CREATIVE_MODE_TAB) { helper ->
//                    CobblemonItemGroups.register { holder ->
//                        val itemGroup = CreativeModeTab.builder()
//                            .title(holder.displayName)
//                            .icon(holder.displayIconProvider)
//                            .displayItems(holder.entryCollector)
//                            .build()
//                        helper.register(holder.key, itemGroup)
//                        itemGroup
//                    }
//                }
//            }
        }
    }

    fun registerVillagerTrades() {
        //do it through the event
    }

    fun onVillagerTrade(event: VillagerTradesEvent) {
        if (event.getType() === VillagerProfession.FARMER) {
            val level = 5 // Novice

            val trades = event.getTrades().get(level)

            trades.add(VillagerTrades.ItemListing { _: Entity?, _: RandomSource? ->
                MerchantOffer(
                    ItemCost(Items.EMERALD, 10),
                    Optional.of(ItemCost(Items.GLASS_BOTTLE)),
                    ItemStack(GEBItems.FROST_HEAL, 1),
                    12, 30, .75f
                )
            }
            )
        }
    }
}