package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.pokedex.def.*;
import com.cobblemon.mod.common.api.pokedex.entry.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(AggregatePokedexDef.class)
public interface NationalDexAccessor {
    @Accessor
    List<ResourceLocation> getSubDexIds();
}
