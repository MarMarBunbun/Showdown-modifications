package drai.dev.gravelsextendedbattles.neoforge.mixin;

import com.cobblemon.mod.neoforge.*;
import drai.dev.gravelsextendedbattles.data.*;
import net.minecraft.server.packs.*;
import net.neoforged.neoforge.event.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(CobblemonNeoForge.class)
public class CobblemonNeoForgeMixin {
    @Inject(method = "onReload", at = @At("TAIL"))
    public void onReload(AddReloadListenerEvent e, CallbackInfo ci) {
        e.addListener(new GEBDataProvider.SimpleResourceReloader(PackType.SERVER_DATA));
    }
}
