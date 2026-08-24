package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.spawning.detail.*;
import com.mojang.brigadier.exceptions.*;
import drai.dev.gravelsextendedbattles.mixinimpl.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(PokemonSpawnDetail.class)
public class PokemonSpawnDetailMixin {
    @Inject(method = "isValid", at = @At("HEAD"), cancellable = true, remap = false)
    public void executeInject(CallbackInfoReturnable<Boolean> cir) throws CommandSyntaxException {
        GravelmonSpawnDetailsManager.checkForBannedPokemon(getSelf(), cir);
    }

    public PokemonSpawnDetail getSelf() {
        return (PokemonSpawnDetail) (Object) this;
    }
}
