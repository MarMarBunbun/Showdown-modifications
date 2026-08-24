package drai.dev.gravelsextendedbattles

import drai.dev.gravelsextendedbattles.additions.status.GravelmonStatus
import drai.dev.gravelsextendedbattles.config.GEBConfig
import drai.dev.gravelsextendedbattles.pokedex.EvolutionNode
import eu.midnightdust.lib.config.MidnightConfig
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger


object GravelsExtendedBattles {
    @JvmField
    val LOGGER: Logger = LogManager.getLogger()
    @JvmField
    val CONFIG: GEBConfig = GEBConfig()

    @JvmField
    val SORTED_SPECIES: MutableList<EvolutionNode> = ArrayList()
    @JvmStatic
    fun initialize() {
        LOGGER.info("Initializing Gravels Extended Battles")
        MidnightConfig.init("geb", GEBConfig::class.java)

        GravelmonStatus.registerStatus();
    }
}