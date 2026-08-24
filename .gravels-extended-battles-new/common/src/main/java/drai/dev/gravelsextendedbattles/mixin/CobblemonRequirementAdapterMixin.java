package drai.dev.gravelsextendedbattles.mixin;


import com.cobblemon.mod.common.api.pokemon.requirement.*;
import com.cobblemon.mod.common.pokemon.adapters.*;
import com.google.common.collect.*;
import drai.dev.gravelsextendedbattles.data.evolution.*;
import kotlin.reflect.*;
import org.jetbrains.annotations.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(CobblemonRequirementAdapter.class)
public abstract class CobblemonRequirementAdapterMixin {
    @Accessor("types")
    abstract HashBiMap<String, Class<? extends Requirement>> getTypes();

    @Inject(method = "registerType", at = @At("TAIL"), remap = false)
    private void executeInject(CallbackInfo ci) {
        var types = this.getTypes();
        types.put(FriendshipBelowRequirement.Companion.getADAPTER_VARIANT(), FriendshipBelowRequirement.class);
    }
}
