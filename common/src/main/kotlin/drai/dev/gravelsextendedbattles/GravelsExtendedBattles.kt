package drai.dev.gravelsextendedbattles

import com.cobblemon.mod.common.api.Priority
import com.cobblemon.mod.common.api.pokedex.Dexes
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.data.StarterDataLoader
import drai.dev.gravelsextendedbattles.additions.status.GravelmonStatus
import drai.dev.GEBConfig.GEBConfig
import drai.dev.gravelsextendedbattles.mixin.accessors.PokemonSpeciesAccessor
import drai.dev.gravelsextendedbattles.pokedex.GravelmonPokedexResorter
import drai.dev.gravelsextendedbattles.starters.GravelmonStarterManager
import eu.midnightdust.lib.config.MidnightConfig
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger


object GravelsExtendedBattles {
    private var speciesFinished: Boolean = false
    private var dexesFinished: Boolean = false

    @JvmField
    val LOGGER: Logger = LogManager.getLogger()
    @JvmField
    val CONFIG: GEBConfig = GEBConfig

    @JvmStatic
    fun initialize() {
        LOGGER.info("Initializing Gravels Extended Battles")
        MidnightConfig.init("geb", GEBConfig::class.java)

        GravelmonStatus.registerStatus();

        registerCobblemonEventHooks()
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
    }

    fun applyGravelmonExtensions() {
        if (!speciesFinished || !dexesFinished) return
        val pokemonSpecies = PokemonSpecies
        val dexes = Dexes
        SpeciesManager.processFormEvolutionAdditions()
        SpeciesManager.processTypeChanges()
        SpeciesManager.processFormBaseScaleAdditions()

        if (CONFIG.resortPokedexInEvolutionOrder) {
            GravelmonPokedexResorter.resort(pokemonSpecies)
        }

        BanListManager.banPokemon(pokemonSpecies, (pokemonSpecies as PokemonSpeciesAccessor))
        GravelmonPokedexManager.processPokedexBans(dexes)

        if (CONFIG.enableAutomaticMoveInsertion) GravelmonMoveSubstitution.substituteMoves()
        speciesFinished = false
        dexesFinished = false
    }
}