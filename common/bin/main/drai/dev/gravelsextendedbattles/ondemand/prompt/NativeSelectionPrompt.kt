package drai.dev.gravelsextendedbattles.ondemand.prompt

import drai.dev.gravelsextendedbattles.ondemand.OnDemandRunner
import drai.dev.gravelsextendedbattles.ondemand.SelectionPrompt

/**
 * The prompt on macOS (plan, section 3), where AWT next to GLFW is unreliable: LWJGL's native input box (tinyfd), one line, paste works,
 * followed by a native message box when there is something to read. There is no progress bar; the progress goes to the log.
 *
 * LWJGL is reached through reflection so this compiles and loads where it is absent (a dedicated server never uses it).
 */
class NativeSelectionPrompt private constructor(private val tinyfd: Class<*>, private val log: (String) -> Unit) : SelectionPrompt {
    private fun clean(text: String) = text.replace('"', '\'').replace('`', '\'')

    private fun inputBox(title: String, message: String, default: String): String? =
        tinyfd.getMethod("tinyfd_inputBox", CharSequence::class.java, CharSequence::class.java, CharSequence::class.java)
            .invoke(null, clean(title), clean(message), clean(default)) as String?

    private fun messageBox(title: String, message: String, icon: String) {
        tinyfd.getMethod("tinyfd_messageBox", CharSequence::class.java, CharSequence::class.java, CharSequence::class.java, CharSequence::class.java, Boolean::class.javaPrimitiveType)
            .invoke(null, clean(title), clean(message), "ok", icon, true)
    }

    override fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String {
        var problem = reason?.let { "The code in your config is not valid: $it" }
        var shown = initial
        while (true) {
            val message = buildString {
                if (problem != null) append(problem).append("\n\n")
                append("Gravelmon downloads only the Pokemon you pick. Make a selection at ${OnDemandRunner.SELECTOR_URL} and paste its code here.\n\n")
                append(warning)
            }
            // Cancelling ends the game: there is no way to skip the selection.
            val answer = inputBox("Gravelmon: choose your Pokemon", message, shown)?.trim() ?: run {
                System.exit(0)
                return ""
            }
            val refused = if (answer.isEmpty()) "Paste the code from the selector page." else validate(answer)
            if (refused == null) return answer
            problem = refused
            shown = answer
        }
    }

    override fun progress(text: String, fraction: Double?) {
        log(text)
    }

    override fun finish(message: String?) {
        if (message != null) messageBox("Gravelmon", message, "warning")
    }

    companion object {
        fun create(log: (String) -> Unit): NativeSelectionPrompt? = try {
            NativeSelectionPrompt(Class.forName("org.lwjgl.util.tinyfd.TinyFileDialogs"), log)
        } catch (e: Throwable) {
            null
        }
    }
}
