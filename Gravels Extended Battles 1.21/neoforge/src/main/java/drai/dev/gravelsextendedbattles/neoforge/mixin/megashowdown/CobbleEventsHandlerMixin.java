package drai.dev.gravelsextendedbattles.neoforge.mixin.megashowdown;

import com.cobblemon.mod.common.api.events.drops.*;
import com.cobblemon.mod.common.entity.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import com.cobblemon.yajatkaul.mega_showdown.event.cobbleEvents.*;
import drai.dev.gravelsextendedbattles.neoforge.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.world.item.*;
import net.neoforged.neoforge.registries.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;

@Mixin(CobbleEventsHandler.class)
public class CobbleEventsHandlerMixin {
    @Redirect(
            method = "dropShardPokemon",
            at = @At(
                    value = "INVOKE",
                    target = "Lnet/neoforged/neoforge/registries/DeferredItem;get()Ljava/lang/Object;"
            )
    )
    private static Object redirectTeraShard(DeferredItem<Item> instance, LootDroppedEvent event) {
        Pokemon pokemon = ((PokemonEntity)event.getEntity()).getPokemon();
        return GravelsExtendedBattlesNeoForge.getTeraShardForType(pokemon.getTypes(), instance);
    }
}
