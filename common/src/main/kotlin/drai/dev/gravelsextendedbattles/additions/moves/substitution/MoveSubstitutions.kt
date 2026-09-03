package drai.dev.gravelsextendedbattles.additions.moves.substitution

import com.cobblemon.mod.common.api.data.JsonDataRegistry
import com.cobblemon.mod.common.api.reactive.SimpleObservable
import com.google.gson.GsonBuilder
import com.google.gson.reflect.TypeToken
import drai.dev.gravelsextendedbattles.additions.SpeciesManager
import drai.dev.gravelsextendedbattles.additions.moves.MoveManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.level.ServerPlayer
import net.minecraft.server.packs.PackType

object MoveSubstitutions : JsonDataRegistry<MoveSubstitution> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(MoveSubstitution::class.java, MoveSubstitutionAdapter)
        .create()

    override val typeToken: TypeToken<MoveSubstitution> = TypeToken.get(MoveSubstitution::class.java)
    override val resourcePath: String = "move_substitutions"
    val moveSubstitutions = mutableSetOf<MoveSubstitution>()
    var moveSubstitutionsReady = false
    override fun reload(data: Map<ResourceLocation, MoveSubstitution>) {
        moveSubstitutions.clear()
        moveSubstitutions.addAll(data.values)
        moveSubstitutionsReady = true
        applyMoveSubstitutions()

    }

    override val id: ResourceLocation = gravelmonResource("move_substitutions")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<MoveSubstitutions>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyMoveSubstitutions() {
        if(speciesFinished && moveSubstitutionsReady) {
            MoveManager.processFormEvolutionAdditions(moveSubstitutions)
            moveSubstitutionsReady = false
            speciesFinished = false
        }
    }
}