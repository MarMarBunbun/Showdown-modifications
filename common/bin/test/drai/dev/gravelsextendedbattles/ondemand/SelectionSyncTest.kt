package drai.dev.gravelsextendedbattles.ondemand

import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionCodePayload
import drai.dev.gravelsextendedbattles.ondemand.sync.SelectionSync
import io.netty.buffer.Unpooled
import net.minecraft.network.FriendlyByteBuf
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class SelectionSyncTest {
    private fun code(g: List<String> = emptyList(), x: List<String> = emptyList()) = Gms3.encode(Gms3.Selection(g, x))

    /** The same selection as [code], written with the lists in another order and a duplicate. */
    private fun scrambled(): String {
        val json = """{"g":["b","a","a"],"x":[]}"""
        return "GMS2." + java.util.Base64.getUrlEncoder().withoutPadding().encodeToString(json.toByteArray())
    }

    @Test
    fun theSameSelection_IsNotWarnedAbout_EvenWrittenDifferently() {
        assertEquals(SelectionSync.Verdict.Same, SelectionSync.check(code(g = listOf("a", "b")), scrambled()))
        assertEquals(SelectionSync.Verdict.Same, SelectionSync.check(scrambled(), code(g = listOf("a", "b"))))
    }

    @Test
    fun aDifferentSelection_Warns() {
        assertEquals(SelectionSync.Verdict.Different, SelectionSync.check(code(g = listOf("a")), code(g = listOf("b"))))
        assertEquals(SelectionSync.Verdict.Different, SelectionSync.check(code(), code(x = listOf("g#a#normal"))))
    }

    @Test
    fun aDamagedCodeFromTheServer_IsIgnored_NotTrusted() {
        for (bad in listOf(null, "", "GMS2.", "GMS2.!!!", "not a code", "GMS2." + "A".repeat(SelectionSync.MAX_CODE_CHARS))) {
            assertEquals(SelectionSync.Verdict.ServerCodeDamaged, SelectionSync.check(bad, code()), bad?.take(20))
        }
    }

    @Test
    fun withoutOurOwnSelection_ThereIsNothingToCompare() {
        assertEquals(SelectionSync.Verdict.NoOwnSelection, SelectionSync.check(code(), ""))
        assertEquals(SelectionSync.Verdict.NoOwnSelection, SelectionSync.check(code(), "GMS2.!!!"))
    }

    @Test
    fun aServerSendsItsCodeCanonically_AndNothingWhenItHasNoValidCode() {
        assertEquals(code(g = listOf("a", "b")), SelectionSync.codeToSend(scrambled()))
        assertNull(SelectionSync.codeToSend(""))
        assertNull(SelectionSync.codeToSend("GMS2.!!!"))
        assertNull(SelectionSync.codeToSend(null))
    }

    @Test
    fun theWarningHasNoCountsOrNames_AndSaysWhereToChangeIt() {
        assertTrue(SelectionSync.MESSAGE.contains("config/gravels-extended-battles.toml"))
        assertTrue(SelectionSync.MESSAGE.contains("selectionCode"))
        assertTrue(SelectionSync.MESSAGE.contains("different Pokemon selection"))
        assertTrue(SelectionSync.MESSAGE.none { it.isDigit() })
    }

    @Test
    fun theLargestCodeFitsInOneClientboundPayload() {
        // Custom payloads from the server are limited to 1 MiB; a code is ASCII, so one byte a character plus the length prefix.
        assertTrue(SelectionSync.MAX_CODE_CHARS + 5 < 1024 * 1024)
    }

    @Test
    fun thePayloadRoundTripsThroughTheCodec() {
        val buffer = FriendlyByteBuf(Unpooled.buffer())
        val sent = SelectionCodePayload(code(g = listOf("a"), x = listOf("sage#foliat#normal")))

        SelectionCodePayload.CODEC.encode(buffer, sent)
        val received = SelectionCodePayload.CODEC.decode(buffer)

        assertEquals(sent.code, received.code)
        assertEquals("geb:selection_code", SelectionCodePayload.TYPE.id().toString())
    }

    @Test
    fun theCodecRefusesACodeLongerThanTheLimit() {
        val buffer = FriendlyByteBuf(Unpooled.buffer())

        assertThrows(Exception::class.java) {
            SelectionCodePayload.CODEC.encode(buffer, SelectionCodePayload("A".repeat(SelectionSync.MAX_CODE_CHARS + 1)))
        }
    }
}
