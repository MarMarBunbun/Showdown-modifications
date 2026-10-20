package drai.dev.gravelsextendedbattles.ondemand.sync

import net.minecraft.network.FriendlyByteBuf
import net.minecraft.network.codec.StreamCodec
import net.minecraft.network.protocol.common.custom.CustomPacketPayload
import net.minecraft.resources.ResourceLocation

/** Server to client, once on join: the `GMS3.` code the server runs with. See [SelectionSync]. */
class SelectionCodePayload(val code: String) : CustomPacketPayload {
    override fun type(): CustomPacketPayload.Type<SelectionCodePayload> = TYPE

    companion object {
        @JvmField
        val TYPE: CustomPacketPayload.Type<SelectionCodePayload> =
            CustomPacketPayload.Type(ResourceLocation.fromNamespaceAndPath("geb", "selection_code"))

        @JvmField
        val CODEC: StreamCodec<FriendlyByteBuf, SelectionCodePayload> = StreamCodec.of(
            { buffer, payload -> buffer.writeUtf(payload.code, SelectionSync.MAX_CODE_CHARS) },
            { buffer -> SelectionCodePayload(buffer.readUtf(SelectionSync.MAX_CODE_CHARS)) },
        )
    }
}
