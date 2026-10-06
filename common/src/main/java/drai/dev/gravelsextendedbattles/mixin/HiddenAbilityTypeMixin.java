package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.pokemon.abilities.*;
import com.google.gson.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import static drai.dev.gravelsextendedbattles.mixinimpl.AbilityPoolInjections.redirectHiddenAbilityParseFromJSON;

@Mixin(HiddenAbilityType.class)
public class HiddenAbilityTypeMixin {
    @Inject(
            method = "parseFromJSON(Lcom/google/gson/JsonElement;)Lcom/cobblemon/mod/common/pokemon/abilities/HiddenAbility;",
            at = @At("HEAD"),
            cancellable = true
    )
    private void initialize(JsonElement element, CallbackInfoReturnable<HiddenAbility> cir){
        redirectHiddenAbilityParseFromJSON(element, cir);
    }
}
