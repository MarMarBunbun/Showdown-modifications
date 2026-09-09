package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import com.google.common.collect.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(PokemonSpecies.class)
public interface PokemonSpeciesAccessor {
    @Accessor
    static HashBasedTable<String, Integer, Species> getSpeciesByDex() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }

    @Accessor
    static HashMap<ResourceLocation, Species> getSpeciesByIdentifier() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }
}
