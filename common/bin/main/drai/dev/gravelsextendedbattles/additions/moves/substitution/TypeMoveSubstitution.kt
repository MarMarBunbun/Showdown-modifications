package drai.dev.gravelsextendedbattles.additions.moves.substitution

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.types.Type
import kotlin.text.equals

class TypeMoveSubstitution(originalMove: String, replacementMove: String, var type: Type) : MoveSubstitution(originalMove, replacementMove) {
    override fun shouldSubstitute(): Boolean {
        return GravelsExtendedBattles.CONFIG.implementedTypes.any { it.equals(this.type.name, ignoreCase = true) }
    }

    companion object {
        const val ADAPTER_VARIANT: String = "type"
    }
}