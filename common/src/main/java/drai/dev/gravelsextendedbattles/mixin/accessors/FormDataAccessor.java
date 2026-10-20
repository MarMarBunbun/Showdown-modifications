package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.api.abilities.*;
import com.cobblemon.mod.common.api.drop.*;
import com.cobblemon.mod.common.api.pokemon.evolution.*;
import com.cobblemon.mod.common.api.pokemon.moves.*;
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
    /** The form's own learnset, or null when it learns the species' moves. */
    @Accessor("_moves")
    public Learnset getOwnMoves();
    @Mutable
    @Accessor("_moves")
    public void setMoves(Learnset moves);
    @Mutable
    @Accessor("_abilities")
    public void setAbilities(AbilityPool abilities);
    @Mutable
    @Accessor("_drops")
    public void setDrops(DropTable drops);
    @Mutable
    @Accessor("_preEvolution")
    public void setPreEvolution(PreEvolution preEvolution);
    @Mutable
    @Accessor("_baseScale")
    public void setBaseScale(Float baseScale);
}
