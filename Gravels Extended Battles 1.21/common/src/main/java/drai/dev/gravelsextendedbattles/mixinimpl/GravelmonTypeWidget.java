package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.client.gui.summary.widgets.type.*;
import com.mojang.blaze3d.vertex.*;
import drai.dev.gravelsextendedbattles.*;
import kotlin.jvm.internal.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import static com.cobblemon.mod.common.api.gui.GuiUtilsKt.*;

public class GravelmonTypeWidget {
    public static void changeTypeWidget(TypeWidget typeWidget, ResourceLocation typeResource, ElementalType type, PoseStack pMatrixStack, double pX, int pY, CallbackInfo ci) {
        typeResource = ResourceLocation.fromNamespaceAndPath("gravelmon","textures/gui/types.png");
        Intrinsics.checkNotNullParameter(type, "type");
        Intrinsics.checkNotNullParameter(pMatrixStack, "pMatrixStack");
        ResourceLocation texture = typeResource;
        double iconX = pX + 0.5;
        int width = typeWidget.getWidth();
        int height = typeWidget.getHeight();
        double offset = (double)((float)typeWidget.getWidth() * (float) type.getTextureXMultiplier()) + 0.1;
        int textureWidth = typeWidget.getWidth() * GravelsExtendedBattles.TYPE_COUNT;
        blitk(pMatrixStack,
                texture,
                iconX,
                pY,
                height,
                width,
                offset,
                0,
                textureWidth,
                typeWidget.getWidth(),
                0, 1, 1, 1, 1F, false,
                1);
        ci.cancel();
    }
}
