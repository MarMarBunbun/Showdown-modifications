package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokemon.status.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(Statuses.class)
public class StatusesMixin {

//    @Inject(method = "registerStatus", at = @At("TAIL"), remap = false)
//    private void injected(T status, CallbackInfoReturnable<T> cir) {
//        GravelsExtendedBattles.LOGGER.info("Gravels Extended Battles StatusesMixin initialized.");
//    }
}
