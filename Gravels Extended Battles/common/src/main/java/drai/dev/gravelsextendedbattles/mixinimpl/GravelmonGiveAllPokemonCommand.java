package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.api.storage.pc.*;
import com.cobblemon.mod.common.pokemon.*;
import com.cobblemon.mod.common.util.*;
import com.mojang.brigadier.*;
import com.mojang.brigadier.context.*;
import com.mojang.brigadier.exceptions.*;
import kotlin.jvm.internal.*;
import net.minecraft.server.command.*;
import net.minecraft.server.network.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.BANNED_LABELS;
import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.SORTED_SPECIES;

public class GravelmonGiveAllPokemonCommand {
    public static void modifyGiveCommand(CommandContext<ServerCommandSource> context, CallbackInfoReturnable<Integer> cir) throws CommandSyntaxException {
        if (SORTED_SPECIES.isEmpty()) {
            SORTED_SPECIES = GravelmonGiveAllPokemonCommand.genSortedList();
        }
        ServerPlayerEntity player = (context.getSource()).getPlayerOrThrow();
        Intrinsics.checkNotNullExpressionValue(player, "player");
        PCStore pcStore = PlayerExtensionsKt.party(player).getOverflowPC();
        if (pcStore == null) {
            cir.setReturnValue(0);
        } else {
            PCStore pc = pcStore;
            for (Species species : SORTED_SPECIES) {
                boolean isValid = true;
                for (String label : BANNED_LABELS) {
                    if (species.getLabels().contains(label)) {
                        isValid = false;
                        break;
                    }
                }
                if(Arrays.stream(BANNED_LABELS).toList().contains("not_modeled") && !species.getImplemented()){
                    isValid = false;
                }
                if(isValid){
                    pc.add(species.create(10));
                    for (FormData formData : species.getForms()){
                        if(!formData.getAspects().isEmpty()
                                && !formData.getAspects().contains("female")
                                && !formData.getAspects().contains("mega")
                                && !formData.getAspects().contains("mega-x")
                                && !formData.getAspects().contains("mega-y")
                                && !formData.getAspects().contains("primal")
                                && !formData.getAspects().contains("alola-totem")
                                && !formData.getAspects().contains("gmax")){
                            var form = species.create(10);
                            form.setAspects(new HashSet<>(formData.getAspects()));
                            pc.add(form);
                        }
//                        }
                    }
                }
            }
            cir.setReturnValue(Command.SINGLE_SUCCESS);
        }
        cir.cancel();
    }

    public static List<Species> genSortedList(){
        var allowedLabels = new ArrayList<>(List.of("baby", "pseudo_legendary", "legendary", "mythical",
                "gen1", "gen2", "gen3", "gen4", "gen5",
                "gen6", "gen7", "gen8", "gen9"));
        Comparator<Species> comparator = (o1, o2) -> {
            int diff = o1.getNationalPokedexNumber() - o2.getNationalPokedexNumber();
            if(diff == 0){
                boolean o1IsOriginal = true;
                boolean o2IsOriginal = true;
                for (String label : o1.getLabels()) {
                    if(!allowedLabels.contains(label)){
                        o1IsOriginal = false;
                    }
                }
                for (String label : o2.getLabels()) {
                    if(!allowedLabels.contains(label)){
                        o2IsOriginal = false;
                    }
                }
                if(o1IsOriginal && !o2IsOriginal){
                    return -1;
                } else {
                    return o1.getName().compareTo(o2.getName());
                }
            }
            return diff;
        };
        List<Species> orderedSpecies = new ArrayList<>(PokemonSpecies.INSTANCE.getImplemented().stream().toList());
        orderedSpecies.sort(comparator);
        return orderedSpecies;
    }
}