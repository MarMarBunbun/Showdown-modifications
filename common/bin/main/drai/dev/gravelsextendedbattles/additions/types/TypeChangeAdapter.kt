package drai.dev.gravelsextendedbattles.additions.types

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

object TypeChangeAdapter : JsonDeserializer<TypeChange> {

    val gson: Gson by lazy {
        GsonBuilder()
            .registerTypeAdapter(PokemonProperties::class.java, pokemonPropertiesShortAdapter)
            .registerTypeAdapter(Type::class.java, TypeAdapter)
            .setPrettyPrinting()
            .create()
    }

    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): TypeChange? {
        return gson.fromJson(json, TypeChange::class.java)
    }
}