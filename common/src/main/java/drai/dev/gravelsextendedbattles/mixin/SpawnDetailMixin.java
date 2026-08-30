package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.spawning.detail.*;
import com.mojang.brigadier.exceptions.*;
import drai.dev.gravelsextendedbattles.spawning.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(SpawnDetail.class)
public class SpawnDetailMixin {
    @Inject(method = "isValid", at = @At("HEAD"), cancellable = true, remap = false)
    public void executeInject(CallbackInfoReturnable<Boolean> cir) throws CommandSyntaxException {
        var self = getSelf();
        if(self.getType().equals("pokemon") || self.getType().equals("pokemon-herd")) GravelmonSpawnDetailsManager.INSTANCE.checkForBannedPokemon(getSelf(), cir);
    }

    public PokemonSpawnDetail getSelf() {
        return (PokemonSpawnDetail) (Object) this;
    }
}
