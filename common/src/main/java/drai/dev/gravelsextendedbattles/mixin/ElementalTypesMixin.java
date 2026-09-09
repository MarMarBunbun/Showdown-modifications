package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.additions.types.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(ElementalTypes.class)
public class ElementalTypesMixin {

    @Inject(method = "<clinit>", at = @At("TAIL"))
    private static void touch(CallbackInfo ci) {
        GravelmonElementalTypes.touch();
    }
    @Inject(method = "all", at = @At("HEAD"), cancellable = true)
    private static void all(CallbackInfoReturnable<List<ElementalType>> cir) {
        cir.setReturnValue(GravelmonElementalTypes.getImplementedTypes());
        cir.cancel();
    }
}
