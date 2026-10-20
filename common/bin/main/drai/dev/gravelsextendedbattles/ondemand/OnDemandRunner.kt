package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path

/**
 * Where the player enters a code and watches the download. The mod's implementations are a Swing window and a native input box;
 * a test uses a fake. Every method is called from the thread that started the game, and may block.
 */
interface SelectionPrompt {
    /**
     * Shows [warning] and a field for the code, and returns once the player has entered a code that [validate] accepts (it returns
     * the reason a text is refused, or null). [initial] is what is in the config now; [reason] says why it is being asked again.
     */
    fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String

    /** What is happening now. [fraction] is 0..1, or null when it cannot be told. */
    fun progress(text: String, fraction: Double?)

    /** The run is over. [message] is shown when there is something the player should read (a warning); null closes quietly. */
    fun finish(message: String?)
}

/** What the player's setup is, as the runner needs it: no loader types, so it can be tested. */
class OnDemandSettings(
    val gameDir: Path,
    /** The Gravelmon version as `x.y.z` ([Versions.release]). */
    val modVersion: String,
    val dedicatedServer: Boolean,
    /** The config's `rules`, as written. */
    val rules: String?,
    val readCode: () -> String,
    val writeCode: (String) -> Unit,
    /** Download everything again: ignore the ETags and the cached zip. */
    val forceUpdate: Boolean = false,
    /** The config's `implementedTypes`: a rebalanced typing that uses any other type is not applied. Null accepts every type. */
    val implementedTypes: List<String>? = null,
)

sealed class OnDemandOutcome {
    /** Nothing was done and nothing was needed. */
    data class UpToDate(val packDir: Path) : OnDemandOutcome()

    /** A new pack was built. */
    data class Built(val packDir: Path, val enabledForms: Int, val disabledForms: Int, val warnings: List<String>) : OnDemandOutcome()

    /** Something stopped the update; what was installed before is used as it is. [reason] is for the log and the player. */
    data class KeptOld(val packDir: Path?, val reason: String) : OnDemandOutcome()

    /** A dedicated server cannot start without a selection: [message] is the block for the console. */
    data class Refused(val message: String) : OnDemandOutcome()
}

/**
 * The startup sequence (plan, section 2): read the code (ask for one on a client, refuse on a dedicated server), ask the site
 * what changed, download and prune what is needed, build the data files, swap the pack in and write the state last. Any failure keeps the
 * previous pack. Nothing here touches Minecraft, so it is tested with a local server and a temporary folder.
 */
class OnDemandRunner(
    private val settings: OnDemandSettings,
    private val api: SelectorApi,
    private val client: ApiClient,
    private val prompt: SelectionPrompt?,
    private val log: (String) -> Unit = {},
) {
    private val folder = PackFolder(settings.gameDir)
    private val implementedTypes: Set<String>? = settings.implementedTypes?.map { it.trim().lowercase() }?.toSet()
    private val typesKey = Staleness.typesKey(implementedTypes)

    fun run(): OnDemandOutcome {
        val loaded = InstallStateStore.load(folder.stateFile)
        val selection = readSelection(loaded) ?: return refusedOrFailed(loaded)
        val rules = RulesVariant.parse(settings.rules)
        val hash = Gms3.hash(Gms3.encode(selection))!!
        val installed = folder.packExists()

        prompt?.progress("Checking for updates…", null)
        var state = loaded
        val status = try {
            api.status(settings.modVersion)
        } catch (e: IOException) {
            return keptOld(installed, "The site could not be reached (${e.message}).", state, hash)
        }
        // Forced by the player's config, or by the site because the models were edited after publishing. Forgetting the ETags makes both
        // downloads unconditional and every piece stale, so all of it is rebuilt, and the cached zip is dropped so the models come again.
        val siteForced = status.published && status.refreshRevision > loaded.refreshRevision
        if (status.published && (settings.forceUpdate || siteForced)) {
            log(if (siteForced) "The site asks for the Pokemon data and models to be downloaded again." else "Forced update: downloading the Pokemon data and models again.")
            state = loaded.copy(dataRevision = null, gamesEtag = null, lastDownloadedVersion = null, enabledKey = null)
            runCatching { Files.deleteIfExists(folder.zipFor(settings.modVersion)) }
        }
        if (!status.published) {
            return keptOld(installed, "No Pokemon models are published for version ${settings.modVersion} yet.", state, hash)
        }

        val species = try {
            fetch("species", folder.cache.resolve("species.json"), state.dataRevision) { api.speciesText(it) }
        } catch (e: IOException) {
            return keptOld(installed, "The Pokemon data could not be downloaded (${e.message}).", state, hash)
        }
        val games = try {
            fetch("games", folder.cache.resolve("games.json"), state.gamesEtag) { api.gamesText(it) }
        } catch (e: IOException) {
            return keptOld(installed, "The starters could not be downloaded (${e.message}).", state, hash)
        }
        val speciesData = try {
            SelectorData.parseSpecies(species.text)
        } catch (e: JsonParseException) {
            return keptOld(installed, "The downloaded data is not valid (${e.message}).", state, hash)
        }
        if (!speciesData.hasStatuses && selection.s != Gms3.Status.ALL) {
            log("The site's data does not say how far the models are, so the status choice in the code is ignored.")
        }
        // The code does not say which Pokemon are on (their status moves as models are finished), so the models follow the resolved set.
        val enabledKey = Staleness.enabledKey(Gms3.resolve(speciesData.applicable(selection), speciesData.selectableForms()).enabled)
        val zipNeeded = !settings.dedicatedServer && (Staleness.zipNeeded(state, settings.modVersion, hash) || state.enabledKey != enabledKey || !installed)
        val dataNeeded = Staleness.dataNeeded(state, species.etag, hash, rules.name.lowercase(), typesKey) || games.etag != state.gamesEtag || !installed
        if (!zipNeeded && !dataNeeded) {
            prompt?.finish(null)
            return OnDemandOutcome.UpToDate(folder.pack)
        }

        return try {
            build(state, selection, hash, rules, status, species, speciesData, games, zipNeeded, enabledKey)
        } catch (e: IOException) {
            folder.deleteQuietly(folder.staging, folder.zipStaging)
            keptOld(installed, "The update failed (${e.message}).", state, hash)
        } catch (e: JsonParseException) {
            folder.deleteQuietly(folder.staging, folder.zipStaging)
            keptOld(installed, "The downloaded data is not valid (${e.message}).", state, hash)
        } catch (e: IllegalStateException) {
            folder.deleteQuietly(folder.staging, folder.zipStaging)
            keptOld(installed, "The update failed (${e.message}).", state, hash)
        }
    }

    // ---- the code ------------------------------------------------------------------------------------------------------

    private fun readSelection(state: InstallState): Gms3.Selection? {
        val code = settings.readCode().trim()
        val first = try {
            if (code.isEmpty()) null else Gms3.decode(code)
        } catch (e: Gms3.Gms3Exception) {
            damagedReason = e.message
            null
        }
        if (first != null) {
            if (!settings.dedicatedServer && state.codeHash != null && state.codeHash != Gms3.hash(Gms3.encode(first))) log(DATA_LOSS_WARNING)
            return if (Gms3.isLegacy(code)) askToSelectAgain(code, first) else first
        }
        if (settings.dedicatedServer || prompt == null) return null
        val entered = prompt.askForCode(code, damagedReason, DATA_LOSS_WARNING) { text -> validate(text) }
        val selection = Gms3.decode(entered.trim())
        settings.writeCode(entered.trim())
        return selection
    }

    /**
     * A `GMS2.` code still works (it is read as a `GMS3.` selection with every status on), but the player is asked to select again so they
     * get a `GMS3.` code: pressing Continue with the same code keeps the old one, and it is asked again at the next start. A server has
     * nobody to ask, so it only logs.
     */
    private fun askToSelectAgain(code: String, current: Gms3.Selection): Gms3.Selection {
        if (settings.dedicatedServer || prompt == null) {
            log(LEGACY_CODE_REASON)
            return current
        }
        val entered = prompt.askForCode(code, LEGACY_CODE_REASON, DATA_LOSS_WARNING) { text -> validate(text) }.trim()
        if (entered != code) settings.writeCode(entered)
        return Gms3.decode(entered)
    }

    private var damagedReason: String? = null

    private fun validate(text: String): String? = try {
        Gms3.decode(text.trim())
        null
    } catch (e: Gms3.Gms3Exception) {
        e.message ?: "Not a valid code."
    }

    private fun refusedOrFailed(state: InstallState): OnDemandOutcome {
        if (settings.dedicatedServer) return OnDemandOutcome.Refused(noSelectionMessage(damagedReason))
        // A client with no way to ask: carry on with what is installed, if anything.
        val reason = "No Pokemon selection is set, and there is no way to ask for one. " + SELECTOR_HELP
        return OnDemandOutcome.KeptOld(if (folder.packExists()) folder.pack else null, reason)
    }

    // ---- downloads -----------------------------------------------------------------------------------------------------

    private class Fetched(val text: String, val etag: String?)

    /** The download, or the cached copy when the site says nothing changed (a 304) and the copy is still there. */
    private fun fetch(what: String, cacheFile: Path, knownEtag: String?, get: (String?) -> SelectorApi.Download?): Fetched {
        val cached = if (Files.isRegularFile(cacheFile) && knownEtag != null) runCatching { Files.readString(cacheFile) }.getOrNull() else null
        val downloaded = get(if (cached != null) knownEtag else null)
        if (downloaded == null) {
            // A 304 answers only a request that carried the ETag, which only happens with a cached copy.
            return Fetched(cached ?: throw ApiException("The site answered 'not modified' for the $what data, but there is no copy of it."), knownEtag)
        }
        Files.createDirectories(cacheFile.parent)
        Files.writeString(cacheFile, downloaded.text)
        return Fetched(downloaded.text, downloaded.etag)
    }

    // ---- building ------------------------------------------------------------------------------------------------------

    private fun build(
        state: InstallState,
        selection: Gms3.Selection,
        hash: String,
        rules: RulesVariant,
        status: SelectorApi.Status,
        species: Fetched,
        speciesData: SelectorData.Species,
        games: Fetched,
        zipNeeded: Boolean,
        enabledKey: String,
    ): OnDemandOutcome {
        prompt?.progress("Preparing your Pokemon…", null)
        val gamesData = SelectorData.parseGames(games.text)
        val built = PackDataBuilder.build(speciesData, gamesData, selection, rules, implementedTypes)
        if (built.problems.isNotEmpty()) throw IllegalStateException("the data has problems: ${built.problems.take(3)}")
        built.skipped.forEach { log("Skipped: $it") }
        if (built.unknownGames.isNotEmpty() || built.unknownForms.isNotEmpty()) {
            log("The code names ${built.unknownGames.size} game(s) and ${built.unknownForms.size} form(s) that do not exist; they are ignored.")
        }

        folder.deleteQuietly(folder.staging, folder.zipStaging)
        val keptFiles = linkedSetOf<String>()
        if (zipNeeded) {
            keptFiles += installZip(status, selection, speciesData, folder.staging)
        } else {
            if (Files.isDirectory(folder.pack)) folder.copyTree(folder.pack, folder.staging, exclude = state.generated.toSet())
            else Files.createDirectories(folder.staging)
            keptFiles += state.files.filter { it !in state.generated }
        }

        prompt?.progress("Writing data…", null)
        built.files.forEach { (path, text) -> folder.write(folder.staging, path, text) }
        folder.write(folder.staging, PackFolder.PACK_META, PackFolder.PACK_META_TEXT)
        val generated = built.files.keys + PackFolder.PACK_META

        prompt?.progress("Installing…", 1.0)
        folder.swap()
        folder.deleteQuietly(folder.zipStaging)
        val newState = state.copy(
            lastDownloadedVersion = if (zipNeeded) settings.modVersion else state.lastDownloadedVersion,
            codeHash = hash,
            enabledKey = enabledKey,
            refreshRevision = maxOf(state.refreshRevision, status.refreshRevision),
            dataRevision = species.etag,
            gamesEtag = games.etag,
            rulesVariant = rules.name.lowercase(),
            typesKey = typesKey,
            files = (keptFiles + generated).sorted(),
            generated = generated.sorted(),
        )
        InstallStateStore.save(folder.stateFile, newState)
        log("Pack built: ${built.enabledForms} Pokemon enabled, ${built.disabledForms} left out, ${newState.files.size} files.")
        prompt?.finish(null)
        return OnDemandOutcome.Built(folder.pack, built.enabledForms, built.disabledForms, built.skipped)
    }

    /** Downloads (or reuses) the zip, prunes it for [selection] and installs it into [target]. Returns the install paths written. */
    private fun installZip(status: SelectorApi.Status, selection: Gms3.Selection, species: SelectorData.Species, target: Path): List<String> {
        val zip = folder.zipFor(settings.modVersion)
        if (!Files.isRegularFile(zip)) {
            val url = status.zipUrl ?: throw IOException("The site did not say where the models are.")
            prompt?.progress("Downloading Pokemon models…", 0.0)
            var lastPercent = -1
            client.download(url, zip) { done, total ->
                if (total > 0) {
                    val percent = (done * 100 / total).toInt()
                    if (percent != lastPercent) {
                        lastPercent = percent
                        prompt?.progress("Downloading Pokemon models… $percent%", done.toDouble() / total)
                    }
                }
            }
            folder.deleteOtherZips(zip)
        }
        prompt?.progress("Unpacking…", null)
        ZipInstaller.extract(zip, folder.zipStaging)
        val selectable = species.selectableForms()
        val enabled = Gms3.resolve(species.applicable(selection), selectable).enabled
        val plan = PrunePlanner.plan(enabled, ZipInstaller.readFolders(folder.zipStaging))
        prompt?.progress("Installing Pokemon models…", null)
        val installed = ZipInstaller.install(folder.zipStaging, plan, target).toMutableList()
        val sounds = SoundsJsonBuilder.generate(installed)
        if (sounds.isNotEmpty()) {
            folder.write(target, SOUNDS_PATH, SoundsJsonBuilder.render(sounds))
            installed += SOUNDS_PATH
        }
        folder.deleteQuietly(folder.zipStaging)
        return installed
    }

    // ---- when it cannot be done ------------------------------------------------------------------------------------------

    private fun keptOld(installed: Boolean, reason: String, state: InstallState, hash: String): OnDemandOutcome {
        val different = state.codeHash != null && state.codeHash != hash
        val message = buildString {
            append(reason)
            append(if (installed) " The Pokemon installed earlier are used." else " No Pokemon have been downloaded.")
            if (different && installed) append(" They were downloaded for a different selection than the one in your config.")
        }
        log(message)
        prompt?.finish(message)
        return OnDemandOutcome.KeptOld(if (installed) folder.pack else null, message)
    }

    companion object {
        const val SELECTOR_URL = "https://submit.gravelmon.com/pokemon-selector"
        const val SOUNDS_PATH = "assets/cobblemon/sounds.json"

        const val DATA_LOSS_WARNING =
            "Pokemon of a species you leave out are permanently deleted from your worlds, including from your PC. Back up your worlds first."

        const val LEGACY_CODE_REASON =
            "Your selection code uses an old format (GMS2). Select again at $SELECTOR_URL to get a new code (GMS3) and paste it here: " +
                "with it, Pokemon whose models are finished later are added without choosing them again. " +
                "Pressing Continue keeps your current code for now, and you will be asked again at the next start."

        const val SELECTOR_HELP =
            "Create a selection at $SELECTOR_URL, paste the code into `selectionCode` in config/gravels-extended-battles.toml, then restart."

        fun noSelectionMessage(damagedReason: String?): String {
            val problem = if (damagedReason == null) "No Pokemon selection is set." else "The Pokemon selection in the config is not valid ($damagedReason)."
            return "$problem Create one at $SELECTOR_URL, paste the code into `selectionCode` in config/gravels-extended-battles.toml, then restart the server. $DATA_LOSS_WARNING"
        }
    }
}
