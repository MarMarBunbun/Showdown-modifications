package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.conditional.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(RegistryLikeIdentifierCondition.class)
public interface RegistryLikeIdentifierConditionAccessor {
    @Accessor
    ResourceLocation getIdentifier();
}
