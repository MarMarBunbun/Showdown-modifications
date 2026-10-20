package drai.dev.gravelsextendedbattles.additions.drops

import drai.dev.gravelsextendedbattles.additions.LenientJsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object DropChanges : LenientJsonDataRegistry<DropChange> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(DropChange::class.java, DropChangeAdapter)
        .create()

    override val typeToken: TypeToken<DropChange> = TypeToken.get(DropChange::class.java)
    override val resourcePath: String = "drop_changes"
    val dropChanges = mutableSetOf<DropChange>()
    var dropChangesReady = false
    override fun reload(data: Map<ResourceLocation, DropChange>) {
        dropChanges.clear()
        dropChanges.addAll(data.values)
        dropChangesReady = true
        applyDropChanges()
    }

    override val id: ResourceLocation = gravelmonResource("drop_changes")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<DropChanges>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyDropChanges() {
        if (speciesFinished && dropChangesReady) {
            SpeciesManager.processDropChanges(dropChanges)
            dropChangesReady = false
            speciesFinished = false
        }
    }
}
