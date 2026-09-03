package drai.dev.gravelsextendedbattles.additions.status

import com.cobblemon.mod.common.api.pokemon.status.Status
import com.cobblemon.mod.common.api.pokemon.status.Statuses
import com.cobblemon.mod.common.pokemon.status.PersistentStatus
import com.cobblemon.mod.common.util.cobblemonResource

object GravelmonStatus {
    var FROSTBITE: Status = PersistentStatus(
        cobblemonResource("frostbite"), "fbt",
        "cobblemon.status.frostbite.apply", "cobblemon.status.frostbite.cure", IntRange(180, 300)
    )

    var BLIGHT: Status = PersistentStatus(
        cobblemonResource("blight"), "bgt",
        "cobblemon.status.blight.apply", "cobblemon.status.blight.cure", IntRange(180, 300)
    )

    fun registerStatus() {
        Statuses.registerStatus(FROSTBITE)
        Statuses.registerStatus(BLIGHT)
    }
}