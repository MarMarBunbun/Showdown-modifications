package drai.dev.gravelsextendedbattles;

import com.cobblemon.mod.common.api.*;
import com.cobblemon.mod.common.api.events.*;
import com.cobblemon.mod.common.api.fossil.*;
import com.cobblemon.mod.common.api.pokedex.*;
import com.cobblemon.mod.common.api.pokemon.*;
import com.cobblemon.mod.common.api.pokemon.status.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.pokemon.status.*;
import dev.architectury.injectables.annotations.*;
import drai.dev.gravelsextendedbattles.interfaces.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.mixin.*;
import drai.dev.gravelsextendedbattles.registries.*;
import drai.dev.gravelsextendedbattles.resorting.*;
import drai.dev.gravelsextendedbattles.resorting.nodes.*;
import drai.dev.gravelsextendedbattles.starters.*;
import eu.midnightdust.lib.config.*;
import kotlin.*;
import kotlin.ranges.*;
import net.minecraft.advancements.critereon.*;
import net.minecraft.core.registries.*;
import net.minecraft.resources.*;

import java.util.*;
import java.util.logging.*;

import static com.cobblemon.mod.common.util.MiscUtilsKt.*;

public class GravelsExtendedBattles {

    public static final Map<ResourceLocation, Fossil> FOSSIL_MAP = new HashMap<>();
    public static final Map<String, TeraType> TERA_TYPES = new HashMap<>();
    public static String SHOWDOWN_FOLDER = "";
    public static boolean ICON_MIXIN_INIT = false;
    public static boolean ICON_WIDGET_INIT = false;
    public static final String MOD_ID = "gravels_extended_battles";
    public static Logger LOGGER = Logger.getLogger(MOD_ID);
    public static List<String> BANNED_LABELS = new ArrayList<>();
    public static List<String> ALLOWED_LABELS = new ArrayList<>();
    public static List<String> PASSWORDS = new ArrayList<>();
    public static List<String> IMPLEMENTED_TYPES = new ArrayList<>();
    public static int TYPE_COUNT = 18;
    public static boolean ADD_STARTERS = false;
    public static boolean TERA_TYPES_INITIATED = false;
    public static List<IEvolutionNode> SORTED_SPECIES = new ArrayList<>();
    public static IGravelmonConfig gravelmonConfig;
    public static Status FROSTBITE = new PersistentStatus(cobblemonResource("frostbite"), "fbt",
            "cobblemon.status.frostbite.apply", "cobblemon.status.frostbite.cure", new IntRange(180, 300));

    public static Status BLIGHT = new PersistentStatus(cobblemonResource("blight"), "bgt",
            "cobblemon.status.blight.apply", "cobblemon.status.blight.cure", new IntRange(180, 300));
    static{
        gravelmonConfig = new GravelmonConfig();
        MidnightConfig.init("gravelmon", GravelmonConfig.class);
        PASSWORDS = gravelmonConfig.getPasswords();
        BANNED_LABELS = gravelmonConfig.getBannedLabels();
        ALLOWED_LABELS = gravelmonConfig.getAllowedLabels();
        IMPLEMENTED_TYPES = gravelmonConfig.getImplementedTypes();
        ADD_STARTERS = gravelmonConfig.getShouldAddStarters();
    }

    public static void init() {
        PokemonSpecies.INSTANCE.getObservable().subscribe(Priority.LOWEST, pokemonSpecies -> {
            speciesFinished = true;
            applyGravelmonExtensions();
            return Unit.INSTANCE;
        });

        Fossils.INSTANCE.getObservable().subscribe(Priority.LOWEST, fossils -> {
            Fossils.all().forEach(fossil -> {
                var identifiers = fossil.getFossils().stream()
                        .map(ItemPredicate::items)
                        .filter(Optional::isPresent)
                        .flatMap(opt->opt.get().stream())
                        .map(itemHolder -> BuiltInRegistries.ITEM.getKey(itemHolder.value()))
                        .toList();
                for (ResourceLocation identifier : identifiers) {
                    FOSSIL_MAP.put(identifier, fossil);
                }
            });
            GravelmonFossilManager.scanLootPools();
            return Unit.INSTANCE;
        });

        Dexes.INSTANCE.getObservable().subscribe(Priority.LOWEST, dexes -> {
            dexesFinished = true;
            applyGravelmonExtensions();
            return Unit.INSTANCE;
        });

        CobblemonEvents.EVOLUTION_COMPLETE.subscribe(Priority.NORMAL, evolutionCompleteEvent -> {
            if(evolutionCompleteEvent.component1().hasLabels("digimon")) evolutionCompleteEvent.component1().initializeMoveset(true);
            return Unit.INSTANCE;
        });

        GravelsExtendedBattlesItems.touch();
        GravelsExtendedBattlesItems.register();

        Statuses.INSTANCE.registerStatus(FROSTBITE);

        Statuses.INSTANCE.registerStatus(BLIGHT);
    }

    private static boolean speciesFinished = false;
    private static boolean dexesFinished = false;

    public static void applyGravelmonExtensions(){
        if(!speciesFinished || !dexesFinished)  return;
        var pokemonSpecies = PokemonSpecies.INSTANCE;
        var dexes = Dexes.INSTANCE;
        SpeciesManager.processFormEvolutionAdditions();
        SpeciesManager.processTypeChanges();
        SpeciesManager.processFormBaseScaleAdditions();

        if (gravelmonConfig.getEnableDexResort()) {
            GravelmonPokedexResorter.resort(pokemonSpecies);
        }

        SpeciesManager.banPokemon(pokemonSpecies, ((GravelmonPokemonSpeciesAccessor) (Object) pokemonSpecies));
        GravelmonPokedexManager.processPokedexBans(dexes);

        GravelmonStarterManager.processStarters();
        if(gravelmonConfig.getAutomaticMoveInsertion()) GravelmonMoveSubstitution.substituteMoves();
        speciesFinished = false;
        dexesFinished = false;
    }

    @ExpectPlatform
    public static void registerVillagerTrades(){
        throw new AssertionError();
    }

    @ExpectPlatform
    public static void registerBrewingRecipes(){
        throw new AssertionError();
    }
}
