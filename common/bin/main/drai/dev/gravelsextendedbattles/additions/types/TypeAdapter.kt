package drai.dev.gravelsextendedbattles.additions.types

import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement

object TypeAdapter : JsonDeserializer<Type> {
    override fun deserialize(
        json: JsonElement,
        typeOfT: java.lang.reflect.Type,
        context: JsonDeserializationContext
    ): Type? {
        return Type.getByName(json.asString.uppercase())
    }
}