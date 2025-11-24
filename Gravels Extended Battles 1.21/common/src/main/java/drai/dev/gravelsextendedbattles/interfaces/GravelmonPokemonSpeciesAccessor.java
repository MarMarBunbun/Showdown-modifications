package drai.dev.gravelsextendedbattles.interfaces;

import com.cobblemon.mod.common.pokemon.*;
import com.google.common.collect.*;
import net.minecraft.resources.*;

import java.util.*;

public interface GravelmonPokemonSpeciesAccessor {
    HashBasedTable<String, Integer, Species> getSpeciesByDex();
    HashMap<ResourceLocation, Species> getSpeciesByIdentifier();
}
