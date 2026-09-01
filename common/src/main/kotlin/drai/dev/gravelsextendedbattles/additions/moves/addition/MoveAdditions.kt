package drai.dev.gravelsextendedbattles.additions.moves.addition

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

object MoveAdditions : JsonDataRegistry<MoveAddition> {
    var speciesFinished: Boolean = false
    override val gson = GsonBuilder()
        .setPrettyPrinting()
        .registerTypeAdapter(MoveAddition::class.java, MoveAdditionAdapter)
        .create()

    override val typeToken: TypeToken<MoveAddition> = TypeToken.get(MoveAddition::class.java)
    override val resourcePath: String = "move_additions"
    val moveAdditions = mutableSetOf<MoveAddition>()
    var moveAdditionsReady = false
    override fun reload(data: Map<ResourceLocation, MoveAddition>) {
        moveAdditions.clear()
        moveAdditions.addAll(data.values)
        moveAdditionsReady = true
        applyMoveAdditions()

    }

    override val id: ResourceLocation = gravelmonResource("move_additions")
    override val type: PackType = PackType.SERVER_DATA
    override val observable = SimpleObservable<MoveAdditions>()

    override fun sync(player: ServerPlayer) {
        //do nothing
    }

    fun applyMoveAdditions() {
        if(speciesFinished && moveAdditionsReady) {
            MoveManager.processMoveAdditions(moveAdditions)
            moveAdditionsReady = false
            speciesFinished = false
        }
    }
}