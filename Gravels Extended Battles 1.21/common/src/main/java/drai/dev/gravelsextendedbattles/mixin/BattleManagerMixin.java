package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.battles.model.*;
import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.google.gson.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.lang.reflect.*;

@Mixin(PokemonBattle.class)
public class BattleManagerMixin {

    @Shadow private boolean mute;

    @Inject(method = "log", at =@At("HEAD"), remap = false)
    private void executeInject(String message, CallbackInfo ci) {
        this.mute = GravelsExtendedBattles.gravelmonConfig.unmuteBattleLogs(); // Disable the mute setting for battles
    }
}
