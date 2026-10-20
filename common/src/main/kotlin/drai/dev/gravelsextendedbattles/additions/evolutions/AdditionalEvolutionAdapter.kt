package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import java.lang.reflect.Type

/**
 * The evolutions are read by the species files' own reader, so their requirements, items and blocks mean exactly what they mean in a
 * species file (a reader of its own would lack the adapters for `Requirement` and the rest). An evolution that cannot be read is
 * left out with a warning instead of failing the file.
 */
object AdditionalEvolutionAdapter : JsonDeserializer<AdditionalEvolution> {
    override fun deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): AdditionalEvolution {
        val obj = json.asJsonObject
        val recipientJson = obj.get("recipient") ?: throw JsonParseException("An additional evolution has no recipient")
        val recipient = pokemonPropertiesShortAdapter.deserialize(recipientJson, typeOfT, context)
        val entries = (obj.get("evolutions") ?: obj.get("evolution"))?.takeIf { it.isJsonArray }?.asJsonArray
            ?: throw JsonParseException("The additional evolutions of $recipientJson have no evolutions")
        val evolutions = entries.mapNotNull { entry ->
            try {
                PokemonSpecies.gson.fromJson(entry, Evolution::class.java)
            } catch (exception: Exception) {
                GravelsExtendedBattles.LOGGER.warn("Skipping an additional evolution of $recipientJson that cannot be read: $entry", exception)
                null
            }
        }
        return AdditionalEvolution(recipient, evolutions)
    }
}
