package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.spawning.detail.*;
import com.mojang.brigadier.exceptions.*;
import drai.dev.gravelsextendedbattles.spawning.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(PokemonSpawnDetail.class)
public class SpawnDetailMixin {
    @Inject(method = "isValid", at = @At("HEAD"), cancellable = true, remap = false)
    public void executeInject(CallbackInfoReturnable<Boolean> cir) throws CommandSyntaxException {
        var self = gravels_Extended_Battles$getSelf();
        var overWrite = GravelmonSpawnDetailsManager.INSTANCE.isSpawnForBannedPokemon(self.getPokemon());
        if(overWrite) {
            cir.setReturnValue(false);
            cir.cancel();
        }
    }

    @Unique
    public PokemonSpawnDetail gravels_Extended_Battles$getSelf() {
        return (PokemonSpawnDetail) (Object) this;
    }
}
