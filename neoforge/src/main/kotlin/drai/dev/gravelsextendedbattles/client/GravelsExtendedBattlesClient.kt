package drai.dev.gravelsextendedbattles.client

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import net.minecraft.client.renderer.ItemBlockRenderTypes
import net.minecraft.client.renderer.RenderType
import net.minecraft.world.level.block.Block
import net.neoforged.api.distmarker.Dist
import net.neoforged.bus.api.SubscribeEvent
import net.neoforged.fml.common.EventBusSubscriber
import net.neoforged.fml.event.lifecycle.FMLClientSetupEvent

@EventBusSubscriber(
    modid = GravelsExtendedBattles.MOD_ID,
    bus = EventBusSubscriber.Bus.MOD,
    value = [Dist.CLIENT]
)
object GravelsExtendedBattlesClient {

    @SubscribeEvent
    @JvmStatic
    fun onClientSetup(event: FMLClientSetupEvent) {
        registerBlockRenderType(RenderType.cutout(), GEBBlocks.FROST_HEAL,
            *GEBBlocks.typeGemClusters.values.toTypedArray())
    }

    fun registerBlockRenderType(layer: RenderType, vararg blocks: Block) {
        blocks.forEach { block ->
            ItemBlockRenderTypes.setRenderLayer(block, layer)
        }
    }
}