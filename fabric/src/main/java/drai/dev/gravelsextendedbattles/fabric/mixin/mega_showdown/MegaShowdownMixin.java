package drai.dev.gravelsextendedbattles.fabric.mixin.mega_showdown;

import com.github.yajatkaul.mega_showdown.*;
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
        if(GravelsExtendedBattles.megaShowdownIsLoaded()) GravelsExtendedBattles.initialize();
    }
}
