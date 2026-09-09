package drai.dev.gravelsextendedbattles.client

import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import net.fabricmc.api.ClientModInitializer
import net.fabricmc.fabric.api.blockrenderlayer.v1.BlockRenderLayerMap
import net.minecraft.client.renderer.RenderType

object GravelsExtendedBattlesClient: ClientModInitializer  {
    override fun onInitializeClient() {
        BlockRenderLayerMap.INSTANCE.putBlocks(RenderType.cutout(),
            GEBBlocks.FROST_HEAL,
            *GEBBlocks.typeGemClusters.values.toTypedArray()
        )
    }
}