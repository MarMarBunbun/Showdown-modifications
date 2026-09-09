package drai.dev.gravelsextendedbattles.data

import com.cobblemon.mod.common.Cobblemon
import drai.dev.gravelsextendedbattles.data.provider.GEBTypeGemsLootTableProvider
import net.fabricmc.fabric.api.datagen.v1.DataGeneratorEntrypoint
import net.fabricmc.fabric.api.datagen.v1.FabricDataGenerator

class GEBFabricDataGenerator : DataGeneratorEntrypoint {
    override fun onInitializeDataGenerator(generator: FabricDataGenerator?) {
        if (generator == null) {
            Cobblemon.LOGGER.error("Fabric Data Generator couldn't initialize")
            return
        }
        val pack = generator.createPack()

        pack.addProvider(::GEBTypeGemsLootTableProvider);
    }
}