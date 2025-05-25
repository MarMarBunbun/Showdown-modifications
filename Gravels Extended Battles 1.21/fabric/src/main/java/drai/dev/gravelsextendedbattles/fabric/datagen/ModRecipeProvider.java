package drai.dev.gravelsextendedbattles.fabric.datagen;

import com.cobblemon.mod.common.*;
import com.cobblemon.mod.common.api.tags.*;
import com.cobblemon.yajatkaul.mega_showdown.item.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.datagen.v1.*;
import net.fabricmc.fabric.api.datagen.v1.provider.*;
import net.minecraft.core.*;
import net.minecraft.data.recipes.*;
import net.minecraft.tags.*;
import net.minecraft.world.item.*;
import net.minecraft.world.item.crafting.*;

import java.util.concurrent.*;
import java.util.function.*;

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
