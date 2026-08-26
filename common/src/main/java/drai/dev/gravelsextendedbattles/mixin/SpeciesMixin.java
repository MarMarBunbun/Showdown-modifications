package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.cobblemon.mod.common.pokemon.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(Species.class)
public class SpeciesMixin{
    @Shadow private PreEvolution preEvolution;
    @Inject(method = "getPreEvolution", at =@At("TAIL"), cancellable = true, remap = false)
    private void executeInject(CallbackInfoReturnable<PreEvolution> cir) {
        if(preEvolution != null){
            if(preEvolution.getSpecies() == null && preEvolution.getForm() == null){
                cir.setReturnValue(null);
                cir.cancel();
            }
        }
    }
}
