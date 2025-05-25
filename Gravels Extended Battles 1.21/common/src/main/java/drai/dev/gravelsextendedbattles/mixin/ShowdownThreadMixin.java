package drai.dev.gravelsextendedbattles.mixin;

import drai.dev.gravelsextendedbattles.showdown.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(targets = "com.cobblemon.mod.common.battles.ShowdownThread", priority=1100)
public class ShowdownThreadMixin {
    @Inject(method = "run", at = @At("HEAD"), remap = false)
    private void injected(CallbackInfo ci) {
        ShowdownFileManager.injectShowdown();
    }
}
