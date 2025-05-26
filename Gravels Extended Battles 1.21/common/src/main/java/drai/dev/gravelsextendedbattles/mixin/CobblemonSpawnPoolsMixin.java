package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.*;
import com.cobblemon.mod.common.api.spawning.*;
import com.cobblemon.mod.common.api.spawning.detail.*;
import com.mojang.brigadier.exceptions.*;
import drai.dev.gravelsextendedbattles.mixinimpl.*;
import kotlin.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(CobblemonSpawnPools.class)
public class CobblemonSpawnPoolsMixin {

    @Inject(method = "load", at = @At("TAIL"), remap = false)
    public void executeInject(CallbackInfo ci) {
        CobblemonSpawnPools.WORLD_SPAWN_POOL.getObservable().subscribe(Priority.LOWEST, event->{
            event.getDetails().forEach(spawnDetail -> {
                if(spawnDetail instanceof PokemonSpawnDetail pokemonSpawnDetail) {
                    GravelmonSpawnDetailsManager.modifySpawnDetail(pokemonSpawnDetail);
                }
            });
            return Unit.INSTANCE;
        });
    }
}
