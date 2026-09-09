package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.pokedex.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(PokedexManager.class)
public interface PokedexManagerAccessor {
    @Accessor
    Map<ResourceLocation, SpeciesDexRecord> getSpeciesRecords();
}
