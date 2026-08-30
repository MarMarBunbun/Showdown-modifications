package drai.dev.gravelsextendedbattles.registries

import com.cobblemon.mod.common.CobblemonBlocks
import com.cobblemon.mod.common.CobblemonSounds
import com.cobblemon.mod.common.block.StackableItemBlock
import com.cobblemon.mod.common.block.TypeGemClusterBlock
import com.cobblemon.mod.common.platform.PlatformRegistry
import com.cobblemon.mod.common.util.cobblemonResource
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.mixin.accessors.CobblemonBlocksAccessor
import net.minecraft.core.Registry
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceKey
import net.minecraft.resources.ResourceLocation
import net.minecraft.world.level.block.Block
import net.minecraft.world.level.block.SoundType
import net.minecraft.world.level.block.state.BlockBehaviour
import net.minecraft.world.level.material.MapColor
import net.minecraft.world.level.material.PushReaction
import kotlin.collections.set

object GEBBlocks : PlatformRegistry<Registry<Block>, ResourceKey<Registry<Block>>, Block>() {
    val typeGemClusters = mutableMapOf<ResourceLocation, Block>()
    val typeGemBlocks = mutableMapOf<ResourceLocation, Block>()
    override val registry: Registry<Block> = BuiltInRegistries.BLOCK
    override val resourceKey: ResourceKey<Registry<Block>> = Registries.BLOCK

    val BLOOD_GEM_BLOCK = typeGemBlock("blood_gem_block", MapColor.COLOR_RED )
    val COSMIC_GEM_BLOCK = typeGemBlock("cosmic_gem_block", MapColor.COLOR_PURPLE )
    val CRYSTAL_GEM_BLOCK = typeGemBlock("crystal_gem_block", MapColor.COLOR_LIGHT_BLUE )
    val DIGITAL_GEM_BLOCK = typeGemBlock("digital_gem_block", MapColor.COLOR_GREEN )
    val ELDRITCH_GEM_BLOCK = typeGemBlock("eldritch_gem_block", MapColor.CRIMSON_NYLIUM )
    val LIGHT_GEM_BLOCK = typeGemBlock("light_gem_block", MapColor.QUARTZ )
    val MYSTERY_GEM_BLOCK = typeGemBlock("mystery_gem_block", MapColor.COLOR_CYAN )
    val NUCLEAR_GEM_BLOCK = typeGemBlock("nuclear_gem_block", MapColor.COLOR_LIGHT_GREEN )
    val PLASTIC_GEM_BLOCK = typeGemBlock("plastic_gem_block", MapColor.COLOR_ORANGE )
    val SHADOW_GEM_BLOCK = typeGemBlock("shadow_gem_block", MapColor.COLOR_PURPLE )
    val SLIME_GEM_BLOCK = typeGemBlock("slime_gem_block", MapColor.COLOR_LIGHT_GREEN )
    val SOUND_GEM_BLOCK = typeGemBlock("sound_gem_block", MapColor.COLOR_LIGHT_GRAY )
    val WIND_GEM_BLOCK = typeGemBlock("wind_gem_block", MapColor.COLOR_LIGHT_BLUE )
    
    val BLOOD_GEM_CLUSTER = typeGemCluster("blood_gem_cluster", BLOOD_GEM_BLOCK, gravelmonResource("blood_gem"), MapColor.COLOR_RED )
    val COSMIC_GEM_CLUSTER = typeGemCluster("cosmic_gem_cluster", COSMIC_GEM_BLOCK, gravelmonResource("cosmic_gem"), MapColor.COLOR_PURPLE )
    val CRYSTAL_GEM_CLUSTER = typeGemCluster("crystal_gem_cluster", CRYSTAL_GEM_BLOCK, gravelmonResource("crystal_gem"), MapColor.COLOR_LIGHT_BLUE )
    val DIGITAL_GEM_CLUSTER = typeGemCluster("digital_gem_cluster", DIGITAL_GEM_BLOCK, gravelmonResource("digital_gem"), MapColor.COLOR_GREEN )
    val ELDRITCH_GEM_CLUSTER = typeGemCluster("eldritch_gem_cluster", ELDRITCH_GEM_BLOCK, gravelmonResource("eldritch_gem"), MapColor.CRIMSON_NYLIUM )
    val LIGHT_GEM_CLUSTER = typeGemCluster("light_gem_cluster", LIGHT_GEM_BLOCK, gravelmonResource("light_gem"), MapColor.QUARTZ )
    val MYSTERY_GEM_CLUSTER = typeGemCluster("mystery_gem_cluster", MYSTERY_GEM_BLOCK, gravelmonResource("mystery_gem"), MapColor.COLOR_CYAN )
    val NUCLEAR_GEM_CLUSTER = typeGemCluster("nuclear_gem_cluster", NUCLEAR_GEM_BLOCK, gravelmonResource("nuclear_gem"), MapColor.COLOR_LIGHT_GREEN )
    val PLASTIC_GEM_CLUSTER = typeGemCluster("plastic_gem_cluster", PLASTIC_GEM_BLOCK, gravelmonResource("plastic_gem"), MapColor.COLOR_ORANGE )
    val SHADOW_GEM_CLUSTER = typeGemCluster("shadow_gem_cluster", SHADOW_GEM_BLOCK, gravelmonResource("shadow_gem"), MapColor.COLOR_PURPLE )
    val SLIME_GEM_CLUSTER = typeGemCluster("slime_gem_cluster", SLIME_GEM_BLOCK, gravelmonResource("slime_gem"), MapColor.COLOR_LIGHT_GREEN )
    val SOUND_GEM_CLUSTER = typeGemCluster("sound_gem_cluster", SOUND_GEM_BLOCK, gravelmonResource("sound_gem"), MapColor.COLOR_LIGHT_GRAY )
    val WIND_GEM_CLUSTER = typeGemCluster("wind_gem_cluster", WIND_GEM_BLOCK, gravelmonResource("wind_gem"), MapColor.COLOR_LIGHT_BLUE )
    
    val FROST_HEAL = create(gravelmonResource("frost_heal"), StackableItemBlock(BlockBehaviour.Properties.of().sound(SoundType.CANDLE).mapColor(MapColor.NONE).noOcclusion(), StackableItemBlock.StackableItemBlockType.STATUS_RESTORE))

    private fun typeGemBlock(name: String, mapColor: MapColor): Block {
        val resourceLocation = gravelmonResource(name)
        val typeGemBlock = this.create(resourceLocation, Block(BlockBehaviour.Properties.of().mapColor(mapColor).strength(3.0F, 6.0F).sound(CobblemonSounds.TYPE_GEM_BLOCK_SOUNDS)))

        typeGemBlocks[resourceLocation] = typeGemBlock
        CobblemonBlocksAccessor.getTypeGemBlocks()[resourceLocation] = typeGemBlock

        return typeGemBlock
    }

    private fun typeGemCluster(name: String, gemBlock: Block, dropItemId: ResourceLocation, mapColor: MapColor): Block {
        val resourceLocation = gravelmonResource(name)
        val gemClusterBlock = this.create(resourceLocation, TypeGemClusterBlock(BlockBehaviour.Properties.of().mapColor(mapColor).strength(2.0F, 3.0F).sound(CobblemonSounds.TYPE_GEM_CLUSTER_SOUNDS).pushReaction(PushReaction.DESTROY), gemBlock, dropItemId))


        TypeGemClusterBlock.gemToClusterMap[gemBlock] = gemClusterBlock

        typeGemBlocks[resourceLocation] = gemClusterBlock
        CobblemonBlocksAccessor.getTypeGemClusters()[resourceLocation] = gemClusterBlock

        return gemClusterBlock
    }
}