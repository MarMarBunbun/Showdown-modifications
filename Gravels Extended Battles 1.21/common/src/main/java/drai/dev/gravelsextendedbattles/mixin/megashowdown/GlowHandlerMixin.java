package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import drai.dev.gravelsextendedbattles.registries.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.world.item.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import static drai.dev.gravelsextendedbattles.types.GravelmonTeraTypes.TERA_TYPES_TO_CHAT_FORMATTING;
import static drai.dev.gravelsextendedbattles.types.GravelmonTeraTypes.TYPES_TO_CHAT_FORMATTING;

@Mixin(GlowHandler.class)
public class GlowHandlerMixin {

    @Inject(method = "getGlowForElemental", at = @At("HEAD"), cancellable = true)
    private static void injected(ElementalType type, CallbackInfoReturnable<ChatFormatting> cir) {
        if(TYPES_TO_CHAT_FORMATTING.containsKey(type)) {
            cir.setReturnValue(TYPES_TO_CHAT_FORMATTING.get(type));
            cir.cancel();
        }
    }
}
