package drai.dev.gravelsextendedbattles.additions.preevolutions

import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.evolution.PreEvolution
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import java.lang.reflect.Type

/** The pre-evolution is read by the species files' own reader, so it means exactly what it means in a species file. */
object PreEvolutionChangeAdapter : JsonDeserializer<PreEvolutionChange> {
    override fun deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): PreEvolutionChange {
        val obj = json.asJsonObject
        val recipient = pokemonPropertiesShortAdapter.deserialize(obj.get("recipient") ?: throw JsonParseException("A pre-evolution change has no recipient"), typeOfT, context)
        val preEvolution = PokemonSpecies.gson.fromJson(obj.get("preEvolution") ?: throw JsonParseException("A pre-evolution change has no preEvolution"), PreEvolution::class.java)
        return PreEvolutionChange(recipient, preEvolution)
    }
}
