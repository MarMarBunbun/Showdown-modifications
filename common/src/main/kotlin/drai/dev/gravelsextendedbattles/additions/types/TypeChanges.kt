package drai.dev.gravelsextendedbattles.additions.types

import com.cobblemon.mod.common.api.data.JsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolution
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolutionAdapter
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object TypeChanges : JsonDataRegistry<TypeChange> {
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(AdditionalEvolution::class.java, AdditionalEvolutionAdapter)
        .create()

    override val typeToken: TypeToken<TypeChange> = TypeToken.get(TypeChange::class.java)
    override val resourcePath: String = "additional_evolutions"

    override fun reload(data: Map<ResourceLocation, TypeChange>) {
        SpeciesManager.processTypeChanges(data.values)
    }

    override val id: ResourceLocation = gravelmonResource("additional_evolutions")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<TypeChanges>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }
}