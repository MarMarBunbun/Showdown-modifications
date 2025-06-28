package drai.dev.gravelsextendedbattles.fabric.datagen;

import com.cobblemon.yajatkaul.mega_showdown.item.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.datagen.v1.*;
import net.fabricmc.fabric.api.datagen.v1.provider.*;
import net.minecraft.core.*;
import net.minecraft.data.recipes.*;

import java.util.concurrent.*;
import java.util.function.*;

import static drai.dev.gravelsextendedbattles.registries.GravelsExtendedBattlesItems.FROST_HEAL;

public class ModRecipeProvider extends FabricRecipeProvider {


    public ModRecipeProvider(FabricDataOutput output, CompletableFuture<HolderLookup.Provider> registriesFuture) {
        super(output, registriesFuture);
    }

    @Override
    public void buildRecipes(RecipeOutput exporter) {
        for (var value : GravelsExtendedBattlesItems.Z_CRYSTALS.entrySet()) {
            ShapedRecipeBuilder.shaped(RecipeCategory.MISC,
                            value.getKey().get(),1)
                    .pattern(" # ")
                    .pattern("#Z#")
                    .pattern(" # ")
                    .define('#', value.getValue().get())
                    .define('Z', ZCrystals.BLANK_Z)
                    .unlockedBy("hasZCrystals", has(ZCrystals.BLANK_Z))
                    .save(exporter);
        }
    }
}
