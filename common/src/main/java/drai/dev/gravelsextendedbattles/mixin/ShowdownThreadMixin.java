package drai.dev.gravelsextendedbattles.mixin;

import drai.dev.gravelsextendedbattles.showdown.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(targets = "com.cobblemon.mod.common.battles.runner.graal.GraalShowdownUnbundler", priority=1100)
public class ShowdownThreadMixin {
    @Unique
    private static boolean gravels_extended_battles$loaded;

    @Inject(method = "attemptUnbundle", at = @At("TAIL"), remap = false)
    private void injected(CallbackInfo ci) {
        if(!gravels_extended_battles$loaded) {
            ShowdownFileManager.injectShowdown();
            gravels_extended_battles$loaded = true;
        }
    }
}
