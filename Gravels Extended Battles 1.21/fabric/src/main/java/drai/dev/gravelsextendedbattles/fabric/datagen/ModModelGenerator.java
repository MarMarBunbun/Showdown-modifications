package drai.dev.gravelsextendedbattles.fabric.datagen;

import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.datagen.v1.*;
import net.fabricmc.fabric.api.datagen.v1.provider.*;
import net.minecraft.core.registries.*;
import net.minecraft.data.models.*;
import net.minecraft.data.models.model.*;
import net.minecraft.world.item.*;

import java.util.function.*;

public class ModModelGenerator extends FabricModelProvider {
    public ModModelGenerator(FabricDataOutput output) {
        super(output);
    }

    @Override
    public void generateBlockStateModels(BlockModelGenerators blockStateModelGenerator) {}

    @Override
    public void generateItemModels(ItemModelGenerators itemModelGenerator) {

        for (Supplier<Item> value : GravelsExtendedBattlesItems.GEMS) {
            itemModelGenerator.generateFlatItem(value.get(), ModelTemplates.FLAT_ITEM);
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.MEMORIES) {
            itemModelGenerator.generateFlatItem(value.get(), ModelTemplates.FLAT_ITEM);
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.Z_CRYSTALS.keySet()) {
            itemModelGenerator.generateFlatItem(value.get(), ModelTemplates.FLAT_ITEM);
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.PLATES) {
            itemModelGenerator.generateFlatItem(value.get(), ModelTemplates.FLAT_ITEM);
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values()) {
            itemModelGenerator.generateFlatItem(value.get(), ModelTemplates.FLAT_ITEM);
        }
    }


}