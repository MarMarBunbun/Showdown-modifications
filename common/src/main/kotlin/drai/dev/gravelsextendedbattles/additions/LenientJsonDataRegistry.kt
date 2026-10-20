package drai.dev.gravelsextendedbattles.additions

import com.cobblemon.mod.common.api.data.JsonDataRegistry
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.packs.resources.ResourceManager
import java.io.File

/**
 * A [JsonDataRegistry] that leaves out a file it cannot read, with an error in the log, instead of failing the whole reload: one bad
 * change from a data pack should not keep a world from loading.
 */
interface LenientJsonDataRegistry<T> : JsonDataRegistry<T> {
    override fun reload(manager: ResourceManager) {
        val data = hashMapOf<ResourceLocation, T>()
        manager.listResources(resourcePath) { location -> location.path.endsWith(JsonDataRegistry.JSON_EXTENSION) }.forEach { (identifier, resource) ->
            val resolvedIdentifier = ResourceLocation.fromNamespaceAndPath(identifier.namespace, File(identifier.path).nameWithoutExtension)
            try {
                resource.open().use { stream ->
                    stream.bufferedReader().use { reader -> parse(reader, resolvedIdentifier)?.let { data[resolvedIdentifier] = it } }
                }
            } catch (exception: Exception) {
                GravelsExtendedBattles.LOGGER.error("Skipping $identifier ($resourcePath), which cannot be read", exception)
            }
        }
        reload(data)
    }
}
