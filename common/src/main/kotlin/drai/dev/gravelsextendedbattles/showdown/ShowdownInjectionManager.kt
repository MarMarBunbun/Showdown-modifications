package drai.dev.gravelsextendedbattles.showdown

import java.nio.file.Files
import java.nio.file.Path
import java.util.regex.Pattern

object ShowdownInjectionManager {

    /**
     * Inserts [entryText] immediately after the last occurrence of [targetText].
     *
     * Does nothing if [entryText] is already present.
     */
    fun injectEntry(
        file: Path,
        targetText: String,
        entryText: String
    ) {
        var content = Files.readString(file)

        if (entryText in content) {
            return
        }

        val targetIndex = content.lastIndexOf(targetText)

        require(targetIndex >= 0) {
            "Can't find injection target '$targetText' in $file"
        }

        val insertIndex = targetIndex + targetText.length

        content = buildString(content.length + entryText.length) {
            append(content, 0, insertIndex)
            append(entryText)
            append(content, insertIndex, content.length)
        }

        Files.writeString(file, content)
    }

    /**
     * Replaces the first occurrence of [target] with [replacement].
     */
    fun replaceFirst(
        file: Path,
        target: Regex,
        replacement: String
    ) {
        val content = Files.readString(file)

        if (!target.containsMatchIn(content)) {
            return
        }

        val patched = target.replaceFirst(content, replacement)
        Files.writeString(file, patched)
    }
}
