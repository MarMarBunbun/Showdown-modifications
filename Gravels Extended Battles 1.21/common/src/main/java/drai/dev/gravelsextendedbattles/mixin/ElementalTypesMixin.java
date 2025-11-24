package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.network.chat.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(ElementalTypes.class)
public abstract class ElementalTypesMixin {
    @Shadow
    public static ElementalType register(ElementalType elementalType) {
        return null;
    }

    @Inject(method = "register(Ljava/lang/String;Lnet/minecraft/network/chat/MutableComponent;II)Lcom/cobblemon/mod/common/api/types/ElementalType;", at = @At("HEAD"), locals = LocalCapture.CAPTURE_FAILHARD, cancellable = true)
    private static void injected(String name, MutableComponent displayName, int hue, int textureXMultiplier, CallbackInfoReturnable<ElementalType> cir) {
        GravelmonTypes.initializeTypes(ElementalTypesMixin::register);
    }
}
