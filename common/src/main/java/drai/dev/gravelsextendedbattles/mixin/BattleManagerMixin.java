package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.battles.model.*;
import drai.dev.gravelsextendedbattles.config.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(PokemonBattle.class)
public class BattleManagerMixin {
    @Shadow private boolean mute;

    @Inject(method = "log", at =@At("HEAD"), remap = false)
    private void executeInject(String message, CallbackInfo ci) {
        this.mute = !GEBConfig.INSTANCE.getBattleDebugging(); // Disable the mute setting for battles
    }
}
