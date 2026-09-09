package drai.dev.gravelsextendedbattles.fossils

import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.mixin.accessors.LootItemAccessor
import drai.dev.gravelsextendedbattles.mixin.accessors.LootPoolAccessor
import net.minecraft.core.Holder
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.resources.ResourceLocation
import net.minecraft.world.item.Item
import net.minecraft.world.level.storage.loot.LootPool
import net.minecraft.world.level.storage.loot.LootTable
import net.minecraft.world.level.storage.loot.entries.LootItem
import net.minecraft.world.level.storage.loot.entries.LootPoolEntries
import net.minecraft.world.level.storage.loot.entries.LootPoolEntryContainer
import java.util.*
import java.util.function.Consumer

object GEBLootPoolManager {
    private val lootPools: MutableList<Array<LootPool>> = ArrayList()
    private val fossilLootPoolAdditions: MutableMap<ResourceLocation, MutableList<Item>> = HashMap()
    val lootPoolAdditions: MutableMap<ResourceLocation, MutableList<Item>> = HashMap()

    fun addUncommonItemToLootPool(lootTableResourceLocation: ResourceLocation, item: Item) = fossilLootPoolAdditions.computeIfAbsent(lootTableResourceLocation) { arrayListOf() }.add(item)
    fun addLootPools(lootPool: Array<LootPool>) = lootPools.add(lootPool)

    fun scanLootPools() {
        lootPools.forEach(Consumer { lootPools: Array<LootPool> ->
            Arrays.stream(lootPools).forEach { lootPool: LootPool ->
                val accessor: LootPoolAccessor = createLootPoolAccessor(lootPool)
                val entries: ArrayList<LootPoolEntryContainer> = ArrayList(accessor.getEntries())
                accessor.getEntries().stream()
                    .filter { lootPoolEntryContainer -> lootPoolEntryContainer.type === LootPoolEntries.ITEM }
                    .map { entryContainer -> entryContainer as LootItem }
                    .forEach { lootItem ->
                        val item =
                            createLootItemAccessor(lootItem)
                                .getItem()
                        val itemId = BuiltInRegistries.ITEM.getKey(item.value())
                        val fossil = GravelsExtendedBattles.fossils[itemId] ?: return@forEach
                        if (!BanListManager.pokemonShouldBeRemoved(fossil.result)) return@forEach
                        entries.remove(lootItem)
                        if (entries.isEmpty()) {
                            val optionalFossil =
                                GravelsExtendedBattles.fossils.values.stream()
                                    .filter { fossil1 -> !BanListManager.pokemonShouldBeRemoved(fossil1.result) }
                                    .findFirst()
                            if (optionalFossil.isEmpty) return@forEach
                            val fossilItemId = GravelsExtendedBattles.fossils.entries.stream()
                                .filter { entry -> entry.value === optionalFossil.get() }
                                .map { entry -> entry.key }.toList()
                            if (fossilItemId.isEmpty()) return@forEach
                            val newFossilItem: Item = BuiltInRegistries.ITEM.get(fossilItemId.first())
                            createLootItemAccessor(lootItem).setItem(Holder.Direct(newFossilItem))
                            entries.add(lootItem)
                        }
                    }
                accessor.setEntries(entries)
            }
        })
    }
    
    fun processFossilAdditions(id: ResourceLocation?, tableBuilder: Consumer<LootPool?>) {
        if (fossilLootPoolAdditions.containsKey(id)) {
            val poolBuilder = LootPool.Builder()
            fossilLootPoolAdditions[id]?.forEach(Consumer { item -> poolBuilder.add(LootItem.lootTableItem(item).setWeight(2)) })
            tableBuilder.accept(poolBuilder.build())
        }
        if (lootPoolAdditions.containsKey(id)) {
            val poolBuilder = LootPool.Builder()
            lootPoolAdditions[id]?.forEach(Consumer { item -> poolBuilder.add(LootItem.lootTableItem(item).setWeight(5)) })
            tableBuilder.accept(poolBuilder.build())
        }
    }

    fun processFossilAdditions(id: ResourceLocation, tableBuilder: LootTable.Builder) {
        if (fossilLootPoolAdditions.containsKey(id)) {
            val poolBuilder = LootPool.Builder()
            fossilLootPoolAdditions[id]?.forEach(Consumer { item -> poolBuilder.add(LootItem.lootTableItem(item).setWeight(2)) })
            tableBuilder.withPool(poolBuilder)
        }
    }

    fun createLootPoolAccessor(lootPool: LootPool) = lootPool as LootPoolAccessor
    fun createLootItemAccessor(lootItem: LootItem) = lootItem as LootItemAccessor
}