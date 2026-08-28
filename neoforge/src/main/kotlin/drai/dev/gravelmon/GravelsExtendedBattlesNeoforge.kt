package drai.dev.gravelmon

import com.cobblemon.mod.common.Cobblemon
import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.server.packs.PackLocationInfo
import net.minecraft.server.packs.PackSelectionConfig
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.PathPackResources
import net.minecraft.server.packs.repository.BuiltInPackSource
import net.minecraft.server.packs.repository.KnownPack
import net.minecraft.server.packs.repository.Pack
import net.minecraft.server.packs.repository.Pack.Position
import net.minecraft.server.packs.repository.PackSource
import net.neoforged.fml.ModList
import net.neoforged.fml.common.Mod
import net.neoforged.neoforge.common.NeoForge
import net.neoforged.neoforge.event.AddPackFindersEvent
import net.neoforged.neoforge.event.OnDatapackSyncEvent
import java.util.Optional
import thedarkcolour.kotlinforforge.neoforge.forge.MOD_BUS

@Mod(Cobblemon.MODID)
object GravelsExtendedBattlesNeoforge {
    init {
        with(MOD_BUS) {
            GravelsExtendedBattles.initialize()
            addListener(::onAddPackFindersEvent)
        }
        with(NeoForge.EVENT_BUS) {
            addListener(::onDataPackSync)
        }
    }
    // This event gets fired before init, so we need to put resource packs in EARLY
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

    fun onDataPackSync(event: OnDatapackSyncEvent) {
        //todo add
    }
}