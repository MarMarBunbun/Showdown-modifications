package drai.dev.gravelsextendedbattles.items.msd

import com.cobblemon.mod.common.api.types.ElementalType
import com.cobblemon.mod.common.pokemon.Pokemon
import com.github.yajatkaul.mega_showdown.item.custom.form_change.FormChangeHeldItem
import net.minecraft.network.chat.Component
import net.minecraft.world.item.Item
import net.minecraft.world.item.Item.Properties
import net.minecraft.world.item.Item.TooltipContext
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.TooltipFlag
import java.util.function.Consumer

class GravelmonMSDFormChangeHeldItem(
    properties: Item.Properties, revertAspect: String, applyAspect: String, pokemons: MutableList<String>,
    effectId: String, tradable: Boolean, onApplyCallback: Consumer<Pokemon>?, onRevertCallback: Consumer<Pokemon>?
) : FormChangeHeldItem(properties, revertAspect, applyAspect, pokemons, effectId, tradable, onApplyCallback,
    onRevertCallback
) {
    override fun appendHoverText(
        itemStack: ItemStack,
        tooltipContext: TooltipContext,
        tooltipComponents: MutableList<Component>,
        tooltipFlag: TooltipFlag
    ) {
        //do nothing
    }
}