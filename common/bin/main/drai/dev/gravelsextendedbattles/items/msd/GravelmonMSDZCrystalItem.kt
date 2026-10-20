package drai.dev.gravelsextendedbattles.items.msd

import com.cobblemon.mod.common.api.types.ElementalType
import com.github.yajatkaul.mega_showdown.item.custom.z.ElementalZCrystal
import net.minecraft.network.chat.Component
import net.minecraft.world.item.ItemStack
import net.minecraft.world.item.TooltipFlag


class GravelmonMSDZCrystalItem(properties: Properties, pokemons: MutableList<String>, tradable: Boolean, element: ElementalType
) : ElementalZCrystal(properties, pokemons, tradable, element) {
    override fun appendHoverText(
        itemStack: ItemStack,
        tooltipContext: TooltipContext,
        tooltipComponents: MutableList<Component>,
        tooltipFlag: TooltipFlag
    ) {
        //do nothing
    }
}