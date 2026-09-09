package drai.dev.gravelsextendedbattles.additions.moves.substitution

import com.cobblemon.mod.common.api.moves.MoveTemplate
import com.cobblemon.mod.common.api.moves.Moves

abstract class MoveSubstitution(val originalMove: String, val replacementMove: String) {
    abstract fun shouldSubstitute(): Boolean
    
    val oldMoveTemplate: MoveTemplate?
        get() { return Moves.getByName(originalMove) }

    val newMoveTemplate: MoveTemplate?
        get() { return Moves.getByName(replacementMove) }
}