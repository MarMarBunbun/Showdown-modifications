package drai.dev.gravelsextendedbattles.additions.abilities

import com.cobblemon.mod.common.api.abilities.AbilityPool
import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.util.adapters.AbilityPoolAdapter
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

object AbilityChangeAdapter : JsonDeserializer<AbilityChange> {

    val gson: Gson by lazy {
        GsonBuilder()
            .registerTypeAdapter(PokemonProperties::class.java, pokemonPropertiesShortAdapter)
            .registerTypeAdapter(AbilityPool::class.java, AbilityPoolAdapter)
            .setPrettyPrinting()
            .create()
    }

    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): AbilityChange? {
        return gson.fromJson(json, AbilityChange::class.java)
    }
}
