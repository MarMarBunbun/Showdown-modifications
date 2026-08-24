package drai.dev.gravelmon

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import net.fabricmc.api.ModInitializer

object GravelsExtendedBattlesFabric: ModInitializer {
    override fun onInitialize() {
        GravelsExtendedBattles.initialize()
    }
}