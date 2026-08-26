package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.github.yajatkaul.mega_showdown.item.custom.z.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(ElementalZCrystal.class)
public interface ElementalZCrystalAccessor {
    @Mutable
    @Accessor("element")
    void gravelmon_setElement(ElementalType evolutions);
    @Mutable
    @Accessor("pokemons")
    List<String> gravelmon_getPokemons();
}
