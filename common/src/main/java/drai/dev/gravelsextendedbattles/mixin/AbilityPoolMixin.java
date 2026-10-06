package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.pokemon.abilities.*;
import com.cobblemon.mod.common.util.adapters.*;
import com.google.gson.*;
import drai.dev.gravelsextendedbattles.additions.*;
import org.jetbrains.annotations.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.lang.reflect.*;
import java.util.*;

import static drai.dev.gravelsextendedbattles.mixinimpl.AbilityPoolInjections.createPool;

@Mixin(AbilityPoolAdapter.class)
public class AbilityPoolMixin {
    @Inject(
            method = "deserialize(Lcom/google/gson/JsonElement;Ljava/lang/reflect/Type;Lcom/google/gson/JsonDeserializationContext;)Lcom/cobblemon/mod/common/api/abilities/AbilityPool;",
            at = @At("HEAD"),
            cancellable = true
    )
    public void getRandomAbility(JsonElement json, Type type, JsonDeserializationContext ctx, CallbackInfoReturnable<AbilityPool> cir) {
        AbilityPool pool = createPool(json);

        cir.setReturnValue(pool);
        cir.cancel();
    }
}
