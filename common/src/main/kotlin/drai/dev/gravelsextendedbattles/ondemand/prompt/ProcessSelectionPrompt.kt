package drai.dev.gravelsextendedbattles.ondemand.prompt

import drai.dev.gravelsextendedbattles.ondemand.OnDemandRunner
import drai.dev.gravelsextendedbattles.ondemand.SelectionPrompt
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.IOException
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.nio.file.Files
import java.nio.file.Path
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit

/**
 * The prompt on Windows and Linux (plan, section 3): the window of [PromptProcess], run in a **separate JVM** and driven over stdin and stdout.
 *
 * It is a separate process because AWT cannot be used in the game's JVM: Minecraft sets `java.awt.headless=true` and Java remembers the answer
 * the first time anything asks, so a window cannot be opened there (the log said "AWT still reports headless" after the property was set back).
 * A process of its own also keeps Swing away from the game's GLFW window. The child needs nothing from the mod: its single class file is copied to a
 * temporary folder and run with the same Java.
 *
 * Closing the window while a code is wanted ends the game: there is no way to skip the selection.
 */
class ProcessSelectionPrompt private constructor(
    private val process: Process,
    private val folder: Path,
    private val log: (String) -> Unit,
) : SelectionPrompt {
    private val toChild = BufferedWriter(OutputStreamWriter(process.outputStream, Charsets.UTF_8))
    private val fromChild = LinkedBlockingQueue<String>()

    init {
        Thread({
            try {
                BufferedReader(InputStreamReader(process.inputStream, Charsets.UTF_8)).use { reader ->
                    while (true) fromChild.put(reader.readLine() ?: break)
                }
            } catch (e: IOException) {
                // The window is gone.
            } finally {
                fromChild.put(END)
            }
        }, "Gravelmon prompt reader").apply { isDaemon = true }.start()
    }

    private fun send(vararg fields: String) {
        try {
            toChild.write(fields.mapIndexed { index, field -> if (index == 0) field else PromptWire.escape(field) }.joinToString("\t"))
            toChild.newLine()
            toChild.flush()
        } catch (e: IOException) {
            log("The selection window is gone (${e.message}).")
        }
    }

    private fun next(): List<String> {
        val line = fromChild.take()
        if (line == END) throw IOException("The selection window was closed unexpectedly.")
        return line.split('\t').mapIndexed { index, field -> if (index == 0) field else PromptWire.unescape(field) }
    }

    override fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String {
        send("ASK", initial, reason ?: "", warning)
        while (true) {
            val message = next()
            when (message[0]) {
                "CODE" -> {
                    val text = message.getOrElse(1) { "" }.trim()
                    val refused = validate(text)
                    if (refused == null) {
                        send("OK")
                        return text
                    }
                    send("ERR", refused)
                }
                // Include everything: no selection, every Pokemon.
                "ALL" -> {
                    val refused = validate(OnDemandRunner.EVERYTHING_CODE)
                    if (refused == null) {
                        send("OK")
                        return OnDemandRunner.EVERYTHING_CODE
                    }
                    send("ERR", refused)
                }
                // Closed while the code is wanted: the game stops here.
                "CLOSED" -> {
                    destroy()
                    System.exit(0)
                }
            }
        }
    }

    override fun progress(text: String, fraction: Double?) {
        send("PROGRESS", text, fraction?.toString() ?: "-")
    }

    override fun finish(message: String?) {
        send("FINISH", message ?: "")
        if (message != null) {
            // The window waits for OK; the answer arrives, or the window ends.
            try {
                while (next()[0] != "DISMISSED") Unit
            } catch (e: IOException) {
                // Closed by hand: also fine.
            }
        }
        destroy()
    }

    private fun destroy() {
        try {
            send("QUIT")
            toChild.close()
        } catch (e: IOException) {
            // Already closed.
        }
        process.waitFor(2, TimeUnit.SECONDS)
        process.destroy()
        runCatching { Files.walk(folder).use { files -> files.sorted(Comparator.reverseOrder()).forEach { Files.deleteIfExists(it) } } }
    }

    companion object {
        private const val END = "\u0000end"
        // Only the name and the class file are used: `PromptProcess` itself must never be loaded here, its static fields build a window.
        private const val CLASS_NAME = "drai.dev.gravelsextendedbattles.ondemand.prompt.PromptProcess"

        /**
         * Starts the window, or returns null when it cannot be (no display, no Java to run, the class file is not found). [environment] is added to
         * the child's environment, which the tests use.
         */
        fun start(log: (String) -> Unit, environment: Map<String, String> = emptyMap()): ProcessSelectionPrompt? {
            var folder: Path? = null
            return try {
                folder = Files.createTempDirectory("gravelmon-prompt")
                copyClasses(folder)
                val process = ProcessBuilder(javaBinary(), "-Xmx64m", "-Djava.awt.headless=false", "-cp", folder.toString(), CLASS_NAME)
                    .redirectError(ProcessBuilder.Redirect.INHERIT)
                    .apply { environment().putAll(environment) }
                    .start()
                val prompt = ProcessSelectionPrompt(process, folder, log)
                val first = prompt.fromChild.poll(15, TimeUnit.SECONDS)
                if (first != "READY") {
                    log("The selection window did not start (${if (first == null) "no answer in 15 seconds" else "it ended"}).")
                    prompt.destroy()
                    return null
                }
                prompt
            } catch (e: Exception) {
                log("The selection window could not be started: ${e.message}")
                folder?.let { runCatching { Files.walk(it).use { files -> files.sorted(Comparator.reverseOrder()).forEach { f -> Files.deleteIfExists(f) } } } }
                null
            }
        }

        /** The class file of [PromptProcess] and its nested classes, copied out of the mod so the child JVM needs no classpath of the game. */
        private fun copyClasses(folder: Path) {
            val base = CLASS_NAME.replace('.', '/')
            val loader = ProcessSelectionPrompt::class.java.classLoader
            var copied = 0
            for (name in listOf(base) + (1..9).map { "$base\$$it" }) {
                val stream = loader.getResourceAsStream("$name.class") ?: continue
                stream.use {
                    val target = folder.resolve("$name.class")
                    Files.createDirectories(target.parent)
                    Files.copy(it, target)
                    copied++
                }
            }
            if (copied == 0) throw IOException("The class file of the window was not found.")
        }

        /** `javaw` on Windows so no console window flashes up, else `java`, from the same Java the game runs on. */
        private fun javaBinary(): String {
            val bin = Path.of(System.getProperty("java.home"), "bin")
            val windows = System.getProperty("os.name", "").lowercase().contains("win")
            val candidates = if (windows) listOf("javaw.exe", "java.exe") else listOf("java")
            return candidates.map { bin.resolve(it) }.firstOrNull { Files.isRegularFile(it) }?.toString()
                ?: throw IOException("No Java found in $bin.")
        }
    }
}
