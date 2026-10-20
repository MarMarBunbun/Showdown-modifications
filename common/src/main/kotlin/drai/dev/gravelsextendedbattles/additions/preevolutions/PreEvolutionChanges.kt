package drai.dev.gravelsextendedbattles.additions.preevolutions

import drai.dev.gravelsextendedbattles.additions.LenientJsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object PreEvolutionChanges : LenientJsonDataRegistry<PreEvolutionChange> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(PreEvolutionChange::class.java, PreEvolutionChangeAdapter)
        .create()

    override val typeToken: TypeToken<PreEvolutionChange> = TypeToken.get(PreEvolutionChange::class.java)
    override val resourcePath: String = "pre_evolution_changes"
    val preEvolutionChanges = mutableSetOf<PreEvolutionChange>()
    var preEvolutionChangesReady = false
    override fun reload(data: Map<ResourceLocation, PreEvolutionChange>) {
        preEvolutionChanges.clear()
        preEvolutionChanges.addAll(data.values)
        preEvolutionChangesReady = true
        applyPreEvolutionChanges()
    }

    override val id: ResourceLocation = gravelmonResource("pre_evolution_changes")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<PreEvolutionChanges>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyPreEvolutionChanges() {
        if (speciesFinished && preEvolutionChangesReady) {
            SpeciesManager.processPreEvolutionChanges(preEvolutionChanges)
            preEvolutionChangesReady = false
            speciesFinished = false
        }
    }
}
