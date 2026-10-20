package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.habitats.*;
import com.cobblemon.mod.common.api.tms.*;
import net.minecraft.resources.*;
import org.slf4j.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(TechnicalMachines.class)
public abstract class TechnicalMachinesMixin {
    @Unique
    private static final Logger GEB_LOGGER = LoggerFactory.getLogger("gravels_extended_battles");

    /**
     * TMs pointing at an unknown move fall back to tackle, so several TMs can end up sharing a move.
     * Identical TM stacks crash the creative tab, so keep one TM per move (preferring the one whose id matches the move).
     */
    @Inject(method = "reload(Ljava/util/Map;)V", at = @At("TAIL"))
    private static void removeDuplicateMoveTMs(Map<ResourceLocation, HabitatPool> data, CallbackInfo ci) {
        var tmMap = TechnicalMachines.INSTANCE.getTmMap();
        var keptByMove = new HashMap<String, ResourceLocation>();
        var toRemove = new ArrayList<ResourceLocation>();
        for (var entry : tmMap.entrySet()) {
            var moveName = entry.getValue().getMoveName().getName();
            var keptId = keptByMove.get(moveName);
            if (keptId == null) {
                keptByMove.put(moveName, entry.getKey());
            } else if (entry.getKey().getPath().equals(moveName) && !keptId.getPath().equals(moveName)) {
                toRemove.add(keptId);
                keptByMove.put(moveName, entry.getKey());
            } else {
                toRemove.add(entry.getKey());
            }
        }
        for (var id : toRemove) {
            var tm = tmMap.remove(id);
            GEB_LOGGER.warn("Removed TM {} because its move {} is already used by TM {} (is the move missing?)",
                    id, tm.getMoveName().getName(), keptByMove.get(tm.getMoveName().getName()));
        }
        if (!toRemove.isEmpty()) {
            var moveToTM = TechnicalMachines.INSTANCE.getMoveToTM();
            for (var id : keptByMove.values()) {
                var tm = tmMap.get(id);
                moveToTM.put(tm.getMoveName(), tm);
            }
        }
    }

    @Inject(method = "reload(Ljava/util/Map;)V", at = @At("TAIL"))
    private static void touch(Map<ResourceLocation, HabitatPool> data, CallbackInfo ci) {
        TechnicalMachines.INSTANCE.getObservable().emit(TechnicalMachines.INSTANCE);
    }
}
