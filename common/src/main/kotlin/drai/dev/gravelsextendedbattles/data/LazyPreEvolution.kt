package drai.dev.gravelsextendedbattles.data

import com.cobblemon.mod.common.Cobblemon
import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonProperties.Companion.parse
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies.getByIdentifier
import com.cobblemon.mod.common.api.pokemon.evolution.PreEvolution
import com.cobblemon.mod.common.pokemon.FormData
import com.cobblemon.mod.common.pokemon.Species
import com.google.gson.JsonDeserializationContext
import net.minecraft.resources.ResourceLocation
import java.util.*


class GravelmonLazyPreEvolution(private val rawData: String) : PreEvolution {
    private var properties: PokemonProperties? = null
        get() {
            if (field == null) {
                field = parse(rawData)
            }
            return field
        }
    
    override val species: Species
        get() = _nullableSpecies!!
    override val form: FormData
        get() = nullableForm!!

    val nullableForm: FormData? by lazy {
        val formId = this.properties!!.form
        var resultForm: FormData? = null

        if (formId != null) {
            resultForm = this.species.forms.stream()
                .filter { form: FormData? -> form!!.formOnlyShowdownId().equals(formId, ignoreCase = true) }
                .findFirst()
                .orElse(null)
        }

        if (resultForm == null) {
            resultForm = this.species.standardForm
        }

        resultForm
    }


    private val _nullableSpecies: Species? by lazy {
        if (this.properties!!.species != null) {
            val ResourceLocation = asResourceLocationDefaultingNamespace(
                this.properties!!.species!!
            )
            getByIdentifier(ResourceLocation)
        } else {
            null
        }
    }

    companion object {
        @JvmOverloads
        fun asResourceLocationDefaultingNamespace(input: String, namespace: String = Cobblemon.MODID): ResourceLocation {
            val id = input.lowercase(Locale.getDefault())
            if (id.contains(":")) {
                return ResourceLocation.fromNamespaceAndPath(
                    id.substring(0, id.indexOf(":")),
                    id.substring(id.indexOf(":") + 1)
                )
            } else {
                return ResourceLocation.fromNamespaceAndPath(namespace, id)
            }
        }
    }
}