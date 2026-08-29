package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import drai.dev.gravelsextendedbattles.additions.types.*;
import drai.dev.gravelsextendedbattles.additions.types.tera.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(TeraTypes.class)
public class TeraTypesMixin {
    @Inject(method = "<clinit>", at = @At("TAIL"))
    private static void touch(CallbackInfo ci) {
        GravelmonTeraTypes.touch();
    }
}
