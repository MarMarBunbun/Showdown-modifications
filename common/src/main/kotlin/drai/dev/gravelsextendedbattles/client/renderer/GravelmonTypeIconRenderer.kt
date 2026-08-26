package drai.dev.gravelsextendedbattles.client.renderer

import com.cobblemon.mod.common.api.gui.blitk
import drai.dev.gravelsextendedbattles.additions.types.GravelmonElementalTypes
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.interfaces.GravelmonTypeIconMixin
import net.minecraft.client.gui.GuiGraphics

object GravelmonTypeIconRenderer {
    private const val TYPE_ICON_DIAMETER = 36
    private const val SCALE = 0.5F

    private val typesResource = gravelmonResource("textures/gui/types.png")
    private val smallTypesResource = gravelmonResource("textures/gui/types_small.png")

    @JvmStatic
    fun render(context: GuiGraphics, typeIconMixin: GravelmonTypeIconMixin) {
        val diameter = if (typeIconMixin.small) (TYPE_ICON_DIAMETER / 2) else TYPE_ICON_DIAMETER
        val offsetX =
            if (typeIconMixin.centeredX) (((diameter / 2) * SCALE) + (if (typeIconMixin.secondaryType != null) (typeIconMixin.doubleCenteredOffset) else 0F)) else 0F;

        if (typeIconMixin.secondaryType != null) {
            blitk(
                matrixStack = context.pose(),
                texture = if (typeIconMixin.small) smallTypesResource else typesResource,
                x = (typeIconMixin.self.x.toFloat() + typeIconMixin.secondaryOffset - offsetX) / SCALE,
                y = typeIconMixin.self.y.toFloat() / SCALE,
                height = diameter,
                width = diameter,
                uOffset = diameter * typeIconMixin.secondaryType!!.textureXMultiplier.toFloat() + 0.1,
                textureWidth = diameter * GravelmonElementalTypes.TYPE_COUNT,
                alpha = typeIconMixin.opacity,
                scale = SCALE
            )
        }

        blitk(
            matrixStack = context.pose(),
            texture = if (typeIconMixin.small) smallTypesResource else typesResource,
            x = (typeIconMixin.self.x.toFloat() - offsetX) / SCALE,
            y = typeIconMixin.self.y.toFloat() / SCALE,
            height = diameter,
            width = diameter,
            uOffset = diameter * typeIconMixin.self.type.textureXMultiplier.toFloat() + 0.1,
            textureWidth = diameter * GravelmonElementalTypes.TYPE_COUNT,
            alpha = typeIconMixin.opacity,
            scale = SCALE
        )
    }

}