package drai.dev.gravelsextendedbattles.additions.drops

import com.cobblemon.mod.common.api.drop.DropTable
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.JsonParseException
import java.lang.reflect.Type

/** The drops are read by the species files' own reader, so they mean exactly what they mean in a species file. */
object DropChangeAdapter : JsonDeserializer<DropChange> {
    override fun deserialize(json: JsonElement, typeOfT: Type, context: JsonDeserializationContext): DropChange {
        val obj = json.asJsonObject
        val recipient = pokemonPropertiesShortAdapter.deserialize(obj.get("recipient") ?: throw JsonParseException("A drop change has no recipient"), typeOfT, context)
        val drops = PokemonSpecies.gson.fromJson(obj.get("drops") ?: throw JsonParseException("A drop change has no drops"), DropTable::class.java)
        return DropChange(recipient, drops)
    }
}
