package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.pokemon.abilities.*;
import com.google.gson.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(CommonAbilityType.class)
public class CommonAbilityTypeMixin {
    @Inject(
            method = "parseFromJSON(Lcom/google/gson/JsonElement;)Lcom/cobblemon/mod/common/api/abilities/CommonAbility;",
            at = @At("HEAD"),
            cancellable = true
    )
    private void initialize(JsonElement element, CallbackInfoReturnable<CommonAbility> cir){
        if (!element.isJsonPrimitive()) {
            cir.setReturnValue(null);
            cir.cancel();
        }

        String str = element.getAsString();
        var ability = Abilities.get(str);
        if(ability == null){
            ability = Abilities.get("keeneye");
        }

        cir.setReturnValue(new CommonAbility(ability));
        cir.cancel();
    }
}
