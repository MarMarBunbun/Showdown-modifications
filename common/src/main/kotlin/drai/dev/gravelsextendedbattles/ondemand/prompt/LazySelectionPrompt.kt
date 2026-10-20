package drai.dev.gravelsextendedbattles.ondemand.prompt

import drai.dev.gravelsextendedbattles.ondemand.SelectionPrompt

/**
 * A prompt whose window is only opened when a code has to be entered. With a valid code in the config no window is shown at all: the progress
 * goes to the log instead, and a warning at the end is left to the runner's own log line. Once the window has been opened for a code, the rest
 * of the run (the download) is shown in it as before.
 *
 * [create] opens the window, or returns null when none can be shown; it is called at most once.
 */
class LazySelectionPrompt(private val create: () -> SelectionPrompt?, private val log: (String) -> Unit) : SelectionPrompt {
    private var window: SelectionPrompt? = null
    private var created = false

    private var lastLabel: String? = null
    private var lastBucket = -1

    override fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String? {
        if (!created) {
            created = true
            window = create()
        }
        return window?.askForCode(initial, reason, warning, validate)
    }

    override fun progress(text: String, fraction: Double?) {
        window?.let { return it.progress(text, fraction) }
        // The runner logs each step itself, so only the progress within a step is logged here, every 10%.
        val label = text.substringBefore('…')
        val bucket = fraction?.let { (it * 10).toInt().coerceIn(0, 10) } ?: -1
        if (label != lastLabel) {
            lastLabel = label
            lastBucket = bucket
            return
        }
        if (bucket > lastBucket) {
            lastBucket = bucket
            log("[on demand] $text")
        }
    }

    override fun finish(message: String?) {
        window?.finish(message)
    }
}
