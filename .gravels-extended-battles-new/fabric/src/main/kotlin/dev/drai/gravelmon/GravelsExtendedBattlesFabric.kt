package dev.drai.gravelmon

import dev.drai.gravelsextendedbattles.GravelsExtendedBattles
import net.fabricmc.api.ModInitializer

object GravelsExtendedBattlesFabric: ModInitializer {
    override fun onInitialize() {
        GravelsExtendedBattles.initialize()
    }
}