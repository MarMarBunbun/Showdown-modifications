package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.pokemon.requirement.Requirement
import com.cobblemon.mod.common.pokemon.Pokemon

class FriendshipBelowRequirement : Requirement {
    var amount: Int = 0
    override fun check(pokemon: Pokemon): Boolean {
        return pokemon.friendship <= this.amount
    }

    companion object {
        var ADAPTER_VARIANT: String = "friendship_below"
    }
}
