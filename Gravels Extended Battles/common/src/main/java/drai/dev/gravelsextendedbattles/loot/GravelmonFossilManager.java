package drai.dev.gravelsextendedbattles.loot;

import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.mixin.loot.*;
import net.minecraft.core.registries.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;
import net.minecraft.world.level.storage.loot.*;
import net.minecraft.world.level.storage.loot.entries.*;

import java.util.*;
import java.util.function.*;

public class GravelmonFossilManager {
    private static final List<LootPool[]> LOOT_POOLS = new ArrayList<>();
    private static final Map<ResourceLocation, List<Supplier<Item>>> LOOT_POOL_ADDITIONS = new HashMap<>();

    public static void addFossil(ResourceLocation lootTableResourceLocation, Supplier<Item> fossil){
        LOOT_POOL_ADDITIONS.computeIfAbsent(lootTableResourceLocation, k -> new ArrayList<>()).add(fossil);
    }

    public static void addFossil(List<ResourceLocation> lootTableResourceLocations, Supplier<Item> fossil){
        for (ResourceLocation lootTableResourceLocation : lootTableResourceLocations) {
            LOOT_POOL_ADDITIONS.computeIfAbsent(lootTableResourceLocation, k -> new ArrayList<>()).add(fossil);
        }
    }

    public static void addLootPools(LootPool[] lootPool){
        LOOT_POOLS.add(lootPool);
    }

    public static void scanLootPools(){
        LOOT_POOLS.forEach(lootPools->Arrays.stream(lootPools).forEach(lootPool -> {
            var accessor = createLootPoolAccessor(lootPool);
            var entries = new ArrayList<>(List.of(accessor.getEntries()));
            new ArrayList<>(entries).stream().filter(lootPoolEntryContainer -> lootPoolEntryContainer.getType()== LootPoolEntries.ITEM).map(entryContainer -> (LootItem) entryContainer)
                    .forEach(lootItem -> {
                        var item = createLootItemAccessor(lootItem).getItem();
                        var itemId = BuiltInRegistries.ITEM.getKey(item);
                        var fossil = GravelsExtendedBattles.FOSSIL_MAP.get(itemId);
                        if(fossil == null) return;
                        if(!SpeciesManager.containsBannedLabels(fossil.getResult().getSpecies(), fossil.getResult().getForm())) return;
                        entries.remove(lootItem);
                    });
            LootPoolEntryContainer[] array = new LootPoolEntryContainer[entries.size()];
            accessor.setEntries(entries.toArray(array));
        }));
    }

    public static LootPoolAccessor createLootPoolAccessor(LootPool lootPool) {
        return (LootPoolAccessor) lootPool;
    }
    public static LootItemAccessor createLootItemAccessor(LootItem lootItem) {
        return (LootItemAccessor) lootItem;
    }

    public static void processFossilAdditions(ResourceLocation id, Consumer<LootPool> tableBuilder) {
        if(LOOT_POOL_ADDITIONS.containsKey(id)){
            LootPool.Builder poolBuilder = new LootPool.Builder();
            LOOT_POOL_ADDITIONS.get(id).forEach(itemSupplier -> poolBuilder.add(LootItem.lootTableItem(itemSupplier.get()).setWeight(2)));
            tableBuilder.accept(poolBuilder.build());
        }
    }

    public static void processFossilAdditions(ResourceLocation id, LootTable.Builder tableBuilder) {
        if(LOOT_POOL_ADDITIONS.containsKey(id)){
            LootPool.Builder poolBuilder = new LootPool.Builder();
            LOOT_POOL_ADDITIONS.get(id).forEach(itemSupplier -> poolBuilder.add(LootItem.lootTableItem(itemSupplier.get()).setWeight(2)));
            tableBuilder.withPool(poolBuilder);
        }
    }


}