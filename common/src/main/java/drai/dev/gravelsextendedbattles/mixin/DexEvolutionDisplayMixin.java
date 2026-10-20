package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.CobblemonItems;
import com.cobblemon.mod.common.api.pokedex.entry.CobblemonDexEvolutionRequirementDisplay;
import com.cobblemon.mod.common.api.pokedex.entry.DexEvolutionDisplayKt;
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies;
import com.cobblemon.mod.common.pokemon.evolution.variants.ItemInteractionEvolution;
import com.cobblemon.mod.common.pokemon.evolution.variants.TradeEvolution;
import com.cobblemon.mod.common.util.LocalizationUtilsKt;
import com.cobblemon.mod.common.util.ResourceLocationExtensionsKt;
import net.minecraft.ChatFormatting;
import net.minecraft.core.HolderSet;
import net.minecraft.network.chat.MutableComponent;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.Items;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

import java.util.Iterator;
import java.util.Optional;

/**
 * Cobblemon reads the pokedex tooltip of an evolution without checking what it reads: an item-interact evolution's
 * first required item (`items.get().first()`), and a trade evolution's species (`getByIdentifier(..)!!`). An evolution
 * item that cannot be resolved, or a trade species that does not exist, throws and takes the whole data reload, and with
 * it the world, down. Each is logged here and answered with a stand-in instead: minecraft:stick for the item, "any
 * species" for the trade.
 */
@Mixin(value = DexEvolutionDisplayKt.class, remap = false)
public class DexEvolutionDisplayMixin {
    private static final Logger GEB_LOGGER = LoggerFactory.getLogger("gravels_extended_battles");

    @Inject(
            method = "getToolTipHeaderIcon(Lcom/cobblemon/mod/common/pokemon/evolution/variants/ItemInteractionEvolution;)Lcom/cobblemon/mod/common/api/pokedex/entry/CobblemonDexEvolutionRequirementDisplay;",
            at = @At("HEAD"),
            cancellable = true,
            remap = false
    )
    private static void geb$useStickForUnresolvableItem(ItemInteractionEvolution evolution, CallbackInfoReturnable<CobblemonDexEvolutionRequirementDisplay> cir) {
        Item item = null;
        String why = null;
        try {
            Optional<HolderSet<Item>> items = evolution.getRequiredContext().items();
            if (items.isEmpty()) {
                why = "it names no item";
            } else {
                Iterator<net.minecraft.core.Holder<Item>> holders = items.get().iterator();
                if (holders.hasNext()) {
                    item = holders.next().value();
                } else {
                    why = "its item (or tag) holds nothing";
                }
            }
        } catch (RuntimeException exception) {
            why = "reading its item threw " + exception;
        }
        if (item == null) {
            GEB_LOGGER.error("The item of evolution '{}' could not be resolved for the pokedex ({}); using minecraft:stick instead.", evolution.getId(), why);
            item = Items.STICK;
        }
        MutableComponent name = item.getDescription().plainCopy().withStyle(ChatFormatting.GREEN);
        cir.setReturnValue(new CobblemonDexEvolutionRequirementDisplay(item, LocalizationUtilsKt.lang("ui.pokedex.evolution.item_interact.tooltip", name)));
    }

    @Inject(
            method = "getToolTipHeaderIcon(Lcom/cobblemon/mod/common/pokemon/evolution/variants/TradeEvolution;)Lcom/cobblemon/mod/common/api/pokedex/entry/CobblemonDexEvolutionRequirementDisplay;",
            at = @At("HEAD"),
            cancellable = true,
            remap = false
    )
    private static void geb$useAnySpeciesForUnknownTradeSpecies(TradeEvolution evolution, CallbackInfoReturnable<CobblemonDexEvolutionRequirementDisplay> cir) {
        String species = evolution.getRequiredContext().getSpecies();
        if (species == null) {
            return; // Cobblemon's own "any species" branch.
        }
        try {
            if (PokemonSpecies.INSTANCE.getByIdentifier(ResourceLocationExtensionsKt.asIdentifierDefaultingNamespace(species, "cobblemon")) != null) {
                return; // It exists: Cobblemon's own code is safe.
            }
            GEB_LOGGER.error("The trade species '{}' of evolution '{}' does not exist; showing \"any species\" in the pokedex instead.", species, evolution.getId());
        } catch (RuntimeException exception) {
            GEB_LOGGER.error("The trade species '{}' of evolution '{}' could not be looked up; showing \"any species\" in the pokedex instead.", species, evolution.getId(), exception);
        }
        cir.setReturnValue(new CobblemonDexEvolutionRequirementDisplay(CobblemonItems.LINK_CABLE, LocalizationUtilsKt.lang("ui.pokedex.evolution.trade.tooltip.with_any_species")));
    }
}