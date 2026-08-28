package drai.dev.gravelsextendedbattles.data

import com.cobblemon.mod.common.Cobblemon.LOGGER
import com.cobblemon.mod.common.api.data.DataRegistry
import com.cobblemon.mod.common.api.data.JsonDataRegistry
import com.cobblemon.mod.common.util.server
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolutions
import drai.dev.gravelsextendedbattles.additions.types.TypeChanges
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.resources.ResourceManager
import net.minecraft.server.packs.resources.ResourceManagerReloadListener

object GEBDataProvider {
    private val registries = linkedSetOf<DataRegistry>()
    private val reloadableRegistries = linkedSetOf<DataRegistry>()

    fun registerDefaults() {
        this.register(TypeChanges, true)
        this.register(AdditionalEvolutions, true)
    }

    fun <T : DataRegistry> register(registry: T, reloadable: Boolean): T {
        // Only send message once
        if (this.registries.isEmpty()) {
            LOGGER.info("Note: Cobblemon data registries are only loaded once per server instance as Pokémon species are not safe to reload.")
        }
        this.registries.add(registry)
        if (reloadable) {
            this.reloadableRegistries.add(registry)
        }
        LOGGER.info("Registered the {} registry", registry.id.toString())
        LOGGER.debug("Registered the {} registry of class {}", registry.id.toString(), registry::class.qualifiedName)
        return registry
    }

    class SimpleResourceReloader(private val type: PackType) : ResourceManagerReloadListener {
        override fun onResourceManagerReload(manager: ResourceManager) {
            // Check for a server running, this is due to the create a world screen triggering datapack reloads, these are fine to happen as many times as needed as players may be in the process of adding their datapacks.
            val reloadAllowed = server()?.isReady != true
            registries.filter { it.type == this.type && (reloadAllowed || it in reloadableRegistries) }
                .forEach { it.reload(manager) }
        }
    }
}