package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonParseException
import java.io.IOException
import java.nio.file.AccessDeniedException
import java.nio.file.FileAlreadyExistsException
import java.nio.file.FileSystemException
import java.nio.file.Files
import java.nio.file.NoSuchFileException
import java.nio.file.Path

/**
 * Where the player enters a code and watches the download. The mod's implementations are a Swing window and a native input box;
 * a test uses a fake. Every method is called from the thread that started the game, and may block.
 */
interface SelectionPrompt {
    /**
     * Shows [warning] and a field for the code, and returns once the player has entered a code that [validate] accepts (it returns
     * the reason a text is refused, or null). [initial] is what is in the config now; [reason] says why it is being asked again.
     * Returns null when there turns out to be no way to ask (no window can be shown).
     */
    fun askForCode(initial: String, reason: String?, warning: String, validate: (String) -> String?): String?

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
    /** Called once the forced download is on disk, so a run that is stopped after it does not download everything a third time. */
    val forceUpdateDone: () -> Unit = {},
    /** The config's `implementedTypes`: a rebalanced typing that uses any other type is not applied. Null accepts every type. */
    val implementedTypes: List<String>? = null,
    /** The keys of the `cobblemon` language files the jars ship; the pack only adds the Pokedex form labels they lack. */
    val knownLang: () -> Set<String> = { emptySet() },
    /**
     * Where the models zip of a version is when the site cannot be reached, tried in order: the tag the site publishes it under, then the branch
     * it serves while tags are not used yet.
     */
    val offlineZipUrls: (String) -> List<String> = OnDemandRunner::githubZipUrls,
    /** The config's `allItems`: every site item gets its files and textures, not only the ones the selection needs. */
    val allItems: Boolean = false,
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

        step("Checking for updates…")
        var state = loaded
        offline = false
        val status = try {
            api.status(settings.modVersion)
        } catch (e: IOException) {
            // Where the site is blocked, the player can bring its data from the selector page instead; the models still come from GitHub.
            if (!hasOfflineData()) {
                return keptOld(installed, "The site could not be reached. ${describe(e)} $OFFLINE_HELP", state, hash)
            }
            log("[on demand] The site could not be reached (${describe(e)}), so the Pokemon data in ${folder.cache} is used.")
            offline = true
            // Forced while offline: the whole pack is built again, from the data and the zip in the cache (the zip is downloaded only when
            // there is none). Forgetting what was installed makes every piece stale; nothing is deleted.
            if (settings.forceUpdate) {
                log("[on demand] Forced update: building the whole pack again from the cache.")
                state = loaded.copy(dataRevision = null, gamesEtag = null, lastDownloadedVersion = null, enabledKey = null, speciesRevision = null)
            }
            offlineStatus(state)
        }
        // Forced by the player's config, or by the site because the models were edited after publishing. Forgetting the ETags makes both
        // downloads unconditional and every piece stale, so all of it is rebuilt, and the cached zip is dropped so the models come again.
        val siteForced = status.published && status.refreshRevision > loaded.refreshRevision
        if (!offline && status.published && (settings.forceUpdate || siteForced)) {
            log(if (siteForced) "The site asks for the Pokemon data and models to be downloaded again." else "Forced update: downloading the Pokemon data and models again.")
            state = loaded.copy(dataRevision = null, gamesEtag = null, lastDownloadedVersion = null, enabledKey = null, speciesRevision = null)
            runCatching { Files.deleteIfExists(folder.zipFor(settings.modVersion)) }
        }
        if (!status.published) {
            return keptOld(installed, "No Pokemon models are published for version ${settings.modVersion} yet.", state, hash)
        }

        val (species, games) = if (offline) {
            try {
                readOfflineData(state)
            } catch (e: IOException) {
                return keptOld(installed, "The Pokemon data in ${folder.cache} could not be read. ${describe(e)}", state, hash)
            }
        } else {
            val species = try {
                fetchSpecies(state)
            } catch (e: IOException) {
                return keptOld(installed, "The Pokemon data could not be downloaded. ${describe(e)}", state, hash)
            }
            val games = try {
                fetch("games", folder.cache.resolve("games.json"), state.gamesEtag) { api.gamesText(it) }
            } catch (e: IOException) {
                return keptOld(installed, "The starters could not be downloaded. ${describe(e)}", state, hash)
            }
            species to games
        }
        val items = if (offline) offlineItems(state) else fetchItems(state)
        val speciesData = try {
            SelectorData.parseSpecies(species.text)
        } catch (e: JsonParseException) {
            return keptOld(installed, describe(e), state, hash)
        }
        val itemsData = items?.let {
            try {
                ItemFilesBuilder.parse(it.text)
            } catch (e: JsonParseException) {
                log("[on demand] The items data could not be read, so no item files are built. ${describe(e)}")
                null
            }
        }
        if (!speciesData.hasStatuses && selection.s != Gms3.Status.ALL) {
            log("The site's data does not say how far the models are, so the status choice in the code is ignored.")
        }
        // The code does not say which Pokemon are on (their status moves as models are finished), so the models follow the resolved set.
        val enabledForms = Gms3.resolve(speciesData.applicable(selection), speciesData.selectableForms()).enabled
        val siteItems = ItemSelection.of(itemsData, speciesData, enabledForms, settings.allItems)
        // The textures of the items the selection needs come from the zip too, so they decide a reinstall like the Pokemon do.
        // The twin names are written into resolvers as they are installed, so a change of them installs those again.
        val enabledKey = Staleness.enabledKey(enabledForms) +
            (if (siteItems.registered == 0) "" else "+items-" + sha256((siteItems.needed.sorted() + siteItems.folders.sorted()).joinToString("\n"))) +
            (if (speciesData.speciesNames.isEmpty()) "" else "+twins-" + sha256(speciesData.speciesNames.toSortedMap().entries.joinToString("\n")))
        val zipNeeded = !settings.dedicatedServer && (Staleness.zipNeeded(state, settings.modVersion, hash) || state.enabledKey != enabledKey || !installed)
        // The item files follow the items the selection needs (and `allItems`), which the enabled key covers.
        val dataNeeded = Staleness.dataNeeded(state, species.etag, hash, rules.name.lowercase(), typesKey, PackDataBuilder.REVISION) || games.etag != state.gamesEtag || !installed ||
            (siteItems.registered > 0 && state.enabledKey != enabledKey) ||
            items?.etag != state.itemsEtag || (items != null && !Files.isRegularFile(folder.registryFile))
        if (!zipNeeded && !dataNeeded) {
            prompt?.finish(null)
            return OnDemandOutcome.UpToDate(folder.pack)
        }

        return try {
            build(state, selection, hash, rules, status, species, speciesData, games, zipNeeded, enabledKey, items, siteItems)
        } catch (e: IOException) {
            buildFailed(e, installed, state, hash)
        } catch (e: JsonParseException) {
            buildFailed(e, installed, state, hash)
        } catch (e: IllegalStateException) {
            buildFailed(e, installed, state, hash)
        }
    }

    /**
     * Says which step failed and why, in words a player can act on. A zip that is broken is deleted: it would otherwise be reused at
     * every start and fail the same way each time.
     */
    private fun buildFailed(e: Exception, installed: Boolean, state: InstallState, hash: String): OnDemandOutcome {
        val during = stepName?.let { " while ${stepPhrase(it)}" } ?: ""
        folder.deleteQuietly(folder.staging, folder.zipStaging)
        val retry = if (e is InstallException && e.damagedDownload) {
            runCatching { Files.deleteIfExists(folder.zipFor(settings.modVersion)) }
            " It was deleted and is downloaded again at the next start."
        } else ""
        return keptOld(installed, "The update failed$during. ${describe(e)}$retry", state, hash)
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
        val entered = prompt.askForCode(code, damagedReason, DATA_LOSS_WARNING) { text -> validate(text) } ?: return null
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
        val entered = prompt.askForCode(code, LEGACY_CODE_REASON, DATA_LOSS_WARNING) { text -> validate(text) }?.trim() ?: run {
            log(LEGACY_CODE_REASON)
            return current
        }
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

    /** [revision] is the site's data revision the text is complete up to (species only), when it says. */
    private class Fetched(val text: String, val etag: String?, val revision: Long? = null)

    /**
     * The species download. With a cached copy of a known revision only the changes since it are asked for and applied to the copy, so
     * only the Pokemon that changed are downloaded. When the site cannot say what changed (or does not have the changes route, or its
     * answer does not fit the copy) the whole download is fetched as before, revalidated with its ETag.
     */
    private fun fetchSpecies(state: InstallState): Fetched {
        val cacheFile = folder.cache.resolve("species.json")
        val since = state.speciesRevision
        val cached = if (since != null && state.dataRevision != null && Files.isRegularFile(cacheFile)) {
            runCatching { Files.readString(cacheFile) }.getOrNull()
        } else null
        if (since != null && cached != null) {
            try {
                when (val changes = api.speciesChanges(since)) {
                    is SpeciesChanges.Delta -> {
                        if (changes.isEmpty) return Fetched(cached, state.dataRevision, since)
                        val patched = SpeciesChanges.apply(cached, changes)
                        Files.writeString(cacheFile, patched)
                        log(
                            "[on demand] Pokemon data: revision $since -> ${changes.dataRevision}, downloaded ${changes.forms.size} changed " +
                                "form(s), ${changes.removed.size} removed.",
                        )
                        return Fetched(patched, "rev-${changes.dataRevision}", changes.dataRevision)
                    }
                    is SpeciesChanges.Full -> log("[on demand] The site asks for all Pokemon data again (${changes.reason}).")
                }
            } catch (e: IOException) {
                log("[on demand] The changes since revision $since could not be read, so all Pokemon data is downloaded. ${describe(e)}")
            } catch (e: JsonParseException) {
                log("[on demand] The changes since revision $since do not fit the cached data, so all Pokemon data is downloaded. ${describe(e)}")
            }
        }
        val fetched = fetch("species", cacheFile, state.dataRevision) { api.speciesText(it) }
        // Downloaded or revalidated (a 304 keeps the copy), the body says which revision it is.
        return Fetched(fetched.text, fetched.etag, revisionOf(fetched.text))
    }

    /**
     * The items download (`/api/selector/items`), revalidated with its ETag. A site that does not have the route yet (404), or a failure,
     * is not a reason to keep the old pack: the copy in the cache is used when there is one, and otherwise no item files are built (the Mod
     * then registers the items its jar knows).
     */
    private fun fetchItems(state: InstallState): Fetched? {
        val cacheFile = folder.cache.resolve("items.json")
        return try {
            fetch("items", cacheFile, state.itemsEtag) { api.itemsText(it) }
        } catch (e: IOException) {
            val cached = if (Files.isRegularFile(cacheFile)) runCatching { Files.readString(cacheFile) }.getOrNull() else null
            log(
                if (e is ApiException && e.status == 404) "[on demand] The site has no items yet." + (if (cached != null) " The cached items are used." else "")
                else "[on demand] The items could not be downloaded. ${describe(e)}" + (if (cached != null) " The cached items are used." else ""),
            )
            cached?.let { Fetched(it, state.itemsEtag) }
        }
    }

    /** The items in `cache/` when the site cannot be reached; a copy put there by hand gets an ETag of its own so it is built once. */
    private fun offlineItems(state: InstallState): Fetched? {
        val file = folder.cache.resolve("items.json")
        if (!Files.isRegularFile(file)) return null
        val text = runCatching { Files.readString(file) }.getOrNull() ?: return null
        return Fetched(text, state.itemsEtag ?: "offline-${sha256(text)}")
    }

    /** Writes `registry.json` next to the pack when it would change. */
    private fun writeRegistry(items: Fetched?) {
        if (items == null) return
        val current = runCatching { Files.readString(folder.registryFile) }.getOrNull()
        if (current == items.text) return
        Files.createDirectories(folder.registryFile.parent)
        Files.writeString(folder.registryFile, items.text)
    }

    // ---- without the site ------------------------------------------------------------------------------------------------

    /** Set when this run could not reach the site and uses the data in `cache/` (downloaded earlier, or put there by the player). */
    private var offline = false

    private fun hasOfflineData(): Boolean =
        Files.isRegularFile(folder.cache.resolve("species.json")) && Files.isRegularFile(folder.cache.resolve("games.json"))

    /**
     * What the status would have said: published, the models from GitHub, and no refresh asked for (that needs the site). The zip already in
     * the cache is used when there is one; otherwise [downloadOfflineZip] tries [OnDemandSettings.offlineZipUrls] in order.
     */
    private fun offlineStatus(state: InstallState): SelectorApi.Status {
        val urls = settings.offlineZipUrls(settings.modVersion)
        return SelectorApi.Status(settings.modVersion, true, "v${settings.modVersion}", urls.firstOrNull(), null, state.refreshRevision)
    }

    /**
     * The species and games in `cache/`, as the downloads would have given them. Only a **newer** revision than the one installed counts as
     * new data: it gets ETags of its own, so the data is built (and once the site can be reached again those match nothing, so the changes
     * since its revision are asked for). The same or an older revision keeps the stored ETags and revision, so the data alone rebuilds nothing;
     * the pack is then built again only when it is missing, the mod was updated or the selection changed.
     */
    private fun readOfflineData(state: InstallState): Pair<Fetched, Fetched> {
        val speciesText = Files.readString(folder.cache.resolve("species.json"))
        val gamesText = Files.readString(folder.cache.resolve("games.json"))
        val revision = revisionOf(speciesText)
        val installedRevision = state.speciesRevision
        val newer = state.dataRevision == null || installedRevision == null || (revision != null && revision > installedRevision)
        log(
            "[on demand] Pokemon data from ${folder.cache}: revision ${revision ?: "unknown"}, installed ${installedRevision ?: "none"}" +
                if (newer) ", using it." else ", nothing new.",
        )
        return if (!newer) {
            Fetched(speciesText, state.dataRevision, installedRevision) to Fetched(gamesText, state.gamesEtag)
        } else {
            Fetched(speciesText, "offline-${sha256(speciesText)}", revision) to Fetched(gamesText, "offline-${sha256(gamesText)}")
        }
    }

    private fun sha256(text: String): String =
        java.security.MessageDigest.getInstance("SHA-256").digest(text.toByteArray(Charsets.UTF_8))
            .take(12).joinToString("") { "%02x".format(it) }

    /** Downloads the models of this version from the first of [OnDemandSettings.offlineZipUrls] that has them. */
    private fun downloadOfflineZip(zip: Path, onProgress: (Long, Long) -> Unit) {
        val urls = settings.offlineZipUrls(settings.modVersion)
        for ((index, url) in urls.withIndex()) {
            try {
                client.download(url, zip, onProgress)
                log("[on demand] Models downloaded from $url.")
                return
            } catch (e: ApiException) {
                if (e.status != 404 || index == urls.lastIndex) throw e
                log("[on demand] No models at $url, trying ${urls[index + 1]}.")
            }
        }
        throw IOException("There is no address to download the models from.")
    }

    /** The body's `dataRevision`. The site writes it first, so only the start is looked at rather than parsing the whole download twice. */
    private fun revisionOf(text: String): Long? =
        DATA_REVISION.find(text.take(256))?.groupValues?.get(1)?.toLongOrNull()
            ?: runCatching { SelectorData.parseSpecies(text).dataRevision?.toDoubleOrNull()?.toLong() }.getOrNull()

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
        items: Fetched?,
        siteItems: ItemSelection,
    ): OnDemandOutcome {
        step("Preparing your Pokemon…")
        val gamesData = SelectorData.parseGames(games.text)
        val built = PackDataBuilder.build(speciesData, gamesData, selection, rules, implementedTypes, settings.knownLang())
        if (built.problems.isNotEmpty()) throw IllegalStateException("the data has problems: ${built.problems.take(3)}")
        built.skipped.forEach { log("Skipped: $it") }
        if (built.unknownGames.isNotEmpty() || built.unknownForms.isNotEmpty()) {
            log("The code names ${built.unknownGames.size} game(s) and ${built.unknownForms.size} form(s) that do not exist; they are ignored.")
        }

        val dataFiles = built.files + siteItems.files
        if (siteItems.registered > 0) log("[on demand] items: ${siteItems.registered} registered, ${siteItems.needed.size} built for this selection.")

        if (canUpdateInPlace(state, zipNeeded)) {
            return updateInPlace(state, selection, hash, rules, status, species, speciesData, games, zipNeeded, enabledKey, built, dataFiles, items, siteItems)
        }

        // Versions before the zip was read in place unpacked all of it into zip.staging; a run that was stopped can have left that behind.
        if (Files.exists(folder.zipStaging)) step("Removing files left by an earlier run…")
        folder.deleteQuietly(folder.staging, folder.zipStaging)
        val keptFiles = linkedSetOf<String>()
        if (zipNeeded) {
            keptFiles += installZip(state, status, selection, speciesData, folder.staging, siteItems.folders)
        } else {
            if (Files.isDirectory(folder.pack)) folder.copyTree(folder.pack, folder.staging, exclude = state.generated.toSet())
            else Files.createDirectories(folder.staging)
            keptFiles += state.files.filter { it !in state.generated }
        }

        step("Writing data…")
        dataFiles.forEach { (path, text) -> folder.write(folder.staging, path, text) }
        folder.write(folder.staging, PackFolder.PACK_META, PackFolder.PACK_META_TEXT)
        val generated = dataFiles.keys + PackFolder.PACK_META

        step("Installing…", 1.0)
        folder.swap()
        writeRegistry(items)
        val newState = state.copy(
            lastDownloadedVersion = if (zipNeeded) settings.modVersion else state.lastDownloadedVersion,
            codeHash = hash,
            enabledKey = enabledKey,
            refreshRevision = maxOf(state.refreshRevision, status.refreshRevision),
            dataRevision = species.etag,
            speciesRevision = species.revision,
            gamesEtag = games.etag,
            itemsEtag = items?.etag,
            rulesVariant = rules.name.lowercase(),
            typesKey = typesKey,
            builderRevision = PackDataBuilder.REVISION,
            files = (keptFiles + generated).sorted(),
            generated = generated.sorted(),
        )
        InstallStateStore.save(folder.stateFile, newState)
        endSteps()
        log("Pack built: ${built.enabledForms} Pokemon enabled, ${built.disabledForms} left out, ${newState.files.size} files.")
        prompt?.finish(null)
        return OnDemandOutcome.Built(folder.pack, built.enabledForms, built.disabledForms, built.skipped)
    }

    /**
     * Whether the installed pack can be brought up to date in place, writing only what changed: there is a pack and a record of what this
     * client wrote into it, and the models (when they are needed at all) come from the same zip the pack was installed from. A new version,
     * a forced refresh or a lost state builds the whole pack again instead.
     */
    private fun canUpdateInPlace(state: InstallState, zipNeeded: Boolean): Boolean =
        folder.packExists() && state.generated.isNotEmpty() &&
            (!zipNeeded || (state.lastDownloadedVersion == settings.modVersion && Files.isRegularFile(folder.zipFor(settings.modVersion))))

    /**
     * Installs only the changes into the pack: the data files whose text changed are written and the ones no longer built are deleted; when
     * the Pokemon enabled changed, only the model files they newly need are copied out of the cached zip and the ones no longer needed are
     * deleted. Everything else in the pack is left as it is. The state is written last, so a run stopped half way is finished by the next,
     * which compares again.
     */
    private fun updateInPlace(
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
        built: PackDataBuilder.Result,
        dataFiles: Map<String, String>,
        items: Fetched?,
        siteItems: ItemSelection,
    ): OnDemandOutcome {
        val pack = folder.pack
        val oldModels = (state.files - state.generated.toSet()).toSet()
        var models = oldModels
        if (zipNeeded) {
            step("Reading the Pokemon models…")
            val enabled = Gms3.resolve(speciesData.applicable(selection), speciesData.selectableForms()).enabled
            models = ZipInstaller.open(folder.zipFor(settings.modVersion)).use { zip ->
                val plan = PrunePlanner.plan(enabled, zip.readFolders(), siteItems.folders)
                val wanted = plan.install.map { it.to }.toSet()
                val names = speciesData.speciesNames
                val added = plan.copy(install = plan.install.filter { it.to !in oldModels || TwinNames.mayRename(it.from, it.to, names) })
                step("Installing Pokemon models…", 0.0)
                zip.install(added, pack, names) { done, total -> prompt?.progress("Installing Pokemon models… $done/$total", done.toDouble() / total) }
                folder.deleteFiles(pack, (oldModels - wanted - SOUNDS_PATH).toList())
                log("[on demand] models: ${added.install.size} file(s) installed, ${(oldModels - wanted - SOUNDS_PATH).size} removed, ${wanted.size - added.install.size} kept.")
                val sounds = SoundsJsonBuilder.generate(wanted)
                if (sounds.isEmpty()) {
                    folder.deleteFiles(pack, listOf(SOUNDS_PATH))
                    wanted
                } else {
                    writeIfChanged(pack, SOUNDS_PATH, SoundsJsonBuilder.render(sounds))
                    wanted + SOUNDS_PATH
                }
            }
        }

        step("Writing data…")
        val files = dataFiles + (PackFolder.PACK_META to PackFolder.PACK_META_TEXT)
        val written = files.count { (path, text) -> writeIfChanged(pack, path, text) }
        val dropped = state.generated.filter { it !in files }
        folder.deleteFiles(pack, dropped)
        log("[on demand] data: ${written} file(s) changed, ${dropped.size} removed, ${files.size - written} unchanged.")

        writeRegistry(items)
        val generated = files.keys
        val newState = state.copy(
            codeHash = hash,
            enabledKey = enabledKey,
            refreshRevision = maxOf(state.refreshRevision, status.refreshRevision),
            dataRevision = species.etag,
            speciesRevision = species.revision,
            gamesEtag = games.etag,
            itemsEtag = items?.etag,
            rulesVariant = rules.name.lowercase(),
            typesKey = typesKey,
            builderRevision = PackDataBuilder.REVISION,
            files = (models + generated).sorted(),
            generated = generated.sorted(),
        )
        InstallStateStore.save(folder.stateFile, newState)
        endSteps()
        log("Pack updated: ${built.enabledForms} Pokemon enabled, ${built.disabledForms} left out, ${newState.files.size} files.")
        prompt?.finish(null)
        return OnDemandOutcome.Built(pack, built.enabledForms, built.disabledForms, built.skipped)
    }

    /** Writes [text] to [relative] under [dir] unless the file already holds exactly it. Returns whether it was written. */
    private fun writeIfChanged(dir: Path, relative: String, text: String): Boolean {
        val current = dir.resolve(relative)
        if (Files.isRegularFile(current) && runCatching { Files.readString(current) }.getOrNull() == text) return false
        folder.write(dir, relative, text)
        return true
    }

    /**
     * Downloads (or reuses) the zip and installs the files [selection] keeps into [target], straight from the zip. Returns the install
     * paths written.
     */
    private fun installZip(
        state: InstallState,
        status: SelectorApi.Status,
        selection: Gms3.Selection,
        species: SelectorData.Species,
        target: Path,
        itemFolders: Set<String>,
    ): List<String> {
        val zip = folder.zipFor(settings.modVersion)
        if (!Files.isRegularFile(zip)) {
            val url = status.zipUrl ?: throw IOException("The site did not say where the models are.")
            step("Downloading Pokemon models…", 0.0)
            var lastPercent = -1
            val onProgress = { done: Long, total: Long ->
                if (total > 0) {
                    val percent = (done * 100 / total).toInt()
                    if (percent != lastPercent) {
                        lastPercent = percent
                        prompt?.progress("Downloading Pokemon models… $percent%", done.toDouble() / total)
                    }
                }
            }
            if (offline) downloadOfflineZip(zip, onProgress) else client.download(url, zip, onProgress)
            folder.deleteOtherZips(zip)
            // The refresh the site asked for (or the config's forced update) is done as far as the download goes. Saying so now means a
            // run that is stopped later reuses this zip, instead of deleting it and downloading everything again at every start. The rest
            // of the state still says the pack is out of date, so the next run installs from this zip.
            InstallStateStore.save(folder.stateFile, state.copy(refreshRevision = maxOf(state.refreshRevision, status.refreshRevision)))
            if (settings.forceUpdate) settings.forceUpdateDone()
        }
        step("Reading the Pokemon models…")
        val enabled = Gms3.resolve(species.applicable(selection), species.selectableForms()).enabled
        val installed = ZipInstaller.open(zip).use { models ->
            val plan = PrunePlanner.plan(enabled, models.readFolders(), itemFolders)
            step("Installing Pokemon models…", 0.0)
            log("[on demand] installing ${plan.install.size} files for ${enabled.size} Pokemon forms.")
            var lastPercent = -1
            models.install(plan, target, species.speciesNames) { done, total ->
                val percent = done * 100 / total
                if (percent != lastPercent) {
                    lastPercent = percent
                    prompt?.progress("Installing Pokemon models… $done/$total", done.toDouble() / total)
                }
            }
        }.toMutableList()
        val sounds = SoundsJsonBuilder.generate(installed)
        if (sounds.isNotEmpty()) {
            folder.write(target, SOUNDS_PATH, SoundsJsonBuilder.render(sounds))
            installed += SOUNDS_PATH
        }
        return installed
    }

    // ---- steps ---------------------------------------------------------------------------------------------------------------

    private var stepName: String? = null
    private var stepStarted = 0L

    /** Shows [text] and logs it with how long the step before took, so a log shows where the time of a slow start went. */
    private fun step(text: String, fraction: Double? = null) {
        val previous = finishedStep()
        log(if (previous == null) "[on demand] $text" else "[on demand] $text ($previous)")
        stepName = text
        stepStarted = System.nanoTime()
        prompt?.progress(text, fraction)
    }

    private fun endSteps() {
        finishedStep()?.let { log("[on demand] $it") }
        stepName = null
    }

    private fun finishedStep(): String? {
        val name = stepName ?: return null
        val seconds = (System.nanoTime() - stepStarted) / 1_000_000 / 1000.0
        return "\"${name.trimEnd('…')}\" took ${"%.1f".format(java.util.Locale.ROOT, seconds)} s"
    }

    // ---- when it cannot be done ------------------------------------------------------------------------------------------

    private fun keptOld(installed: Boolean, reason: String, state: InstallState, hash: String): OnDemandOutcome {
        val different = state.codeHash != null && state.codeHash != hash
        val message = buildString {
            append(reason)
            append(if (installed) " The Pokemon installed earlier are used." else " No Pokemon have been downloaded.")
            if (different && installed) append(" They were downloaded for a different selection than the one in your config.")
        }
        endSteps()
        log(message)
        prompt?.finish(message)
        return OnDemandOutcome.KeptOld(if (installed) folder.pack else null, message)
    }

    companion object {
        const val SELECTOR_URL = "https://submit.gravelmon.com/pokemon-selector"
        const val MODELS_REPOSITORY = "Gravelmon/Gravelmon-Models"

        /** The models of [version] on GitHub: the tag the site publishes it under, then the branch it serves while tags are not used. */
        fun githubZipUrls(version: String): List<String> = listOf(
            "https://github.com/$MODELS_REPOSITORY/archive/refs/tags/v$version.zip",
            "https://github.com/$MODELS_REPOSITORY/archive/refs/heads/main.zip",
        )

        const val OFFLINE_HELP =
            "If the site is blocked where you are, open $SELECTOR_URL (with a VPN), use \"Download offline cache\" on the last step and " +
                "extract the zip into your game folder: the Pokemon models then come from GitHub."

        /**
         * The code of "Include everything": every game and every status on, nothing picked one by one. It is what the prompt answers when the
         * player skips choosing, and it is written to the config like any other code, so they are not asked again.
         */
        val EVERYTHING_CODE: String = Gms3.encode(Gms3.Selection.EMPTY)
        const val SOUNDS_PATH = "assets/cobblemon/sounds.json"

        private val DATA_REVISION = Regex("^\\{\\s*\"dataRevision\"\\s*:\\s*(\\d+)")

        const val DATA_LOSS_WARNING =
            "Pokemon of a species you leave out are permanently deleted from your worlds, including from your PC. Back up your worlds first."

        const val LEGACY_CODE_REASON =
            "Your selection code uses an old format (GMS2). Select again at $SELECTOR_URL to get a new code (GMS3) and paste it here: " +
                "with it, Pokemon whose models are finished later are added without choosing them again. " +
                "Pressing Continue keeps your current code for now, and you will be asked again at the next start."

        const val SELECTOR_HELP =
            "Create a selection at $SELECTOR_URL, paste the code into `selectionCode` in config/gravels-extended-battles.toml, then restart."

        private const val IN_USE_HINT =
            "Another program may be holding it open (File Explorer, antivirus, OneDrive or a second Minecraft): close it and restart the game."

        /** The step a failure happened in, from the text [step] showed: "Writing data…" is "writing data". */
        internal fun stepPhrase(step: String): String = when (step) {
            "Installing…" -> "putting the new Pokemon pack in place"
            "Preparing your Pokemon…" -> "preparing the Pokemon data"
            else -> step.trimEnd('…').replaceFirstChar { it.lowercase() }
        }

        /** What went wrong, as one or two sentences: the file and the likely reason for a file error, the message otherwise. */
        internal fun describe(e: Throwable): String {
            val text = e.message?.trim()?.takeIf { it.isNotEmpty() }
            return sentence(
                when (e) {
                    is AccessDeniedException -> "${e.file} could not be changed: access was denied. $IN_USE_HINT"
                    is NoSuchFileException -> "${e.file} is missing"
                    is FileAlreadyExistsException -> "${e.file} is in the way and could not be replaced. $IN_USE_HINT"
                    is FileSystemException -> {
                        val reason = e.reason.orEmpty()
                        when {
                            reason.contains("another process", ignoreCase = true) -> "${e.file} is in use. $IN_USE_HINT"
                            isDiskFull(reason) -> "The disk is full (writing ${e.file})"
                            else -> "${e.file}: ${reason.ifEmpty { "a file error" }}"
                        }
                    }
                    is ApiException -> "A download failed: ${text ?: "no reason given"}"
                    is JsonParseException -> "The downloaded data is not valid: ${text ?: "no reason given"}"
                    else -> when {
                        text != null && isDiskFull(text) -> "The disk is full"
                        text != null -> text.replaceFirstChar { it.uppercase() }
                        else -> "${e.javaClass.simpleName} (no message)"
                    }
                },
            )
        }

        private fun isDiskFull(text: String) = text.contains("not enough space", ignoreCase = true) || text.contains("no space left", ignoreCase = true)

        private fun sentence(text: String) = if (text.endsWith('.') || text.endsWith('!') || text.endsWith('?')) text else "$text."

        fun noSelectionMessage(damagedReason: String?): String {
            val problem = if (damagedReason == null) "No Pokemon selection is set." else "The Pokemon selection in the config is not valid ($damagedReason)."
            return "$problem Create one at $SELECTOR_URL, paste the code into `selectionCode` in config/gravels-extended-battles.toml, then restart the server. $DATA_LOSS_WARNING"
        }
    }
}
