package drai.dev.gravelsextendedbattles.items.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.entity.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import com.github.yajatkaul.mega_showdown.codec.*;
import com.github.yajatkaul.mega_showdown.item.custom.z.*;
import drai.dev.gravelsextendedbattles.mixin.megashowdown.*;

import java.util.*;
import java.util.function.*;

public class GravelmonElementalZCrystal extends ElementalZCrystal {
    private final Supplier<ElementalType> elementalTypeSupplier;
    protected final List<String> pokemons;
    private final String effectId;
    private final boolean tradable;

    public GravelmonElementalZCrystal(Properties properties, String revertAspect, String applyAspect, List<String> pokemons, String effectId, boolean tradable, Supplier<ElementalType> element) {
        super(properties, revertAspect, applyAspect, pokemons, effectId, tradable, null);
        this.elementalTypeSupplier = element;
        this.pokemons = pokemons;
        this.effectId = effectId;
        this.tradable = tradable;
    }

    public void initialize() {
        ((ElementalZCrystalAccessor) this).gravelmon_setElement(elementalTypeSupplier.get());
    }

    public void apply(Pokemon pokemon) {
        if (this.pokemons.contains(pokemon.getSpecies().getName())) {
            Effect.getEffect(this.effectId).applyEffects(pokemon, List.of(String.format("multitype=%s", this.elementalTypeSupplier.get().getName())), (PokemonEntity)null);
            if (!this.tradable) {
                pokemon.setTradeable(false);
            }
        }

    }

    public void revert(Pokemon pokemon) {
        if (this.pokemons.contains(pokemon.getSpecies().getName())) {
            Effect.getEffect(this.effectId).revertEffects(pokemon, List.of("multitype=normal"), (PokemonEntity)null);
            if (!this.tradable) {
                pokemon.setTradeable(true);
            }
        }

    }

    public ElementalType getElement() {
        return this.elementalTypeSupplier.get();
    }
}
