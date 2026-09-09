package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.spawning.detail.*;
import com.cobblemon.mod.common.api.spawning.position.*;
import com.cobblemon.mod.common.api.spawning.selection.*;
import com.mojang.brigadier.exceptions.*;
import drai.dev.gravelsextendedbattles.spawning.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(PokemonHerdSpawnDetail.class)
public class PokemonHerdSpawnDetailMixin {

    @Unique
    private boolean filtered = false;

    @Shadow
    private List<PokemonHerdSpawnDetail.Herdable> herdablePokemon;

    @Inject(method = "isValid", at = @At("HEAD"), remap = false, cancellable = true)
    public void executeInject(CallbackInfoReturnable<Boolean> cir) {
        if(!filtered){
            var herdableToRemove = this.herdablePokemon.stream()
                    .filter(herdable -> GravelmonSpawnDetailsManager.INSTANCE.isSpawnForBannedPokemon(herdable.getPokemon()))
                    .toList();
            this.herdablePokemon.removeAll(herdableToRemove);
            this.filtered = true;
        }

        cir.setReturnValue(!this.herdablePokemon.isEmpty());
    }
}
