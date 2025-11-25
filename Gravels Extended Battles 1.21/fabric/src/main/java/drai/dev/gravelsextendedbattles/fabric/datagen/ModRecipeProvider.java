package drai.dev.gravelsextendedbattles.fabric.datagen;

import com.github.yajatkaul.mega_showdown.item.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.datagen.v1.*;
import net.fabricmc.fabric.api.datagen.v1.provider.*;
import net.minecraft.core.*;
import net.minecraft.data.recipes.*;

import java.util.concurrent.*;

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
                    .define('Z', MegaShowdownItems.BLANK_Z.get())
                    .unlockedBy("hasZCrystals", has(MegaShowdownItems.BLANK_Z.get()))
                    .save(exporter);
        }
    }
}
