package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokedex.def.*;
import com.cobblemon.mod.common.api.pokedex.entry.*;
import drai.dev.gravelsextendedbattles.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(AggregatePokedexDef.class)
public class NationalDexMixin {
    //TODO this might be happening every time the nat dex refreshes
    @Inject(method = "getEntries", at = @At("TAIL"), remap = false, cancellable = true)
    private void injected(CallbackInfoReturnable<List<PokedexEntry>> cir) {
        var self = getSelf();
        if(!self.getId().getPath().equalsIgnoreCase("national")) return;
        if(!GravelsExtendedBattles.gravelmonConfig.getEnableDexResort()) return;
        var entries = cir.getReturnValue();
        cir.setReturnValue(GravelmonPokedexManager.processPokedexResorting(entries));
    }

    @Unique
    public AggregatePokedexDef getSelf() {
        return (AggregatePokedexDef) (Object) this;
    }
}
