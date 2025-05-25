package drai.dev.gravelsextendedbattles.fabric.datagen;

import net.fabricmc.fabric.api.datagen.v1.*;

public class ModDataGenerator implements DataGeneratorEntrypoint {

    @Override
    public void onInitializeDataGenerator(FabricDataGenerator fabricDataGenerator) {
        FabricDataGenerator.Pack pack = fabricDataGenerator.createPack();
        pack.addProvider(ModModelGenerator::new);
        pack.addProvider(ModRecipeProvider::new);
        pack.addProvider(LanguageGenerator::new);
    }
}
