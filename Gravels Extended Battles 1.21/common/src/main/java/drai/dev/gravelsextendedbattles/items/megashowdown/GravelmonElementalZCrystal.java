package drai.dev.gravelsextendedbattles.items.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.github.yajatkaul.mega_showdown.item.custom.z.*;
import drai.dev.gravelsextendedbattles.mixin.megashowdown.*;

import java.util.*;
import java.util.function.*;

public class GravelmonElementalZCrystal extends ElementalZCrystal {
    private final Supplier<ElementalType> elementalTypeSupplier;

    public GravelmonElementalZCrystal(Properties properties, String revertAspect, String applyAspect, List<String> pokemons, String effectId, boolean tradable, Supplier<ElementalType> element) {
        super(properties, revertAspect, applyAspect, pokemons, effectId, tradable, null);
        this.elementalTypeSupplier = element;
    }

    public void initialize() {
        ((ElementalZCrystalAccessor) this).gravelmon_setElement(elementalTypeSupplier.get());
    }
}
