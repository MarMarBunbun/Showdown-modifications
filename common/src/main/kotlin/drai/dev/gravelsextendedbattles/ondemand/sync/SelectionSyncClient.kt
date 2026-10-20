package drai.dev.gravelsextendedbattles.ondemand.sync

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import net.minecraft.client.Minecraft
import net.minecraft.client.gui.components.toasts.SystemToast
import net.minecraft.network.chat.Component

/** The client half of the join-time warning. Only ever called on a client: it touches `Minecraft`. */
object SelectionSyncClient {
    /** Called on the game thread with the code a server sent. */
    @JvmStatic
    fun onServerCode(serverCode: String) {
        when (SelectionSync.check(serverCode, GravelsExtendedBattles.CONFIG.selectionCode)) {
            SelectionSync.Verdict.Different -> warn()
            SelectionSync.Verdict.ServerCodeDamaged ->
                GravelsExtendedBattles.LOGGER.warn("The server sent a Pokemon selection code that is not valid; it is ignored.")
            SelectionSync.Verdict.NoOwnSelection, SelectionSync.Verdict.Same -> Unit
        }
    }

    private fun warn() {
        val minecraft = Minecraft.getInstance()
        GravelsExtendedBattles.LOGGER.warn(SelectionSync.MESSAGE)
        minecraft.gui.chat.addMessage(Component.literal(SelectionSync.MESSAGE).withStyle(net.minecraft.ChatFormatting.GOLD))
        SystemToast.add(
            minecraft.toasts,
            SystemToast.SystemToastId.PERIODIC_NOTIFICATION,
            Component.literal(SelectionSync.TITLE),
            Component.literal("Your Pokemon selection differs from the server's."),
        )
    }
}
