package drai.dev.gravelsextendedbattles.client.renderer

import com.cobblemon.mod.common.api.gui.blitk
import com.cobblemon.mod.common.api.types.ElementalType
import com.cobblemon.mod.common.client.gui.summary.widgets.type.TypeWidget
import com.mojang.blaze3d.vertex.PoseStack
import drai.dev.gravelsextendedbattles.additions.types.GravelmonElementalTypes
import drai.dev.gravelsextendedbattles.gravelmonResource

object GravelmonTypeWidgetRenderer {
    private const val OFFSET = 0.5
    val typeResource = gravelmonResource("textures/gui/types.png")
    @JvmStatic
    fun renderWidgetType(
        typeWidget: TypeWidget,
        type: ElementalType,
        pPoseStack: PoseStack,
        pX: Double,
        pY: Int
    ) {
        blitk(
            matrixStack = pPoseStack,
            texture = typeResource,
            x = pX + OFFSET, y = pY,
            width = typeWidget.width, height = typeWidget.height,
            uOffset = typeWidget.width * type.textureXMultiplier.toFloat() + 0.1,
            textureWidth = typeWidget.width * GravelmonElementalTypes.TYPE_COUNT
        )
    }

}