package drai.dev.gravelsextendedbattles.loot;

import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.mixin.loot.*;
import net.minecraft.core.*;
import net.minecraft.core.registries.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;
import net.minecraft.world.level.storage.loot.*;
import net.minecraft.world.level.storage.loot.entries.*;

import java.util.*;
import java.util.function.*;

public class GravelmonFossilManager {
    private static final List<LootPool[]> LOOT_POOLS = new ArrayList<>();
    private static final Map<ResourceLocation, List<Supplier<Item>>> FOSSIL_LOOT_POOL_ADDITIONS = new HashMap<>();
    public static final Map<ResourceLocation, List<Supplier<Item>>> LOOT_POOL_ADDITIONS = new HashMap<>();

    public static void addFossil(ResourceLocation lootTableResourceLocation, Supplier<Item> fossil){
        FOSSIL_LOOT_POOL_ADDITIONS.computeIfAbsent(lootTableResourceLocation, k -> new ArrayList<>()).add(fossil);
    }

    public static void addFossil(List<ResourceLocation> lootTableResourceLocations, Supplier<Item> fossil){
        for (ResourceLocation lootTableResourceLocation : lootTableResourceLocations) {
            FOSSIL_LOOT_POOL_ADDITIONS.computeIfAbsent(lootTableResourceLocation, k -> new ArrayList<>()).add(fossil);
        }
    }

    public static void addLootPools(LootPool[] lootPool){
        LOOT_POOLS.add(lootPool);
    }

    public static void scanLootPools(){
        LOOT_POOLS.forEach(lootPools->Arrays.stream(lootPools).forEach(lootPool -> {
            var accessor = createLootPoolAccessor(lootPool);
            var entries = new ArrayList<>(accessor.getEntries());
            accessor.getEntries().stream().filter(lootPoolEntryContainer -> lootPoolEntryContainer.getType()== LootPoolEntries.ITEM).map(entryContainer -> (LootItem) entryContainer)
                    .forEach(lootItem -> {
                        var item = createLootItemAccessor(lootItem).getItem();
                        var itemId = BuiltInRegistries.ITEM.getKey(item.value());
                        var fossil = GravelsExtendedBattles.FOSSIL_MAP.get(itemId);
                        if(fossil == null) return;
                        if(!SpeciesManager.containsBannedLabels(fossil.getResult().getSpecies(), fossil.getResult().getForm())) return;
                        entries.remove(lootItem);
                        if (entries.isEmpty()){
                            var optionalFossil = GravelsExtendedBattles.FOSSIL_MAP.values().stream()
                                    .filter(fossil1->!SpeciesManager.containsBannedLabels(fossil1.getResult().getSpecies(), fossil1.getResult().getForm())).findFirst();
                            if(optionalFossil.isEmpty()) return;
                            var fossilItemId = GravelsExtendedBattles.FOSSIL_MAP.entrySet().stream().filter(entry -> entry.getValue() == optionalFossil.get()).map(Map.Entry::getKey).toList();
                            if(fossilItemId.isEmpty()) return;
                            var newFossilItem = BuiltInRegistries.ITEM.get(fossilItemId.getFirst());
                            createLootItemAccessor(lootItem).setItem(new Holder.Direct<>(newFossilItem));
                            entries.add(lootItem);
                        }
                    });
            accessor.setEntries(entries);
        }));
    }

    public static LootPoolAccessor createLootPoolAccessor(LootPool lootPool) {
        return (LootPoolAccessor) lootPool;
    }
    public static LootItemAccessor createLootItemAccessor(LootItem lootItem) {
        return (LootItemAccessor) lootItem;
    }

    public static void processFossilAdditions(ResourceLocation id, Consumer<LootPool> tableBuilder) {
        if(FOSSIL_LOOT_POOL_ADDITIONS.containsKey(id)){
            LootPool.Builder poolBuilder = new LootPool.Builder();
            FOSSIL_LOOT_POOL_ADDITIONS.get(id).forEach(itemSupplier -> poolBuilder.add(LootItem.lootTableItem(itemSupplier.get()).setWeight(2)));
            tableBuilder.accept(poolBuilder.build());
        }
        if(LOOT_POOL_ADDITIONS.containsKey(id)){
            LootPool.Builder poolBuilder = new LootPool.Builder();
        LOOT_POOL_ADDITIONS.get(id).forEach(itemSupplier -> poolBuilder.add(LootItem.lootTableItem(itemSupplier.get()).setWeight(5)));
            tableBuilder.accept(poolBuilder.build());
        }
    }

    public static void processFossilAdditions(ResourceLocation id, LootTable.Builder tableBuilder) {
        if(FOSSIL_LOOT_POOL_ADDITIONS.containsKey(id)){
            LootPool.Builder poolBuilder = new LootPool.Builder();
            FOSSIL_LOOT_POOL_ADDITIONS.get(id).forEach(itemSupplier -> poolBuilder.add(LootItem.lootTableItem(itemSupplier.get()).setWeight(2)));
            tableBuilder.withPool(poolBuilder);
        }
    }
}
