package drai.dev.gravelsextendedbattles.fabric

import com.cobblemon.mod.common.CobblemonVillagerProfessions.NURSE
import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.data.GEBDataProvider
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.fabricmc.api.ModInitializer
import net.fabricmc.fabric.api.`object`.builder.v1.trade.TradeOfferHelper
import net.fabricmc.fabric.api.resource.IdentifiableResourceReloadListener
import net.fabricmc.fabric.api.resource.ResourcePackActivationType
import net.fabricmc.fabric.impl.resource.loader.ResourceManagerHelperImpl
import net.fabricmc.loader.api.FabricLoader
import net.minecraft.core.Registry
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.resources.PreparableReloadListener
import net.minecraft.server.packs.resources.ResourceManager
import net.minecraft.util.RandomSource
import net.minecraft.util.profiling.ProfilerFiller
import net.minecraft.world.entity.Entity
import net.minecraft.world.entity.npc.VillagerTrades
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.Items
import net.minecraft.world.item.trading.ItemCost
import net.minecraft.world.item.trading.MerchantOffer
import java.util.*
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executor
import java.util.function.Consumer

object GravelsExtendedBattlesImpl: ModInitializer {

    override fun onInitialize() {
        GravelsExtendedBattles.initialize()
        GravelsExtendedBattles.builtinPacks.forEach {
            val mod = FabricLoader.getInstance().getModContainer(GravelsExtendedBattles.MODID).get()
            val resourcePackActivationType = when (it.activationBehaviour) {
                ResourcePackActivationBehaviour.NORMAL -> ResourcePackActivationType.NORMAL
                ResourcePackActivationBehaviour.DEFAULT_ENABLED -> ResourcePackActivationType.DEFAULT_ENABLED
                ResourcePackActivationBehaviour.ALWAYS_ENABLED -> ResourcePackActivationType.ALWAYS_ENABLED
            }
            val id = gravelmonResource(it.id)
            val subPath = "${ if (it.packType == PackType.CLIENT_RESOURCES) "resourcepacks" else "datapacks" }/${id.path}"
            ResourceManagerHelperImpl.registerBuiltinResourcePack(id, subPath, mod, it.displayName, resourcePackActivationType)
        }
    }

    @JvmStatic
    fun registerItems() {
        GEBBlocks.register { identifier, item -> Registry.register(GEBBlocks.registry, identifier, item) }
        GEBItems.register { identifier, item -> Registry.register(GEBItems.registry, identifier, item) }
//        CobblemonItemGroups.register { provider ->
//            Registry.register(BuiltInRegistries.CREATIVE_MODE_TAB, provider.key, FabricItemGroup.builder()
//                .title(provider.displayName)
//                .icon(provider.displayIconProvider)
//                .displayItems(provider.entryCollector)
//                .build())
//        }
//
//        CobblemonItemGroups.injectorKeys().forEach { key ->
//            ItemGroupEvents.modifyEntriesEvent(key).register { content ->
//                val fabricInjector = FabricItemGroupInjector(content)
//                CobblemonItemGroups.inject(key, fabricInjector)
//            }
//        }
    }

    @JvmStatic
    fun registerVillagerTrades() {
        TradeOfferHelper.registerVillagerOffers(
            NURSE,
            5,
            Consumer { factories: MutableList<VillagerTrades.ItemListing?>? ->
                factories!!.add(VillagerTrades.ItemListing { entity: Entity?, random: RandomSource? ->
                    MerchantOffer(
                        ItemCost(Items.EMERALD, 10),
                        Optional.of<ItemCost?>(ItemCost(Items.GLASS_BOTTLE)),
                        ItemStack(GEBItems.FROST_HEAL, 1),
                        12, 30, .75f
                    )
                }
                )
            })
    }

    fun registerBrewingRecipes() {
//        PotionBrewing.Builder.BUILD.register {  }(Potions.AWKWARD, Items.FEATHER, FROST_HEAL);
    }

    object GEBReloadListener: IdentifiableResourceReloadListener {
        private val identifier = gravelmonResource("data_resources")
        private val reloader = GEBDataProvider.SimpleResourceReloader(PackType.SERVER_DATA)
        private val dependencies: Collection<ResourceLocation> = emptyList()
        override fun reload(synchronizer: PreparableReloadListener.PreparationBarrier, manager: ResourceManager, prepareProfiler: ProfilerFiller, applyProfiler: ProfilerFiller, prepareExecutor: Executor, applyExecutor: Executor): CompletableFuture<Void> = this.reloader.reload(synchronizer, manager, prepareProfiler, applyProfiler, prepareExecutor, applyExecutor)

        override fun getFabricId(): ResourceLocation = this.identifier

        override fun getName(): String = this.reloader.name

        override fun getFabricDependencies(): MutableCollection<ResourceLocation> = this.dependencies.toMutableList()
    }
}