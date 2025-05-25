package drai.dev.gravelsextendedbattles.fabric.datagen;

import drai.dev.gravelsextendedbattles.registries.*;
import net.fabricmc.fabric.api.datagen.v1.*;
import net.fabricmc.fabric.api.datagen.v1.provider.*;
import net.minecraft.core.*;
import net.minecraft.data.models.model.*;
import net.minecraft.world.item.*;
import org.apache.commons.lang3.*;

import java.nio.file.*;
import java.util.concurrent.*;
import java.util.function.*;

public class LanguageGenerator extends FabricLanguageProvider {

    protected LanguageGenerator(FabricDataOutput dataOutput, CompletableFuture<HolderLookup.Provider> registryLookup) {
        super(dataOutput, registryLookup);
    };

    public static String capitalizeWords(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1));
            }
            if (i < words.length - 1) {
                result.append(" ");
            }
        }

        return result.toString();
    }

    @Override
    public void generateTranslations(HolderLookup.Provider provider, TranslationBuilder translationBuilder) {
        for (Supplier<Item> value : GravelsExtendedBattlesItems.GEMS) {
            if(value == GravelsExtendedBattlesItems.QUESTIONMARK_GEM) {
                translationBuilder.add(value.get(), "Mystery Gem");
                continue;
            }
            String itemName = value.get().getDescriptionId().replace("item.gravels_extended_battles.", "");
            translationBuilder.add(value.get(), capitalizeWords(itemName.replace("_", " ")));
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.MEMORIES) {
            if(value == GravelsExtendedBattlesItems.QUESTIONMARK_MEMORY) {
                translationBuilder.add(value.get(), "Mystery Memory");
                continue;
            }
            String itemName = value.get().getDescriptionId().replace("item.gravels_extended_battles.", "");
            translationBuilder.add(value.get(), capitalizeWords(itemName.replace("_", " ")));
            var typeName = StringUtils.capitalize(itemName.replace("_gem", ""));
            translationBuilder.add("tooltip.gravels_extended_battles." + itemName + ".tooltip",
                    "A disc with "+typeName+"-type data. It changes Silvally's type.");
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.Z_CRYSTALS.keySet()) {
            String itemName = value.get().getDescriptionId().replace("item.gravels_extended_battles.", "");
            translationBuilder.add(value.get(), capitalizeWords(itemName.replace("_", " ")));
            var typeName = StringUtils.capitalize(itemName.replace("_gem", ""));
            translationBuilder.add("tooltip.gravels_extended_battles." + itemName + ".tooltip",
                    "Z-Crystal associated with the "+typeName+" type and allows Pokémon to upgrade their "+typeName+"-type moves to Z-Moves.");
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.PLATES) {
            if(value == GravelsExtendedBattlesItems.QUESTIONMARK_PLATE) {
                translationBuilder.add(value.get(), "Mystery Plate");
                continue;
            }
            String itemName = value.get().getDescriptionId().replace("item.gravels_extended_battles.", "");
            translationBuilder.add(value.get(), capitalizeWords(itemName.replace("_", " ")));
            var typeName = StringUtils.capitalize(itemName.replace("_gem", ""));
            translationBuilder.add("tooltip.gravels_extended_battles." + itemName + ".tooltip",
                    "A tablet that raises the power of "+typeName+"-type moves. When held by Arceus, it changes to the "+typeName+" type.");
        }

        for (Supplier<Item> value : GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.values()) {
            if(value == GravelsExtendedBattlesItems.QUESTIONMARK_TERA_SHARD) {
                translationBuilder.add(value.get(), "Mystery Tera Shard");
                continue;
            }
            translationBuilder.add(value.get(), capitalizeWords(value.get().getDescriptionId().replace("item.gravels_extended_battles.", "").replace("_", " ")));
        }

//        try {
//            Path existingFilePath = dataOutput.getModContainer().findPath("assets/gravels_extended_battles/lang/en_us.json").get();
//            translationBuilder.add(existingFilePath);
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to add existing language file!", e);
//        }
    }
}
