package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.client.gui.*;
import com.mojang.blaze3d.vertex.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import kotlin.jvm.internal.*;
import net.minecraft.client.gui.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import static com.cobblemon.mod.common.api.gui.GuiUtilsKt.*;
import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.*;

public class GravelmonTypeIcons {

    private boolean init = false;

    public static void changeTypeIconResourced(GravelmonTypeIconMixin gravelmonTypeIconMixin, GuiGraphics context, CallbackInfo ci) {
        if(!ICON_MIXIN_INIT){
            gravelmonTypeIconMixin.setSmallTypesResource(ResourceLocation.fromNamespaceAndPath("gravelmon","textures/gui/types_small.png"));
            gravelmonTypeIconMixin.setTypesResource(ResourceLocation.fromNamespaceAndPath("gravelmon","textures/gui/types.png"));
            ICON_MIXIN_INIT=true;
        }
        Intrinsics.checkNotNullParameter(context, "context");
        int diameter = gravelmonTypeIconMixin.getSmall() ? 18 : 36;
        float offsetX = gravelmonTypeIconMixin.getCenteredX() ? (float)(diameter / 2) * 0.5F + (gravelmonTypeIconMixin.getSecondaryType() != null ? gravelmonTypeIconMixin.getDoubleCenteredOffset() : 0.0F) : 0.0F;
        PoseStack matrixStack;
        if (gravelmonTypeIconMixin.getSecondaryType() != null) {
            matrixStack = context.pose();
            Intrinsics.checkNotNullExpressionValue(matrixStack, "context.matrices");
            ResourceLocation texture = gravelmonTypeIconMixin.getSmall() ? gravelmonTypeIconMixin.getSmallTypesResource() : gravelmonTypeIconMixin.getTypesResource();
            float xIcon = (gravelmonTypeIconMixin.getSelf().getX().floatValue() + gravelmonTypeIconMixin.getSecondaryOffset() - offsetX) / 0.5F;
            float yIcon = gravelmonTypeIconMixin.getSelf().getY().floatValue() / 0.5F;
            int width = diameter;
            int height = diameter;
            float IconDiameter = (float)diameter;
            ElementalType var10007 = gravelmonTypeIconMixin.getSecondaryType();
            Intrinsics.checkNotNull(var10007);
            blitk(matrixStack,
                    texture,
                    xIcon,
                    yIcon,
                    width,
                    height,
                    (double)(IconDiameter * (float)var10007.getTextureXMultiplier()) + 0.1,
                    0,
                    (float)diameter * TYPE_COUNT,
                    (float) diameter,
                    0, 1, 1, 1, 1F, false,
                    gravelmonTypeIconMixin.getSCALE());
        }

        matrixStack = context.pose();
        Intrinsics.checkNotNullExpressionValue(matrixStack, "context.matrices");
        blitk(matrixStack,
                gravelmonTypeIconMixin.getSmall() ? gravelmonTypeIconMixin.getSmallTypesResource() : gravelmonTypeIconMixin.getTypesResource(),
                (gravelmonTypeIconMixin.getSelf().getX().floatValue() - offsetX) / 0.5F,
                gravelmonTypeIconMixin.getSelf().getY().floatValue() / 0.5F, (Number)diameter, (Number)diameter,
                (double)((float)diameter * (float)gravelmonTypeIconMixin.getSelf().getType().getTextureXMultiplier()) + 0.1,
                0, (float)diameter * TYPE_COUNT, (Number)diameter, 0, 1, 1, 1,
                (Number)gravelmonTypeIconMixin.getOpacity(), false, gravelmonTypeIconMixin.getSCALE());
        ci.cancel();
    }
}
