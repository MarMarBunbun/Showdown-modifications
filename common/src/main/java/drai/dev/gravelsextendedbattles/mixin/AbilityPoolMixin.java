package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.pokemon.abilities.*;
import com.cobblemon.mod.common.util.adapters.*;
import com.google.gson.*;
import drai.dev.gravelsextendedbattles.additions.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.lang.reflect.*;
import java.util.*;

@Mixin(AbilityPoolAdapter.class)
public class AbilityPoolMixin {
    @Inject(
            method = "deserialize(Lcom/google/gson/JsonElement;Ljava/lang/reflect/Type;Lcom/google/gson/JsonDeserializationContext;)Lcom/cobblemon/mod/common/api/abilities/AbilityPool;",
            at = @At("HEAD"),
            cancellable = true
    )
    public void getRandomAbility(JsonElement json, Type type, JsonDeserializationContext ctx, CallbackInfoReturnable<AbilityPool> cir) {
        AbilityPool pool = new AbilityPool();

        json.getAsJsonArray().forEach(element -> {
            var potentialAbility = PotentialAbility.Companion.getTypes().stream()
                    .map(potentialAbilityType -> {
                        var pA= potentialAbilityType.parseFromJSON(element);
                        if(pA==null) {
                            if(potentialAbilityType instanceof CommonAbilityType)
                                pA = new CommonAbility(Abilities.get("keeneye"));
                            else if(potentialAbilityType instanceof HiddenAbilityType)
                                pA = new HiddenAbility(Abilities.get("keeneye"));
                        }
                        return pA;
                    })
                    .filter(Objects::nonNull)
                    .findFirst().orElseThrow(()->new RuntimeException("No potential ability found"));
            pool.add(potentialAbility.getPriority(), potentialAbility);
        });

        cir.setReturnValue(pool);
        cir.cancel();
    }
}
