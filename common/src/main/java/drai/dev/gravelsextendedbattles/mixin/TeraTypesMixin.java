package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.api.types.tera.elemental.*;
import drai.dev.gravelsextendedbattles.additions.types.*;
import drai.dev.gravelsextendedbattles.additions.types.tera.*;
import drai.dev.gravelsextendedbattles.config.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(TeraTypes.class)
public class TeraTypesMixin {
    @Inject(method = "<clinit>", at = @At("TAIL"))
    private static void touch(CallbackInfo ci) {
        GravelmonTeraTypes.touch();
    }

    @Inject(method = "random", at = @At("HEAD"), cancellable = true)
    private static void gravelsextendedbattles$skipDisabledTypes(boolean legalOnly, CallbackInfoReturnable<TeraType> cir) {
        List<String> implemented = GEBConfig.getImplementedTypes();
        List<TeraType> possible = new ArrayList<>();
        for (TeraType teraType : TeraTypes.INSTANCE) {
            if (legalOnly && !teraType.getLegalAsStatic()) continue;
            if (teraType instanceof ElementalTypeTeraType && !implemented.contains(teraType.getName().toLowerCase())) continue;
            possible.add(teraType);
        }
        if (possible.isEmpty()) return;
        cir.setReturnValue(possible.get(new Random().nextInt(possible.size())));
    }
}
