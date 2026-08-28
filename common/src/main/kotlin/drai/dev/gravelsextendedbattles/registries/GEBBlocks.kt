package drai.dev.gravelsextendedbattles.registries

import com.cobblemon.mod.common.block.StackableItemBlock
import com.cobblemon.mod.common.item.interactive.StatusCureItem
import com.cobblemon.mod.common.platform.PlatformRegistry
import com.cobblemon.mod.common.pokemon.ai.BlockBehavior
import com.cobblemon.mod.common.pokemon.helditem.CobblemonHeldItemManager
import com.cobblemon.mod.common.util.cobblemonResource
import drai.dev.gravelsextendedbattles.additions.status.GravelmonStatus
import drai.dev.gravelsextendedbattles.config.GEBConfig
import drai.dev.gravelsextendedbattles.fossils.GEBLootPoolManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.items.GEBArceusPlateItem
import drai.dev.gravelsextendedbattles.items.GEBMemoryItem
import drai.dev.gravelsextendedbattles.items.GEBTeraShardItem
import drai.dev.gravelsextendedbattles.items.GEBZCrystal
import net.minecraft.core.Registry
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceKey
import net.minecraft.world.item.Item
import net.minecraft.world.level.block.Block
import net.minecraft.world.level.block.SoundType
import net.minecraft.world.level.block.state.BlockBehaviour
import net.minecraft.world.level.material.MapColor

object GEBBlocks : PlatformRegistry<Registry<Block>, ResourceKey<Registry<Block>>, Block>() {
    private val teraShardsByType = mutableMapOf<String, Item>()
    override val registry: Registry<Block> = BuiltInRegistries.BLOCK
    override val resourceKey: ResourceKey<Registry<Block>> = Registries.BLOCK

    val FROST_HEAL = StackableItemBlock(BlockBehaviour.Properties.of().sound(SoundType.CANDLE).mapColor(MapColor.NONE).noOcclusion(), StackableItemBlock.StackableItemBlockType.STATUS_RESTORE)

}