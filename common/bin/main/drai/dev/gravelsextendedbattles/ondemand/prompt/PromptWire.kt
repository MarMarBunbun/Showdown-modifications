package drai.dev.gravelsextendedbattles.ondemand.prompt

/**
 * How the game and the window talk: one line per message, fields separated by a tab, with backslash, tab and newline escaped. The window
 * (`PromptProcess`) has its own copy of this, in Java, because it runs alone. This object exists so the game never loads `PromptProcess`:
 * its static fields build a window, which cannot happen in the game's JVM (it is headless there).
 */
object PromptWire {
    private const val BACKSLASH = '\\'

    fun escape(text: String): String =
        text.replace("\\", "\\\\").replace("\t", "\\t").replace("\n", "\\n").replace("\r", "")

    fun unescape(text: String): String {
        val result = StringBuilder()
        var i = 0
        while (i < text.length) {
            val c = text[i]
            if (c == BACKSLASH && i + 1 < text.length) {
                val next = text[++i]
                result.append(if (next == 't') '\t' else if (next == 'n') '\n' else next)
            } else {
                result.append(c)
            }
            i++
        }
        return result.toString()
    }
}
