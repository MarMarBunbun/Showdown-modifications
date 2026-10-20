package drai.dev.gravelsextendedbattles.additions.drops

import com.cobblemon.mod.common.api.drop.DropTable
import com.cobblemon.mod.common.api.pokemon.PokemonProperties

/** Replaces the drops of [recipient] with [drops], written as a species file writes them (`{ "amount": 1, "entries": [...] }`). */
data class DropChange(val recipient: PokemonProperties, val drops: DropTable)
