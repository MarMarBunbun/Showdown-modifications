package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.cobblemon.mod.common.pokemon.evolution.adapters.*;
import com.google.gson.*;
import drai.dev.gravelsextendedbattles.data.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.lang.reflect.*;

@Mixin(CobblemonPreEvolutionAdapter.class)
public class CobblemonPreEvolutionAdapterMixin {
    @Inject(method = "deserialize(Lcom/google/gson/JsonElement;Ljava/lang/reflect/Type;Lcom/google/gson/JsonDeserializationContext;)Lcom/cobblemon/mod/common/api/pokemon/evolution/PreEvolution;", at =@At("HEAD"), remap = false, cancellable = true)
    private void executeInject(JsonElement json, Type typeOfT, JsonDeserializationContext context, CallbackInfoReturnable<PreEvolution> cir) {
        cir.setReturnValue(new GravelmonLazyPreEvolution(json.getAsString()));
        cir.cancel();
    }
}
