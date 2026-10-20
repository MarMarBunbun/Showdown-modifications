package drai.dev.gravelsextendedbattles.client

import drai.dev.gravelsextendedbattles.registries.GEBBlocks
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionCodePayload
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionSyncClient
import net.fabricmc.api.ClientModInitializer
import net.fabricmc.fabric.api.client.networking.v1.ClientPlayNetworking
import net.fabricmc.fabric.api.blockrenderlayer.v1.BlockRenderLayerMap
import net.minecraft.client.renderer.RenderType

object GravelsExtendedBattlesClient: ClientModInitializer  {
    override fun onInitializeClient() {
        // The code a server sends on join, compared with ours (a warning only).
        ClientPlayNetworking.registerGlobalReceiver(SelectionCodePayload.TYPE) { payload, context ->
            context.client().execute { SelectionSyncClient.onServerCode(payload.code) }
        }
        BlockRenderLayerMap.INSTANCE.putBlocks(RenderType.cutout(),
            GEBBlocks.FROST_HEAL,
            *GEBBlocks.typeGemClusters.values.toTypedArray()
        )
    }
}