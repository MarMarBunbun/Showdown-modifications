package drai.dev.gravelsextendedbattles

import drai.dev.gravelsextendedbattles.config.GEBConfig
import eu.midnightdust.lib.config.MidnightConfig
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import kotlin.jvm.java


object GravelsExtendedBattles {
    @JvmField
    val LOGGER: Logger = LogManager.getLogger()
    @JvmField
    val CONFIG: GEBConfig = GEBConfig()
    @JvmStatic
    fun initialize() {
        LOGGER.info("Initializing Gravels Extended Battles")
        MidnightConfig.init("geb", GEBConfig::class.java)
    }
}