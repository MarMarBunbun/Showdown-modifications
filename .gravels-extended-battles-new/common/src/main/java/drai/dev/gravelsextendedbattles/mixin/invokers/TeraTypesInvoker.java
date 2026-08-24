package drai.dev.gravelsextendedbattles.mixin.invokers;

import com.cobblemon.mod.common.api.types.tera.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(TeraTypes.class)
public interface TeraTypesInvoker {

    @Invoker("create")
    TeraType invokeCreate(ResourceLocation id, TeraType type);
}
