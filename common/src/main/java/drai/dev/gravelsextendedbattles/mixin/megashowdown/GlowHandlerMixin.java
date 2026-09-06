package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import net.minecraft.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import static drai.dev.gravelsextendedbattles.additions.types.GravelmonElementalTypes.typesToChatFormatting;


@Mixin(GlowHandler.class)
public class GlowHandlerMixin {

    @Inject(method = "getGlowForElemental", at = @At("HEAD"), cancellable = true)
    private static void injected(ElementalType type, CallbackInfoReturnable<ChatFormatting> cir) {
        if(typesToChatFormatting.containsKey(type)) {
            cir.setReturnValue(typesToChatFormatting.get(type));
            cir.cancel();
        }
    }
}
