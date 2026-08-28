package drai.dev.gravelsextendedbattles.fabric.mixin;

import drai.dev.gravelmon.fabric.*;
import net.minecraft.server.packs.resources.*;
import net.minecraft.util.profiling.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.concurrent.*;

@Mixin(targets = "com.cobblemon.mod.fabric.CobblemonFabric$CobblemonReloadListener")
public class CobblemonFabricMixin {
    @Inject(method = "reload", at = @At("TAIL"))
    public void onReload(PreparableReloadListener.PreparationBarrier synchronizer, ResourceManager manager, ProfilerFiller prepareProfiler, ProfilerFiller applyProfiler, Executor prepareExecutor, Executor applyExecutor, CallbackInfoReturnable<CompletableFuture<Void>> cir) {
        GravelsExtendedBattlesFabric.GEBReloadListener.INSTANCE.reload(synchronizer, manager, prepareProfiler, applyProfiler, prepareExecutor, applyExecutor);
    }
}
