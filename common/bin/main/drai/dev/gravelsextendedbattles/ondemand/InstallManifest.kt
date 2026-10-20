package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonParseException

/**
 * `install.json`: the one file in a form folder that knows where every other file of the folder installs, relative to the
 * pack root (`assets/...`). Port of the checks in `installManifest.ts`, enough to refuse a manifest that could write outside the pack.
 */
data class InstallManifest(
    /** Flat file name in the folder -> install path relative to the pack root. */
    val files: Map<String, String>,
    /** `<game>/<folder>/<file>` of files this form needs that live in another form's folder. */
    val uses: List<String> = emptyList(),
)

class InstallManifestException(message: String) : Exception(message)

object InstallManifests {
    const val INSTALL_FILE = "install.json"
    const val CREDITS_FILE = "credits.json"
    const val MISMATCHED_FOLDER = ".mismatched"
    private const val PACK_ROOT = "assets/"
    private val FORBIDDEN_NAME = Regex("[\\\\/:*?\"<>|\\u0000-\\u001f]")

    /** `<game>/.mismatched/...` holds loose sprites no form claims; it is not a form folder. */
    fun isMismatchedPath(path: String): Boolean = path.split('/').contains(MISMATCHED_FOLDER)

    /** A flat name is one plain file name. */
    fun isValidFlatName(name: String): Boolean =
        name.isNotEmpty() && name.length <= 200 && name != "." && name != ".." &&
            !FORBIDDEN_NAME.containsMatchIn(name) && !name.endsWith(".") && !name.endsWith(" ")

    /** An install path is relative to the pack root, forward-slashed, free of `.` and `..` segments, and starts with `assets/`. */
    fun isValidInstallPath(path: String): Boolean {
        if (!path.startsWith(PACK_ROOT) || path.contains('\\') || path.contains(':')) return false
        val segments = path.split('/')
        return segments.size >= 3 && segments.all { it.isNotEmpty() && it != "." && it != ".." }
    }

    /** A folder segment (game or folder name) is a plain name too. */
    fun isValidFolderSegment(segment: String): Boolean = isValidFlatName(segment) && !segment.startsWith(".")

    /** `<game>/<folder>/<file>`, or null. */
    fun parseUsesEntry(entry: String): Triple<String, String, String>? {
        val parts = entry.split('/')
        if (parts.size != 3) return null
        val (game, folder, file) = parts
        return if (isValidFolderSegment(game) && isValidFolderSegment(folder) && isValidFlatName(file)) Triple(game, folder, file) else null
    }

    /** Parses and validates one `install.json`. Throws [InstallManifestException] naming the first problem. */
    fun parse(text: String): InstallManifest {
        val root = try {
            JsonText.parseStrict(text)
        } catch (e: JsonParseException) {
            throw InstallManifestException("install.json is not valid JSON")
        }
        if (root !is JsonObject) throw InstallManifestException("install.json must be a JSON object")
        for (key in root.keySet()) {
            if (key != "files" && key != "uses") throw InstallManifestException("Unknown key \"$key\"")
        }
        val filesElement = root.get("files")
        if (filesElement == null || filesElement !is JsonObject) throw InstallManifestException("\"files\" must be an object")
        if (filesElement.size() == 0) throw InstallManifestException("\"files\" lists no file")
        val files = linkedMapOf<String, String>()
        val lowered = mutableSetOf<String>()
        val targets = mutableSetOf<String>()
        for ((name, target) in filesElement.entrySet()) {
            if (!isValidFlatName(name)) throw InstallManifestException("\"$name\" is not a plain file name")
            if (name.lowercase() == INSTALL_FILE || name.lowercase() == CREDITS_FILE) throw InstallManifestException("\"$name\" is a reserved file name")
            if (!lowered.add(name.lowercase())) throw InstallManifestException("\"$name\" differs only by case from another file")
            val path = if (target.isJsonPrimitive && target.asJsonPrimitive.isString) target.asString else null
            if (path == null || !isValidInstallPath(path)) throw InstallManifestException("\"$name\" installs to an invalid path")
            if (!targets.add(path)) throw InstallManifestException("Two files install to $path")
            files[name] = path
        }
        val uses = mutableListOf<String>()
        if (root.has("uses")) {
            val array = root.get("uses")
            if (!array.isJsonArray) throw InstallManifestException("\"uses\" must be an array")
            for (entry in array.asJsonArray) {
                val text = if (entry.isJsonPrimitive && entry.asJsonPrimitive.isString) entry.asString else null
                if (text == null || parseUsesEntry(text) == null) throw InstallManifestException("\"uses\" holds an entry that is not <game>/<folder>/<file>")
                if (text in uses) throw InstallManifestException("\"$text\" is listed twice in \"uses\"")
                uses += text
            }
        }
        return InstallManifest(files, uses)
    }
}
