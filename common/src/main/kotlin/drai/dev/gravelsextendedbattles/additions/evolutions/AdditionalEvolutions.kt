package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.data.JsonDataRegistry
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.additions.types.TypeChanges
import drai.dev.gravelsextendedbattles.additions.types.TypeChanges.typeChangesReady
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object AdditionalEvolutions : JsonDataRegistry<AdditionalEvolution> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(AdditionalEvolution::class.java, AdditionalEvolutionAdapter)
        .create()

    override val typeToken: TypeToken<AdditionalEvolution> = TypeToken.get(AdditionalEvolution::class.java)
    override val resourcePath: String = "additional_evolutions"
    val additionalEvolutions = mutableSetOf<AdditionalEvolution>()
    var additionalEvolutionsReady = false
    override fun reload(data: Map<ResourceLocation, AdditionalEvolution>) {
        additionalEvolutions.clear()
        additionalEvolutions.addAll(data.values)
        additionalEvolutionsReady = true
        applyAdditionalEvolutions()

    }

    override val id: ResourceLocation = gravelmonResource("additional_evolutions")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<AdditionalEvolutions>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyAdditionalEvolutions() {
        if(speciesFinished && additionalEvolutionsReady) {
            SpeciesManager.processFormEvolutionAdditions(additionalEvolutions)
            additionalEvolutionsReady = false
            speciesFinished = false
        }
    }
}