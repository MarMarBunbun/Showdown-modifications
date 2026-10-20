package drai.dev.gravelsextendedbattles.additions.evolutions

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.evolution.Evolution
import com.cobblemon.mod.common.pokemon.evolution.adapters.CobblemonEvolutionAdapter
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

object AdditionalEvolutionAdapter : JsonDeserializer<AdditionalEvolution > {

    val gson: Gson by lazy {
        GsonBuilder()
            .registerTypeAdapter(PokemonProperties::class.java, pokemonPropertiesShortAdapter)
            .registerTypeAdapter(Evolution::class.java, CobblemonEvolutionAdapter)
            .setPrettyPrinting()
            .create()
    }

    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): AdditionalEvolution? {
        return gson.fromJson(json, AdditionalEvolution::class.java)
    }
}