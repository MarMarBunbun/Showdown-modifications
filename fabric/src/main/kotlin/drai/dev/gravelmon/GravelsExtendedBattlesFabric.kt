package drai.dev.gravelmon

import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.data.GEBDataProvider
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.fabricmc.api.ModInitializer
import net.fabricmc.fabric.api.resource.IdentifiableResourceReloadListener
import net.fabricmc.fabric.api.resource.ResourceManagerHelper
import net.fabricmc.fabric.api.resource.ResourcePackActivationType
import net.fabricmc.fabric.impl.resource.loader.ResourceManagerHelperImpl
import net.fabricmc.loader.api.FabricLoader
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.resources.PreparableReloadListener
import net.minecraft.server.packs.resources.ResourceManager
import net.minecraft.util.profiling.ProfilerFiller
import java.util.concurrent.CompletableFuture
import java.util.concurrent.Executor

object GravelsExtendedBattlesFabric: ModInitializer {
    @JvmField
    val GEBReloadListenerInstance = GEBReloadListener(gravelmonResource("data_resources"),
        GEBDataProvider.SimpleResourceReloader(PackType.SERVER_DATA),emptyList())
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

    class GEBReloadListener(private val identifier: ResourceLocation, private val reloader: PreparableReloadListener, private val dependencies: Collection<ResourceLocation>):
        IdentifiableResourceReloadListener {
        override fun reload(synchronizer: PreparableReloadListener.PreparationBarrier, manager: ResourceManager, prepareProfiler: ProfilerFiller, applyProfiler: ProfilerFiller, prepareExecutor: Executor, applyExecutor: Executor): CompletableFuture<Void> = this.reloader.reload(synchronizer, manager, prepareProfiler, applyProfiler, prepareExecutor, applyExecutor)

        override fun getFabricId(): ResourceLocation = this.identifier

        override fun getName(): String = this.reloader.name

        override fun getFabricDependencies(): MutableCollection<ResourceLocation> = this.dependencies.toMutableList()
    }
}