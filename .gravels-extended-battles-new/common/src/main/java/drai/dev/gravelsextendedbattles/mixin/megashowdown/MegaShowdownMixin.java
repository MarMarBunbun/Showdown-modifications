package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.github.yajatkaul.mega_showdown.*;
import dev.architectury.platform.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(MegaShowdown.class)
public class MegaShowdownMixin {
    @Inject(
            method = "init",
            at = @At(value = "TAIL") , remap = false
    )
    private static void afterGetPokemon(CallbackInfo ci) {
        if(Platform.isModLoaded("mega_showdown")) GravelsExtendedBattles.init();
    }
}
