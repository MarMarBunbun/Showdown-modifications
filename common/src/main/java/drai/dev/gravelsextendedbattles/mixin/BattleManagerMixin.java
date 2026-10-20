package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.battles.model.*;
import com.cobblemon.mod.common.battles.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(PokemonBattle.class)
public class BattleManagerMixin {
    @Shadow private boolean mute;

    @Inject(method = "log", at =@At("HEAD"), remap = false)
    private void executeInject(String message, CallbackInfo ci) {
        this.mute = !GravelsExtendedBattles.CONFIG.unmuteBattleLogs(); // Disable the mute setting for battles
    }

    // If a battle is already closed (e.g. a BATTLE_VICTORY listener threw after end()), its Showdown stream is gone and
    // stop()'s ">forcetie" crashes the server. end() has already run too, so skip stop() entirely.
    @Inject(method = "stop", at = @At("HEAD"), cancellable = true, remap = false)
    private void skipStopIfClosed(CallbackInfo ci) {
        PokemonBattle battle = (PokemonBattle) (Object) this;
        if (BattleRegistry.getBattle(battle.getBattleId()) == null) {
            GravelsExtendedBattles.LOGGER.warn("Skipped stopping battle {} because it was already closed", battle.getBattleId());
            ci.cancel();
        }
    }
}
