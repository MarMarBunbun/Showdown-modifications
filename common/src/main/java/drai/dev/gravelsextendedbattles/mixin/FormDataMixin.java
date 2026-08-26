package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.cobblemon.mod.common.pokemon.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(FormData.class)
public class FormDataMixin{
    @Final
    @Shadow private PreEvolution _preEvolution;
    @Inject(method = "getPreEvolution", at =@At("TAIL"), cancellable = true, remap = false)
    private void executeInject(CallbackInfoReturnable<PreEvolution> cir) {
        if(_preEvolution != null){
            if(_preEvolution.getSpecies() == null && _preEvolution.getForm() == null){
                cir.setReturnValue(null);
                cir.cancel();
            }
        }
    }
}
