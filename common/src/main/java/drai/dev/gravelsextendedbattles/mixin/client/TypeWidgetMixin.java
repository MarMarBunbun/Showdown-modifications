package drai.dev.gravelsextendedbattles.mixin.client;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.client.gui.summary.widgets.type.*;
import com.mojang.blaze3d.vertex.*;
import drai.dev.gravelsextendedbattles.client.renderer.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(TypeWidget.class)
public abstract class TypeWidgetMixin {

    @Inject(method = "renderType(Lcom/cobblemon/mod/common/api/types/ElementalType;Lcom/mojang/blaze3d/vertex/PoseStack;II)V", at = @At("HEAD"), cancellable = true)
    private void changeTypeIconResource(ElementalType type, PoseStack pPoseStack, int pX, int pY, CallbackInfo ci){
        GravelmonTypeWidgetRenderer.renderWidgetType((TypeWidget)(Object)this, type, pPoseStack, pX, pY);
        ci.cancel();
    }


}
