package drai.dev.gravelsextendedbattles.data.provider

import com.cobblemon.mod.common.block.TypeGemClusterBlock
import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import drai.dev.gravelsextendedbattles.registries.GEBItems
import net.fabricmc.fabric.api.datagen.v1.FabricDataOutput
import net.fabricmc.fabric.api.datagen.v1.provider.FabricBlockLootTableProvider
import net.minecraft.advancements.critereon.*
import net.minecraft.core.HolderLookup
import net.minecraft.core.registries.Registries
import net.minecraft.world.item.Item
import net.minecraft.world.item.enchantment.Enchantments
import net.minecraft.world.level.block.Block
import net.minecraft.world.level.storage.loot.IntRange
import net.minecraft.world.level.storage.loot.LootPool
import net.minecraft.world.level.storage.loot.LootTable
import net.minecraft.world.level.storage.loot.entries.AlternativesEntry
import net.minecraft.world.level.storage.loot.entries.LootItem
import net.minecraft.world.level.storage.loot.functions.ApplyBonusCount
import net.minecraft.world.level.storage.loot.functions.ApplyExplosionDecay
import net.minecraft.world.level.storage.loot.functions.LimitCount
import net.minecraft.world.level.storage.loot.functions.SetItemCountFunction
import net.minecraft.world.level.storage.loot.predicates.LootItemBlockStatePropertyCondition
import net.minecraft.world.level.storage.loot.predicates.MatchTool
import net.minecraft.world.level.storage.loot.providers.number.ConstantValue
import net.minecraft.world.level.storage.loot.providers.number.UniformGenerator
import java.util.concurrent.CompletableFuture

class GEBTypeGemsLootTableProvider(
    dataOutput: FabricDataOutput,
    val registryLookup: CompletableFuture<HolderLookup.Provider>
) : FabricBlockLootTableProvider(dataOutput, registryLookup) {

    override fun getName(): String? {
        return "Type Gems Loot Tables"
    }

    override fun generate() {
        val lookup = registryLookup.join()

        val enchantments = lookup.lookupOrThrow(Registries.ENCHANTMENT)
        val silkTouch = enchantments.getOrThrow(Enchantments.SILK_TOUCH)
        val fortune = enchantments.getOrThrow(Enchantments.FORTUNE)

        GEBBlocks.typeGemBlocks.values.forEach { block ->
            val gem = BLOCK_TO_GEM[block] ?: return@forEach

            add(
                block,
                LootTable.lootTable().withPool(
                    LootPool.lootPool().add(
                        AlternativesEntry.alternatives(
                            LootItem.lootTableItem(block).`when`(
                                MatchTool.toolMatches(
                                    ItemPredicate.Builder.item()
                                        .withSubPredicate(
                                            ItemSubPredicates.ENCHANTMENTS,
                                            ItemEnchantmentsPredicate.enchantments(
                                                listOf(
                                                    EnchantmentPredicate(
                                                        silkTouch,
                                                        MinMaxBounds.Ints.atLeast(1)
                                                    )
                                                )
                                            ),
                                        )
                                )
                            ),
                            LootItem.lootTableItem(gem)
                                .apply(
                                    SetItemCountFunction.setCount(
                                        UniformGenerator.between(1f, 2f)
                                    )
                                )
                                .apply(
                                    ApplyBonusCount.addOreBonusCount(fortune)
                                )
                                .apply(
                                    LimitCount.limitCount(IntRange.upperBound(4))
                                )
                                .apply(
                                    ApplyExplosionDecay.explosionDecay()
                                )
                        )
                    )
                )
            )
        }

        GEBBlocks.typeGemClusters.values.forEach { cluster ->
            val gem = CLUSTER_TO_GEM[cluster] ?: return@forEach

            add(
                cluster,
                LootTable.lootTable().withPool(
                    LootPool.lootPool().add(
                        AlternativesEntry.alternatives(
                            LootItem.lootTableItem(cluster).`when`(
                                MatchTool.toolMatches(
                                    ItemPredicate.Builder.item()
                                        .withSubPredicate(
                                            ItemSubPredicates.ENCHANTMENTS,
                                            ItemEnchantmentsPredicate.enchantments(
                                                listOf(
                                                    EnchantmentPredicate(
                                                        silkTouch,
                                                        MinMaxBounds.Ints.atLeast(1)
                                                    )
                                                )
                                            ),
                                        )
                                )
                            ),
                            LootItem.lootTableItem(gem).`when`(
                                LootItemBlockStatePropertyCondition
                                    .hasBlockStateProperties(cluster)
                                    .setProperties(
                                        StatePropertiesPredicate.Builder.properties()
                                            .hasProperty(TypeGemClusterBlock.STAGE, 3)
                                    )
                            )
                                .apply(
                                    SetItemCountFunction.setCount(
                                        UniformGenerator.between(2f, 3f)
                                    )
                                )
                                .apply(
                                    ApplyBonusCount.addOreBonusCount(fortune)
                                )
                                .apply(
                                    LimitCount.limitCount(IntRange.upperBound(4))
                                )
                                .apply(
                                    ApplyExplosionDecay.explosionDecay()
                                ),
                            LootItem.lootTableItem(gem)
                                .apply(
                                    SetItemCountFunction.setCount(
                                        ConstantValue.exactly(1f)
                                    )
                                )
                                .apply(
                                    ApplyExplosionDecay.explosionDecay()
                                )
                        )
                    )
                )
            )
        }
    }

    companion object {
        val BLOCK_TO_GEM: Map<Block, Item> by lazy {
            mapOf(
                GEBBlocks.BLOOD_GEM_BLOCK to requireNotNull(GEBItems.BLOOD_GEM),
                GEBBlocks.COSMIC_GEM_BLOCK to requireNotNull(GEBItems.COSMIC_GEM),
                GEBBlocks.CRYSTAL_GEM_BLOCK to requireNotNull(GEBItems.CRYSTAL_GEM),
                GEBBlocks.DIGITAL_GEM_BLOCK to requireNotNull(GEBItems.DIGITAL_GEM),
                GEBBlocks.ELDRITCH_GEM_BLOCK to requireNotNull(GEBItems.ELDRITCH_GEM),
                GEBBlocks.LIGHT_GEM_BLOCK to requireNotNull(GEBItems.LIGHT_GEM),
                GEBBlocks.MYSTERY_GEM_BLOCK to requireNotNull(GEBItems.MYSTERY_GEM),
                GEBBlocks.NUCLEAR_GEM_BLOCK to requireNotNull(GEBItems.NUCLEAR_GEM),
                GEBBlocks.PLASTIC_GEM_BLOCK to requireNotNull(GEBItems.PLASTIC_GEM),
                GEBBlocks.SHADOW_GEM_BLOCK to requireNotNull(GEBItems.SHADOW_GEM),
                GEBBlocks.SLIME_GEM_BLOCK to requireNotNull(GEBItems.SLIME_GEM),
                GEBBlocks.SOUND_GEM_BLOCK to requireNotNull(GEBItems.SOUND_GEM),
                GEBBlocks.WIND_GEM_BLOCK to requireNotNull(GEBItems.WIND_GEM)
            )
        }

        val CLUSTER_TO_GEM: Map<Block, Item> by lazy {
            mapOf(
                GEBBlocks.BLOOD_GEM_CLUSTER to requireNotNull(GEBItems.BLOOD_GEM),
                GEBBlocks.COSMIC_GEM_CLUSTER to requireNotNull(GEBItems.COSMIC_GEM),
                GEBBlocks.CRYSTAL_GEM_CLUSTER to requireNotNull(GEBItems.CRYSTAL_GEM),
                GEBBlocks.DIGITAL_GEM_CLUSTER to requireNotNull(GEBItems.DIGITAL_GEM),
                GEBBlocks.ELDRITCH_GEM_CLUSTER to requireNotNull(GEBItems.ELDRITCH_GEM),
                GEBBlocks.LIGHT_GEM_CLUSTER to requireNotNull(GEBItems.LIGHT_GEM),
                GEBBlocks.MYSTERY_GEM_CLUSTER to requireNotNull(GEBItems.MYSTERY_GEM),
                GEBBlocks.NUCLEAR_GEM_CLUSTER to requireNotNull(GEBItems.NUCLEAR_GEM),
                GEBBlocks.PLASTIC_GEM_CLUSTER to requireNotNull(GEBItems.PLASTIC_GEM),
                GEBBlocks.SHADOW_GEM_CLUSTER to requireNotNull(GEBItems.SHADOW_GEM),
                GEBBlocks.SLIME_GEM_CLUSTER to requireNotNull(GEBItems.SLIME_GEM),
                GEBBlocks.SOUND_GEM_CLUSTER to requireNotNull(GEBItems.SOUND_GEM),
                GEBBlocks.WIND_GEM_CLUSTER to requireNotNull(GEBItems.WIND_GEM)
            )
        }
    }

}