package drai.dev.gravelsextendedbattles.registries

import com.cobblemon.mod.common.CobblemonBlocks
import com.cobblemon.mod.common.CobblemonSounds
import com.cobblemon.mod.common.block.BerryBlock
import com.cobblemon.mod.common.block.StackableItemBlock
import com.cobblemon.mod.common.block.TypeGemClusterBlock
import com.cobblemon.mod.common.platform.PlatformRegistry
import com.cobblemon.mod.common.util.cobblemonResource
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.mixin.accessors.CobblemonBlocksAccessor
import net.minecraft.core.Registry
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceKey
import net.minecraft.resources.ResourceLocation
import net.minecraft.world.level.block.Block
import net.minecraft.world.level.block.Blocks
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

    val BLOOD_GEM_BLOCK = typeGemBlock("blood", MapColor.COLOR_RED )
    val COSMIC_GEM_BLOCK = typeGemBlock("cosmic", MapColor.COLOR_PURPLE )
    val CRYSTAL_GEM_BLOCK = typeGemBlock("crystal", MapColor.COLOR_LIGHT_BLUE )
    val DIGITAL_GEM_BLOCK = typeGemBlock("digital", MapColor.COLOR_GREEN )
    val ELDRITCH_GEM_BLOCK = typeGemBlock("eldritch", MapColor.CRIMSON_NYLIUM )
    val LIGHT_GEM_BLOCK = typeGemBlock("light", MapColor.QUARTZ )
    val MYSTERY_GEM_BLOCK = typeGemBlock("mystery", MapColor.COLOR_CYAN )
    val NUCLEAR_GEM_BLOCK = typeGemBlock("nuclear", MapColor.COLOR_LIGHT_GREEN )
    val PLASTIC_GEM_BLOCK = typeGemBlock("plastic", MapColor.COLOR_ORANGE )
    val SHADOW_GEM_BLOCK = typeGemBlock("shadow", MapColor.COLOR_PURPLE )
    val SLIME_GEM_BLOCK = typeGemBlock("slime", MapColor.COLOR_LIGHT_GREEN )
    val SOUND_GEM_BLOCK = typeGemBlock("sound", MapColor.COLOR_LIGHT_GRAY )
    val WIND_GEM_BLOCK = typeGemBlock("wind", MapColor.COLOR_LIGHT_BLUE )
    
    val BLOOD_GEM_CLUSTER = typeGemCluster("blood", BLOOD_GEM_BLOCK, gravelmonResource("blood_gem"), MapColor.COLOR_RED )
    val COSMIC_GEM_CLUSTER = typeGemCluster("cosmic", COSMIC_GEM_BLOCK, gravelmonResource("cosmic_gem"), MapColor.COLOR_PURPLE )
    val CRYSTAL_GEM_CLUSTER = typeGemCluster("crystal", CRYSTAL_GEM_BLOCK, gravelmonResource("crystal_gem"), MapColor.COLOR_LIGHT_BLUE )
    val DIGITAL_GEM_CLUSTER = typeGemCluster("digital", DIGITAL_GEM_BLOCK, gravelmonResource("digital_gem"), MapColor.COLOR_GREEN )
    val ELDRITCH_GEM_CLUSTER = typeGemCluster("eldritch", ELDRITCH_GEM_BLOCK, gravelmonResource("eldritch_gem"), MapColor.CRIMSON_NYLIUM )
    val LIGHT_GEM_CLUSTER = typeGemCluster("light", LIGHT_GEM_BLOCK, gravelmonResource("light_gem"), MapColor.QUARTZ )
    val MYSTERY_GEM_CLUSTER = typeGemCluster("mystery", MYSTERY_GEM_BLOCK, gravelmonResource("mystery_gem"), MapColor.COLOR_CYAN )
    val NUCLEAR_GEM_CLUSTER = typeGemCluster("nuclear", NUCLEAR_GEM_BLOCK, gravelmonResource("nuclear_gem"), MapColor.COLOR_LIGHT_GREEN )
    val PLASTIC_GEM_CLUSTER = typeGemCluster("plastic", PLASTIC_GEM_BLOCK, gravelmonResource("plastic_gem"), MapColor.COLOR_ORANGE )
    val SHADOW_GEM_CLUSTER = typeGemCluster("shadow", SHADOW_GEM_BLOCK, gravelmonResource("shadow_gem"), MapColor.COLOR_PURPLE )
    val SLIME_GEM_CLUSTER = typeGemCluster("slime", SLIME_GEM_BLOCK, gravelmonResource("slime_gem"), MapColor.COLOR_LIGHT_GREEN )
    val SOUND_GEM_CLUSTER = typeGemCluster("sound", SOUND_GEM_BLOCK, gravelmonResource("sound_gem"), MapColor.COLOR_LIGHT_GRAY )
    val WIND_GEM_CLUSTER = typeGemCluster("wind", WIND_GEM_BLOCK, gravelmonResource("wind_gem"), MapColor.COLOR_LIGHT_BLUE )

//    val AVOCA_BERRY = berryBlock("avoca")
//    val BENASI_BERRY = berryBlock("benasi")
//    val CARABA_BERRY = berryBlock("caraba")
//    val CHUVA_BERRY = berryBlock("chuva")
//    val DRASH_BERRY = berryBlock("drash")
//    val JIMACA_BERRY = berryBlock("jimaca")
//    val MELIRUN_BERRY = berryBlock("melirun")
//    val NINIKU_BERRY = berryBlock("niniku")
//    val OKAB_BERRY = berryBlock("okab")
//    val TABAKO_BERRY = berryBlock("tabako")
//    val TUNAB_BERRY = berryBlock("tunab")
//    val VALUM_BERRY = berryBlock("valum")
//    val HAFLI_BERRY = berryBlock("hafli")

    private fun berryBlock(name: String): BerryBlock {
        val identifier = gravelmonResource("${name}_berry")
        val block = this.create(identifier.path, BerryBlock(identifier, BlockBehaviour.Properties.ofFullCopy(Blocks.WHEAT).dynamicShape().sound(CobblemonSounds.BERRY_BUSH_SOUNDS).strength(0.2F)))
        CobblemonBlocksAccessor.getBerries()[identifier] = block
        return block
    }
    
    val FROST_HEAL = create(gravelmonResource("frost_heal"), StackableItemBlock(BlockBehaviour.Properties.of().sound(SoundType.CANDLE).mapColor(MapColor.NONE).noOcclusion(), StackableItemBlock.StackableItemBlockType.STATUS_RESTORE))


    private fun typeGemBlock(name: String, mapColor: MapColor): Block {
        val resourceLocation = gravelmonResource(name+"_gem_block")
        val typeGemBlock = this.create(resourceLocation, Block(BlockBehaviour.Properties.of().mapColor(mapColor).strength(3.0F, 6.0F).sound(CobblemonSounds.TYPE_GEM_BLOCK_SOUNDS)))
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(name)) return typeGemBlock

        typeGemBlocks[resourceLocation] = typeGemBlock
        CobblemonBlocksAccessor.getTypeGemBlocks()[resourceLocation] = typeGemBlock

        return typeGemBlock
    }

    private fun typeGemCluster(name: String, gemBlock: Block, dropItemId: ResourceLocation, mapColor: MapColor): Block {
        val resourceLocation = gravelmonResource(name+"_gem_cluster")
        val gemClusterBlock = this.create(resourceLocation, TypeGemClusterBlock(BlockBehaviour.Properties.of().mapColor(mapColor).strength(2.0F, 3.0F).sound(CobblemonSounds.TYPE_GEM_CLUSTER_SOUNDS).pushReaction(PushReaction.DESTROY), gemBlock, dropItemId))
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(name)) return gemClusterBlock

        TypeGemClusterBlock.gemToClusterMap[gemBlock] = gemClusterBlock

        typeGemClusters[resourceLocation] = gemClusterBlock
        CobblemonBlocksAccessor.getTypeGemClusters()[resourceLocation] = gemClusterBlock

        return gemClusterBlock
    }
}