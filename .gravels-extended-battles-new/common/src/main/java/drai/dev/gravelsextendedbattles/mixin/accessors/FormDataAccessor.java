package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.pokemon.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(FormData.class)
public interface FormDataAccessor {

    @Mutable
    @Accessor("_evolutions")
    public void setEvolutions(Set<Evolution> evolutions);
    @Mutable
    @Accessor("_primaryType")
    public void setPrimaryType(ElementalType evolutions);
    @Mutable
    @Accessor("_secondaryType")
    public void setSecondaryType(ElementalType evolutions);
    @Mutable
    @Accessor("_baseScale")
    public void setBaseScale(Float baseScale);
}
