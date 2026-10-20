package drai.dev.gravelsextendedbattles.additions.abilities

import drai.dev.gravelsextendedbattles.additions.LenientJsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object AbilityChanges : LenientJsonDataRegistry<AbilityChange> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(AbilityChange::class.java, AbilityChangeAdapter)
        .create()

    override val typeToken: TypeToken<AbilityChange> = TypeToken.get(AbilityChange::class.java)
    override val resourcePath: String = "ability_changes"
    val abilityChanges = mutableSetOf<AbilityChange>()
    var abilityChangesReady = false
    override fun reload(data: Map<ResourceLocation, AbilityChange>) {
        abilityChanges.clear()
        abilityChanges.addAll(data.values)
        abilityChangesReady = true
        applyAbilityChanges()
    }

    override val id: ResourceLocation = gravelmonResource("ability_changes")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<AbilityChanges>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyAbilityChanges() {
        if (speciesFinished && abilityChangesReady) {
            SpeciesManager.processAbilityChanges(abilityChanges)
            abilityChangesReady = false
            speciesFinished = false
        }
    }
}
