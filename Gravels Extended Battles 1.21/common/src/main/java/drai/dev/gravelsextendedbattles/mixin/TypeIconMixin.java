package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.client.gui.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import drai.dev.gravelsextendedbattles.mixinimpl.*;
import net.minecraft.client.gui.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(TypeIcon.class)
public abstract class TypeIconMixin implements GravelmonTypeIconMixin {
    @Shadow @Final private float doubleCenteredOffset;
    @Shadow @Final private boolean small;
    @Shadow @Final private ElementalType secondaryType;
    @Shadow @Final private boolean centeredX;
    @Shadow @Final private static int TYPE_ICON_DIAMETER;

    @Shadow @Final private static float SCALE;

    @Mutable
    @Shadow @Final private static ResourceLocation smallTypesResource;

    @Mutable
    @Shadow @Final private static ResourceLocation typesResource;
    @Shadow @Final private float secondaryOffset;
    @Shadow @Final private float opacity;
    @Inject(method = "render", at = @At("HEAD"), locals = LocalCapture.CAPTURE_FAILHARD, cancellable = true)
    private void changeTypeIconResource(GuiGraphics context, CallbackInfo ci){
        GravelmonTypeIcons.changeTypeIconResourced(this,context, ci);
    }

    public boolean getSmall(){
        return small;
    }

    public boolean getCenteredX(){
        return centeredX;
    }

    public ElementalType getSecondaryType(){
        return secondaryType;
    }

    public float getDoubleCenteredOffset(){
        return doubleCenteredOffset;
    }

    public float getSecondaryOffset(){
        return secondaryOffset;
    }

    public ResourceLocation getSmallTypesResource(){
        return smallTypesResource;
    }

    public ResourceLocation getTypesResource(){
        return typesResource;
    }

    public float getSCALE(){
        return SCALE;
    }

    public float getOpacity(){
        return opacity;
    }

    public void setSmallTypesResource(ResourceLocation gravelmon){
        smallTypesResource = gravelmon;
    }

    public void setTypesResource(ResourceLocation gravelmon){
        typesResource = gravelmon;
    }

    public TypeIcon getSelf(){
        return (TypeIcon) (Object) this;
    }
}
