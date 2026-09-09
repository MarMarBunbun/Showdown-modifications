package drai.dev.gravelsextendedbattles.mixin;


import com.cobblemon.mod.common.api.pokemon.requirement.*;
import com.cobblemon.mod.common.pokemon.adapters.*;
import com.google.common.collect.*;
import drai.dev.gravelsextendedbattles.additions.evolutions.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;
import kotlin.jvm.JvmClassMappingKt;
import kotlin.reflect.KClass;

@Mixin(CobblemonRequirementAdapter.class)
public abstract class CobblemonRequirementAdapterMixin {
    @Accessor("types")
    private static HashBiMap<String, KClass<? extends Requirement>> getTypes() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }

    @Inject(method = "registerType", at = @At("TAIL"), remap = false)
    private void executeInject(CallbackInfo ci) {
        var types = getTypes();
        types.put(
                FriendshipBelowRequirement.Companion.getADAPTER_VARIANT(),
                JvmClassMappingKt.getKotlinClass(FriendshipBelowRequirement.class)
        );
    }
}
