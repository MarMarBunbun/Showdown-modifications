package drai.dev.gravelsextendedbattles.neoforge

import com.cobblemon.mod.common.Cobblemon
import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionCodePayload
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionSync
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionSyncClient
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
import net.minecraft.core.registries.Registries
import net.minecraft.util.RandomSource
import net.minecraft.world.entity.Entity
import net.minecraft.world.entity.npc.VillagerProfession
import net.minecraft.world.entity.npc.VillagerTrades
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.Items
import net.minecraft.world.item.trading.ItemCost
import net.minecraft.world.item.trading.MerchantOffer
import net.neoforged.bus.api.SubscribeEvent
import net.neoforged.fml.ModList
import net.neoforged.fml.common.Mod
import net.neoforged.neoforge.common.NeoForge
import net.neoforged.neoforge.event.AddPackFindersEvent
import net.neoforged.neoforge.event.village.VillagerTradesEvent
import net.neoforged.neoforge.registries.RegisterEvent
import java.util.*
import kotlin.text.get

@Mod(GravelsExtendedBattles.MOD_ID)
object GravelsExtendedBattlesImpl {
    private val modBus = ModList.get()
        .getModContainerById(GravelsExtendedBattles.MOD_ID)
        .orElseThrow()
        .eventBus ?: error("Gravels Extended Battles does not have a NeoForge mod event bus")

    init {
        with(modBus) {
            GravelsExtendedBattles.initialize()
            addListener(::onAddPackFindersEvent)
            addListener(::onRegisterPayloads)
        }
        with(NeoForge.EVENT_BUS) {
            addListener(::onVillagerTrade)
            addListener(::onLootTableLoad)
            addListener(::onPlayerLoggedIn)
        }
    }

    fun onAddPackFindersEvent(event: AddPackFindersEvent) {
        // The pack downloaded for the player's selection (assets on a client, data on both).
        drai.dev.gravelsextendedbattles.ondemand.OnDemandStartup.packSource(event.packType).let { event.addRepositorySource(it) }
        val modFile = ModList.get().getModContainerById(GravelsExtendedBattles.MOD_ID).get().modInfo
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

    @JvmStatic
    fun registerItems() {
        with(modBus) {
            addListener<RegisterEvent> { event ->
                event.register(Registries.BLOCK) { helper ->
                    GEBBlocks.register { identifier, item -> helper.register(identifier, item) }
                }
            }
            addListener<RegisterEvent> { event ->
                event.register(Registries.ITEM) { helper ->
                    GEBItems.register { identifier, item -> helper.register(identifier, item) }
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

    @JvmStatic
    fun modIsLoaded(modId: String) : Boolean {
        return ModList.get().isLoaded(modId)
    }

    @JvmStatic
    fun gameDirectory(): java.nio.file.Path = net.neoforged.fml.loading.FMLPaths.GAMEDIR.get()

    @JvmStatic
    fun modVersion(modId: String): String? =
        ModList.get().getModContainerById(modId).map { it.modInfo.version.toString() }.orElse(null)

    @JvmStatic
    fun isDedicatedServer(): Boolean = net.neoforged.fml.loading.FMLEnvironment.dist == net.neoforged.api.distmarker.Dist.DEDICATED_SERVER

    @JvmStatic
    fun registerVillagerTrades() {
        //do it through the event
    }

    /** The join-time warning (plan, section 8): the payload is optional, so a client without it can still join. */
    fun onRegisterPayloads(event: net.neoforged.neoforge.network.event.RegisterPayloadHandlersEvent) {
        event.registrar("1").optional().playToClient(SelectionCodePayload.TYPE, SelectionCodePayload.CODEC) { payload, context ->
            context.enqueueWork { SelectionSyncClient.onServerCode(payload.code) }
        }
    }

    /** Each player who joins is sent the code this side runs with. */
    fun onPlayerLoggedIn(event: net.neoforged.neoforge.event.entity.player.PlayerEvent.PlayerLoggedInEvent) {
        val player = event.entity as? net.minecraft.server.level.ServerPlayer ?: return
        val code = SelectionSync.codeToSend(GravelsExtendedBattles.CONFIG.selectionCode) ?: return
        net.neoforged.neoforge.network.PacketDistributor.sendToPlayer(player, SelectionCodePayload(code))
    }

    /** The dig-site loot of the downloaded pack (and the fossils GEB itself adds) joins the loot tables as they load. */
    fun onLootTableLoad(event: net.neoforged.neoforge.event.LootTableLoadEvent) {
        drai.dev.gravelsextendedbattles.fossils.GEBLootPoolManager.processFossilAdditions(event.name) { pool -> pool?.let { event.table.addPool(it) } }
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