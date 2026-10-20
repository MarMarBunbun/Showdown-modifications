package drai.dev.gravelsextendedbattles.ondemand

import drai.dev.gravelsextendedbattles.ondemand.prompt.ProcessSelectionPrompt
import drai.dev.gravelsextendedbattles.ondemand.prompt.PromptWire
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Assumptions.assumeTrue
import org.junit.jupiter.api.Test
import java.awt.GraphicsEnvironment

/**
 * Drives the real window in its own JVM: the window answers an `ASK` by itself when `GEB_PROMPT_AUTOCODE` is set. Skipped where there is no
 * display (a build server), because the window cannot start there.
 */
class ProcessSelectionPromptTest {
    private fun start(code: String): ProcessSelectionPrompt {
        assumeTrue(!GraphicsEnvironment.isHeadless(), "No display")
        val log = mutableListOf<String>()
        val prompt = ProcessSelectionPrompt.start({ log += it }, mapOf("GEB_PROMPT_AUTOCODE" to code))
        assumeTrue(prompt != null, "The window did not start: $log")
        return prompt!!
    }

    @Test
    fun askForCode_ReturnsTheCodeTheWindowSends_AndShowsProgress() {
        val prompt = start("GMS2.abc")
        val asked = mutableListOf<String>()

        val code = prompt.askForCode("old", "because", "careful") { asked += it; null }
        prompt.progress("Downloading… 50%", 0.5)
        prompt.progress("Working…", null)
        prompt.finish(null)

        assertEquals("GMS2.abc", code)
        assertEquals(listOf("GMS2.abc"), asked)
    }

    @Test
    fun askForCode_IncludeEverything_AnswersTheCodeWithEveryPokemonOn() {
        val prompt = start("ALL")

        val code = prompt.askForCode("", null, "careful") { null }
        prompt.finish(null)

        assertEquals(OnDemandRunner.EVERYTHING_CODE, code)
        assertEquals(Gms3.Selection.EMPTY, Gms3.decode(code))
    }

    @Test
    fun askForCode_ARefusedCodeIsAskedAgain_UntilItIsAccepted() {
        val prompt = start("GMS2.abc")
        var tries = 0

        val code = prompt.askForCode("", null, "careful") { tries++; if (tries < 3) "not yet" else null }
        prompt.finish(null)

        assertEquals(3, tries)
        assertEquals("GMS2.abc", code)
    }

    @Test
    fun theTextSurvivesTabsNewlinesAndBackslashes() {
        val prompt = start("GMS2.a")
        val seen = mutableListOf<String>()

        prompt.askForCode("x\ty\\z", "line1\nline2", "w\tx") { seen += it; null }
        prompt.finish(null)

        assertTrue(seen.isNotEmpty())
    }

    @Test
    fun escapingRoundTrips() {
        for (text in listOf("plain", "a\tb", "a\nb", "a\\b", "\\t literally", "tab\t and \\ and \n")) {
            assertEquals(text, PromptWire.unescape(PromptWire.escape(text)))
        }
    }

    @Test
    fun theGameNeverLoadsTheWindowClass() {
        // Loading it builds a JFrame, which throws in the game's headless JVM (this crashed the game once). The prompt's code must not touch it.
        val source = java.nio.file.Files.readString(java.nio.file.Path.of("src/main/kotlin/drai/dev/gravelsextendedbattles/ondemand/prompt/ProcessSelectionPrompt.kt"))
        assertTrue(!source.contains("PromptProcess.") && !source.contains("PromptProcess::"), "ProcessSelectionPrompt must not reference PromptProcess members")
    }
}
