package drai.dev.gravelsextendedbattles

import com.cobblemon.mod.common.ResourcePackActivationBehaviour
import com.cobblemon.mod.common.api.Priority
import com.cobblemon.mod.common.api.events.CobblemonEvents
import com.cobblemon.mod.common.api.events.pokemon.evolution.EvolutionCompleteEvent
import com.cobblemon.mod.common.api.fossil.Fossil
import com.cobblemon.mod.common.api.fossil.Fossils
import com.cobblemon.mod.common.api.fossil.Fossils.observable
import com.cobblemon.mod.common.api.pokedex.Dexes
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.client.CobblemonPack
import com.cobblemon.mod.common.data.StarterDataLoader
import dev.architectury.injectables.annotations.ExpectPlatform
import drai.dev.gravelsextendedbattles.additions.status.GravelmonStatus
import drai.dev.gravelsextendedbattles.additions.types.GravelmonElementalTypes
import drai.dev.gravelsextendedbattles.config.GEBConfig

import drai.dev.gravelsextendedbattles.data.GEBDataProvider
import drai.dev.gravelsextendedbattles.fossils.GEBLootPoolManager
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import drai.dev.gravelsextendedbattles.pokedex.GravelmonPokedexResorter
import drai.dev.gravelsextendedbattles.registries.GEBItems
import drai.dev.gravelsextendedbattles.starters.GravelmonStarterManager
import eu.midnightdust.lib.config.MidnightConfig
import net.minecraft.advancements.critereon.ItemPredicate
import net.minecraft.core.Holder
import net.minecraft.core.HolderSet
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.resources.ResourceLocation
import net.minecraft.server.packs.PackType
import net.minecraft.world.item.Item
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import java.util.*
import java.util.function.Consumer
import kotlin.collections.HashMap


object GravelsExtendedBattles {
    private var speciesFinished: Boolean = false
    private var dexesFinished: Boolean = false
    @JvmField
    val MODID = "gravels_extended_battles"
    @JvmField
    val LOGGER: Logger = LogManager.getLogger()
    @JvmField
    val CONFIG: GEBConfig = GEBConfig()
    @JvmField
    val fossils: MutableMap<ResourceLocation, Fossil> = HashMap()

    @JvmStatic
    val builtinPacks = listOf(
        CobblemonPack(id = "placeholdersprites", name = "Placeholder Sprites for Unmodeled Pokemon", packType = PackType.CLIENT_RESOURCES, activationBehaviour = ResourcePackActivationBehaviour.DEFAULT_ENABLED),
    )
    @JvmStatic
    fun initialize() {
        LOGGER.info("Initializing Gravels Extended Battles")
        MidnightConfig.init("geb", GEBConfig::class.java)
        GEBDataProvider.registerDefaults()

        GravelmonStatus.registerStatus()

        registerCobblemonEventHooks()
        registerItems()
        registerVillagerTrades()
    }

    private fun registerCobblemonEventHooks() {
        PokemonSpecies.observable.subscribe(Priority.LOWEST) {
            speciesFinished = true
            applyGravelmonExtensions()
        }
        Dexes.observable.subscribe(Priority.LOWEST) {
            dexesFinished = true
            applyGravelmonExtensions()
        }

        StarterDataLoader.observable.subscribe(Priority.LOWEST) {
            GravelmonStarterManager.processStarters()
        }

        observable.subscribe(Priority.LOWEST) {
            Fossils.all().forEach(Consumer { fossil: Fossil ->
                val identifiers = fossil.fossils.stream()
                    .map { obj: ItemPredicate -> obj.items() }
                    .filter { obj: Optional<HolderSet<Item>> -> obj.isPresent }
                    .flatMap { opt: Optional<HolderSet<Item>> -> opt.get().stream() }
                    .map { itemHolder: Holder<Item>? -> BuiltInRegistries.ITEM.getKey(itemHolder!!.value()) }
                    .toList()
                for (identifier in identifiers) {
                    fossils[identifier] = fossil
                }
            })
            GEBLootPoolManager.scanLootPools()
        }

        CobblemonEvents.EVOLUTION_COMPLETE.subscribe(Priority.NORMAL) { evolutionCompleteEvent: EvolutionCompleteEvent? ->
            if (evolutionCompleteEvent!!.component1().hasLabels("digimon")) evolutionCompleteEvent.component1()
                .initializeMoveset(true)
        }
    }

    fun applyGravelmonExtensions() {
        if (!speciesFinished || !dexesFinished) return
        val pokemonSpecies = PokemonSpecies
        val dexes = Dexes

        if (CONFIG.enableDexResort) {
            GravelmonPokedexResorter.resort(pokemonSpecies)
        }

        BanListManager.banPokemon(pokemonSpecies, (pokemonSpecies as PokemonSpeciesAccessor))
        GravelmonPokedexResorter.processPokedexBans(dexes)

//        if (CONFIG.enableAutomaticMoveInsertion) GravelmonMoveSubstitution.substituteMoves()
        speciesFinished = false
        dexesFinished = false
    }

    @ExpectPlatform
    @JvmStatic
    fun registerVillagerTrades() {
        throw AssertionError()
    }

    @ExpectPlatform
    @JvmStatic
    fun registerItems() {
        throw AssertionError()
    }
}