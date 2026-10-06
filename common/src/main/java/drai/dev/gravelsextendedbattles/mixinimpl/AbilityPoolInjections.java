package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.pokemon.abilities.*;
import com.google.gson.*;
import org.jetbrains.annotations.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

public class AbilityPoolInjections {

    public static @NotNull AbilityPool createPool(JsonElement json) {
        AbilityPool pool = new AbilityPool();

        json.getAsJsonArray().forEach(element -> {
            var potentialAbility = PotentialAbility.Companion.getTypes().stream()
                    .map(potentialAbilityType -> {
                        var pA= potentialAbilityType.parseFromJSON(element);

                        if(pA==null) {
                            if(!element.isJsonPrimitive()) return pA;
                            var str = element.getAsString();
                            if (str == null) return pA;

                            if(!str.startsWith("h:") && potentialAbilityType instanceof CommonAbilityType)
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
        return pool;
    }

    public static void redirectCommonAbilityParseFromJSON(JsonElement element, CallbackInfoReturnable<CommonAbility> cir) {
        if (!element.isJsonPrimitive()) {
            cir.setReturnValue(null);
            cir.cancel();
        }
        String str = element.getAsString();
        if (str != null && str.startsWith("h:")) {
            cir.setReturnValue(null);
            cir.cancel();
            return;
        }
        var ability = Abilities.get(str);
        if(ability == null){
            ability = Abilities.get("keeneye");
        }

        cir.setReturnValue(new CommonAbility(ability));
        cir.cancel();
        return;
    }

    public static void redirectHiddenAbilityParseFromJSON(JsonElement element, CallbackInfoReturnable<HiddenAbility> cir) {
        String str = element.isJsonPrimitive() ? element.getAsString() : null;

        if (str != null && str.startsWith("h:")) {
            String abilityString = str.substring(2);
            var ability = Abilities.get(abilityString);
            if(ability == null){
                ability = Abilities.get("keeneye");
            }
            cir.setReturnValue(new HiddenAbility(ability));
            cir.cancel();
            return;
        }
        cir.setReturnValue(null);
        cir.cancel();
    }
}
