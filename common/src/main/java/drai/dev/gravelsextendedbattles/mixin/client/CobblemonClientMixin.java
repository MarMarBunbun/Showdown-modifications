package drai.dev.gravelsextendedbattles.mixin.client;

import com.cobblemon.mod.common.client.*;
import com.cobblemon.mod.common.client.tooltips.*;
import drai.dev.gravelsextendedbattles.tooltips.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(CobblemonClient.class)
public class CobblemonClientMixin {
    @Inject(method = "registerTooltipManagers", at = @At("TAIL"))
    private static void touch(CallbackInfo ci) {
        TooltipManager.INSTANCE.registerTooltipGenerator(GravelmonTooltipGenerator.INSTANCE);
    }
}
