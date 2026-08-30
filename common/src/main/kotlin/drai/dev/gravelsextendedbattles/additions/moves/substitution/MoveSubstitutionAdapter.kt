package drai.dev.gravelsextendedbattles.additions.moves.substitution

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.util.adapters.pokemonPropertiesShortAdapter
import com.google.common.collect.HashBiMap
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type
import kotlin.collections.set
import kotlin.reflect.KClass

object MoveSubstitutionAdapter : JsonDeserializer<MoveSubstitution> {
    private const val VARIANT = "variant"

    private val types = HashBiMap.create<String, KClass<out MoveSubstitution>>()
    init {
        this.registerType(TypeMoveSubstitution.ADAPTER_VARIANT, TypeMoveSubstitution::class)
    }

    val gson: Gson by lazy {
        GsonBuilder()
            .setPrettyPrinting()
            .create()
    }

    override fun deserialize(
        json: JsonElement,
        typeOfT: Type,
        context: JsonDeserializationContext
    ): MoveSubstitution? {
        val variant = json.asJsonObject.get(VARIANT).asString.lowercase()
        val type = getRequirementType(variant)
        return gson.fromJson(json, type.java)
    }

    fun <T : MoveSubstitution> registerType(id: String, type: KClass<T>) {
        this.types[id.lowercase()] = type
    }

    private fun getRequirementType(variant: String): KClass<out MoveSubstitution> {
        val requirementType = this.types[variant] ?: throw IllegalArgumentException("Cannot resolve evolution requirement type for variant $variant")
        return requirementType
    }
}