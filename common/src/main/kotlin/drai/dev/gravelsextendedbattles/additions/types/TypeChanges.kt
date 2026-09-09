package drai.dev.gravelsextendedbattles.additions.types

import com.cobblemon.mod.common.api.data.JsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolution
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolutionAdapter
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolutions.additionalEvolutions
import drai.dev.gravelsextendedbattles.additions.evolutions.AdditionalEvolutions.additionalEvolutionsReady
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object TypeChanges : JsonDataRegistry<TypeChange> {
    var speciesFinished: Boolean = false
    override val gson: Gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(AdditionalEvolution::class.java, AdditionalEvolutionAdapter)
        .create()

    override val typeToken: TypeToken<TypeChange> = TypeToken.get(TypeChange::class.java)
    override val resourcePath: String = "type_changes"
    val typeChanges = mutableSetOf<TypeChange>()
    var typeChangesReady = false
    override fun reload(data: Map<ResourceLocation, TypeChange>) {
        typeChanges.clear()
        typeChanges.addAll(data.values)
        typeChangesReady = true
        applyTypeChanges()
    }

    override val id: ResourceLocation = gravelmonResource("type_changes")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<TypeChanges>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyTypeChanges() {
        if(speciesFinished && typeChangesReady) {
            SpeciesManager.processTypeChanges(typeChanges)
            typeChangesReady = false
            speciesFinished = false
        }
    }
}