package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import com.google.gson.JsonParseException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

/**
 * What the last successful download left behind, kept in a file of its own (`<gamedir>/gravelmon/state.json`), never in the
 * config. The mod compares it with the installed version, the code and the site's data revision to decide what to fetch.
 */
data class InstallState(
    /** `x.y.z` of the mod version the zip was downloaded for. */
    val lastDownloadedVersion: String? = null,
    /** [Gms3.hash] of the code the pack was built for. */
    val codeHash: String? = null,
    /** ETag of the last data (species) response. */
    val dataRevision: String? = null,
    /** `faithful` or `rebalanced`. */
    val rulesVariant: String? = null,
    /** Every file this install wrote, relative to the pack root: exactly what a re-download may delete. */
    val files: List<String> = emptyList(),
    /** The part of [files] that is built from the site's data (not copied from the zip): what a data-only rebuild replaces. */
    val generated: List<String> = emptyList(),
    /** ETag of the last games (starters) response. */
    val gamesEtag: String? = null,
    /**
     * [Staleness.enabledKey] of the Pokemon the pack was built for. The code alone does not say which Pokemon are on: their status
     * changes as models are finished, so the models are installed again when this changes.
     */
    val enabledKey: String? = null,
    /** The status route's `refreshRevision` at the last install: when the site's is higher, the models were edited by hand and are downloaded again. */
    val refreshRevision: Long = 0,
    /** [Staleness.typesKey] of the config's `implementedTypes` the data was built with: the rebalanced typings depend on it. */
    val typesKey: String? = null,
) {
    companion object {
        val EMPTY = InstallState()
    }
}

object InstallStateStore {
    /** A missing, unreadable or damaged file is an empty state: everything is then downloaded again, which is always safe. */
    fun load(path: Path): InstallState {
        return try {
            val root = JsonText.parseStrict(Files.readString(path)) as? JsonObject ?: return InstallState.EMPTY
            fun text(key: String): String? = root.get(key)?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString
            fun strings(key: String): List<String> = root.get(key)?.takeIf { it.isJsonArray }?.asJsonArray
                ?.mapNotNull { if (it.isJsonPrimitive && it.asJsonPrimitive.isString) it.asString else null }
                ?: emptyList()
            InstallState(
                lastDownloadedVersion = text("lastDownloadedVersion"),
                codeHash = text("codeHash"),
                dataRevision = text("dataRevision"),
                rulesVariant = text("rulesVariant"),
                gamesEtag = text("gamesEtag"),
                enabledKey = text("enabledKey"),
                typesKey = text("typesKey"),
                refreshRevision = root.get("refreshRevision")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asLong ?: 0,
                files = strings("files"),
                generated = strings("generated"),
            )
        } catch (e: java.io.IOException) {
            InstallState.EMPTY
        } catch (e: JsonParseException) {
            InstallState.EMPTY
        }
    }

    /** Written next to the file and moved over it, so a crash never leaves half a state. */
    fun save(path: Path, state: InstallState) {
        val wire = linkedMapOf<String, Any?>(
            "lastDownloadedVersion" to state.lastDownloadedVersion,
            "codeHash" to state.codeHash,
            "dataRevision" to state.dataRevision,
            "rulesVariant" to state.rulesVariant,
            "gamesEtag" to state.gamesEtag,
            "enabledKey" to state.enabledKey,
            "typesKey" to state.typesKey,
            "refreshRevision" to state.refreshRevision,
            "files" to state.files.sorted(),
            "generated" to state.generated.sorted(),
        )
        path.toAbsolutePath().parent?.let { Files.createDirectories(it) }
        val temporary = path.resolveSibling(path.fileName.toString() + ".tmp")
        Files.writeString(temporary, JsonText.render(wire, indent = 2) + "\n")
        try {
            Files.move(temporary, path, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE)
        } catch (e: java.nio.file.AtomicMoveNotSupportedException) {
            Files.move(temporary, path, StandardCopyOption.REPLACE_EXISTING)
        }
    }
}

/** Versions as the gate compares them: `x.y.z`, everything from the first `-` ignored (alphas and betas count as their release). */
object Versions {
    private val RELEASE = Regex("^(\\d+)\\.(\\d+)\\.(\\d+)$")

    /** `4.0.0-Alpha.9` -> `4.0.0`; null when what remains is not `x.y.z`. */
    fun release(modVersion: String): String? = modVersion.substringBefore('-').trim().takeIf { RELEASE.matches(it) }

    /** Negative when [a] is older than [b]. Both must be `x.y.z`. */
    fun compare(a: String, b: String): Int {
        val left = parts(a)
        val right = parts(b)
        for (i in 0..2) {
            if (left[i] != right[i]) return left[i].compareTo(right[i])
        }
        return 0
    }

    private fun parts(version: String): List<Long> {
        val match = RELEASE.matchEntire(version) ?: throw IllegalArgumentException("Not an x.y.z version: $version")
        return match.groupValues.drop(1).map { it.toLong() }
    }
}

/** Decides what to fetch, from the state, the installed version, the code hash and the site's data revision. */
object Staleness {
    /** The zip is downloaded when the installed version is newer than the last download, or the code changed. */
    fun zipNeeded(state: InstallState, installed: String, codeHash: String): Boolean {
        val last = state.lastDownloadedVersion ?: return true
        return Versions.compare(last, installed) < 0 || state.codeHash != codeHash
    }

    /** What the models installed depend on: the Pokemon the selection enables, as a hash of their ids. */
    fun enabledKey(enabled: Collection<Gms3.SelectableForm>): String =
        java.security.MessageDigest.getInstance("SHA-256")
            .digest(enabled.map { it.formId }.sorted().joinToString("\n").toByteArray(Charsets.UTF_8))
            .joinToString("") { "%02x".format(it) }

    /** The implemented types as a comparable key; null (no filter) is its own key. */
    fun typesKey(implementedTypes: Collection<String>?): String =
        implementedTypes?.map { it.trim().lowercase() }?.toSortedSet()?.joinToString(",") ?: "*"

    /** The data files are rebuilt when the site's data changed, the code changed, the rules variant changed, or the implemented types changed. */
    fun dataNeeded(state: InstallState, dataRevision: String?, codeHash: String, rules: String, typesKey: String? = state.typesKey): Boolean =
        state.dataRevision == null || state.dataRevision != dataRevision || state.codeHash != codeHash || state.rulesVariant != rules ||
            state.typesKey != typesKey
}
