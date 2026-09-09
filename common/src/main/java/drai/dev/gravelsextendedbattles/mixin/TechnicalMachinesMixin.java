package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.habitats.*;
import com.cobblemon.mod.common.api.tms.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(TechnicalMachines.class)
public abstract class TechnicalMachinesMixin {
    @Inject(method = "reload(Ljava/util/Map;)V", at = @At("TAIL"))
    private static void touch(Map<ResourceLocation, HabitatPool> data, CallbackInfo ci) {
        TechnicalMachines.INSTANCE.getObservable().emit(TechnicalMachines.INSTANCE);
    }
}
