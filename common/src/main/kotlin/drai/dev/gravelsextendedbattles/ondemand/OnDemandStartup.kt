package drai.dev.gravelsextendedbattles.ondemand

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.config.GEBConfig
import drai.dev.gravelsextendedbattles.ondemand.prompt.LazySelectionPrompt
import drai.dev.gravelsextendedbattles.ondemand.prompt.NativeSelectionPrompt
import drai.dev.gravelsextendedbattles.ondemand.prompt.ProcessSelectionPrompt
import net.minecraft.network.chat.Component
import net.minecraft.server.packs.PackLocationInfo
import net.minecraft.server.packs.PackSelectionConfig
import net.minecraft.server.packs.PackType
import net.minecraft.server.packs.PathPackResources
import net.minecraft.server.packs.repository.Pack
import net.minecraft.server.packs.repository.PackSource
import net.minecraft.server.packs.repository.RepositorySource
import java.nio.file.Files
import java.nio.file.Path
import java.util.Optional
import java.util.function.Consumer

/**
 * The entry point of the download (plan, section 2): called at the head of [GravelsExtendedBattles.initialize], after the config has loaded
 * and before Gravelmon registers its items. It does nothing unless Gravelmon is loaded.
 *
 * On a client it asks for a code when there is no valid one (and then shows the download in that window, else only logs it); a dedicated server cannot ask, so without a valid code it **stops the game
 * from starting** by throwing. Every other problem keeps the pack that was installed before and lets the game start.
 *
 * `-Dgravelmon.devPack=<folder>` skips all of it and uses that folder as the pack, for development with data on disk.
 */
object OnDemandStartup {
    private val log = GravelsExtendedBattles.LOGGER
    private const val GRAVELMON = "gravelmon"
    private const val DEV_PACK_PROPERTY = "gravelmon.devPack"
    private const val FORCE_PROPERTY = "gravelmon.forceUpdate"

    /** The folder the loaders register as a pack, or null when there is none. Set by [run]. */
    @Volatile
    @JvmStatic
    var packDir: Path? = null
        private set

    /**
     * `registry.json`: every Gravelmon item the site defines, which the Mod registers whatever the selection (items plan, section 6). Set by
     * [run]; with the dev switch it is the `registry.json` next to the dev pack folder, if there is one. The file may not exist (offline first
     * start, a site without items): the Mod then registers what its jar knows.
     */
    @Volatile
    @JvmStatic
    var registryFile: Path? = null
        private set

    @JvmStatic
    fun run() {
        System.getProperty(DEV_PACK_PROPERTY)?.takeIf { it.isNotBlank() }?.let {
            val dir = Path.of(it).toAbsolutePath().normalize()
            log.info("Using the development pack at {} instead of downloading.", dir)
            packDir = dir.takeIf { path -> Files.isDirectory(path) }
            registryFile = dir.parent?.resolve("registry.json")
            return
        }
        if (!GravelsExtendedBattles.modIsLoaded(GRAVELMON)) return
        val version = GravelsExtendedBattles.modVersion(GRAVELMON)?.let(Versions::release)
        if (version == null) {
            log.warn("Gravelmon's version is not x.y.z, so no Pokemon are downloaded.")
            return
        }
        val dedicated = GravelsExtendedBattles.isDedicatedServer()
        val gameDir = GravelsExtendedBattles.gameDirectory()
        val folder = PackFolder(gameDir)
        registryFile = folder.registryFile
        // The window opens only when a code has to be entered; otherwise the download is only logged.
        val prompt = if (dedicated) null else LazySelectionPrompt(::createPrompt) { log.info(it) }
        val forceProperty = System.getProperty(FORCE_PROPERTY).toBoolean()
        val force = forceProperty || GEBConfig.forceUpdate
        val client = ApiClient(userAgent = "GravelsExtendedBattles/${GravelsExtendedBattles.MOD_ID}")
        val runner = OnDemandRunner(
            OnDemandSettings(
                gameDir = gameDir,
                modVersion = version,
                dedicatedServer = dedicated,
                rules = GEBConfig.rules,
                allItems = GEBConfig.allItems,
                readCode = { GEBConfig.selectionCode },
                writeCode = {
                    GEBConfig.selectionCode = it
                    if (saveConfig("the selection code")) log.info("[on demand] Saved the selection code to {}.", GEBConfig.configFile())
                },
                forceUpdate = force,
                forceUpdateDone = {
                    if (GEBConfig.forceUpdate) {
                        GEBConfig.forceUpdate = false
                        saveConfig("forceUpdate = false")
                    }
                },
                implementedTypes = GEBConfig.getImplementedTypes(),
                knownLang = ::shippedLangKeys,
            ),
            SelectorApi(client),
            client,
            prompt,
            { log.info(it) },
        )
        val outcome = try {
            runner.run()
        } catch (e: Throwable) {
            // Errors too (out of memory, a stack overflow): the window must close, or it stays up while the game goes on or crashes behind it.
            log.error("The Pokemon download failed unexpectedly; the pack installed earlier is used.", e)
            prompt?.finish(null)
            OnDemandOutcome.KeptOld(if (folder.packExists()) folder.pack else null, "unexpected error")
        }
        when (outcome) {
            is OnDemandOutcome.Refused -> {
                log.error("\n{}\n  {}\n{}", BAR, outcome.message, BAR)
                throw IllegalStateException(outcome.message)
            }
            is OnDemandOutcome.UpToDate -> packDir = outcome.packDir
            is OnDemandOutcome.Built -> {
                packDir = outcome.packDir
                if (GEBConfig.forceUpdate) {
                    GEBConfig.forceUpdate = false
                    saveConfig("forceUpdate = false")
                }
            }
            is OnDemandOutcome.KeptOld -> {
                log.warn(outcome.reason)
                packDir = outcome.packDir
            }
        }
    }

    /**
     * Saves the config, and says so in the log when it cannot be written rather than stopping the startup: what was changed still applies to
     * this start. Returns whether it was saved.
     */
    private fun saveConfig(what: String): Boolean = try {
        GEBConfig.save()
        true
    } catch (e: Exception) {
        log.error(
            "Could not save {} to {}: it applies to this start only. Close any program that has the file open, or set it there by hand.",
            what, GEBConfig.configFile(), e,
        )
        false
    }

    /** The keys of every `cobblemon` language file on the class path (Cobblemon's, Gravelmon's, ...); none when they cannot be read. */
    private fun shippedLangKeys(): Set<String> {
        val keys = HashSet<String>()
        val loaders = listOfNotNull(OnDemandStartup::class.java.classLoader, Thread.currentThread().contextClassLoader).distinct()
        val urls = loaders.flatMap { loader ->
            runCatching { loader.getResources(SpeciesFileBuilder.LANG_PATH).toList() }.getOrDefault(emptyList())
        }.distinctBy { it.toString() }
        for (url in urls) {
            try {
                val root = url.openStream().use { com.google.gson.JsonParser.parseReader(it.reader(Charsets.UTF_8)) }
                if (root.isJsonObject) keys += root.asJsonObject.keySet()
            } catch (e: Exception) {
                log.warn("[on demand] could not read the language file {}: {}", url, e.toString())
            }
        }
        log.info("[on demand] {} language keys found in {} shipped language file(s).", keys.size, urls.size)
        return keys
    }

    private const val BAR = "========================================================================"

    /**
     * A window in a JVM of its own on Windows and Linux (AWT cannot be used in the game's JVM), the native input box on macOS, and nothing where
     * neither works: the instructions go to the log and the game starts without asking.
     */
    private fun createPrompt(): SelectionPrompt? {
        val mac = System.getProperty("os.name", "").lowercase().contains("mac")
        val prompt = if (mac) NativeSelectionPrompt.create { log.info(it) } ?: ProcessSelectionPrompt.start(log = { log.warn(it) })
        else ProcessSelectionPrompt.start(log = { log.warn(it) })
        if (prompt == null) log.warn("No window can be shown for the Pokemon selection. {}", OnDemandRunner.SELECTOR_HELP)
        return prompt
    }

    /**
     * A source for Minecraft's pack repository that offers the downloaded pack for [type]. The folder is looked up each time the repository scans, not when
     * the source is created: the client's repository is built before the startup has downloaded anything.
     */
    @JvmStatic
    fun packSource(type: PackType): RepositorySource {
        return RepositorySource { consumer: Consumer<Pack> ->
            val dir = packDir?.takeIf { Files.isRegularFile(it.resolve(PackFolder.PACK_META)) }
            if (dir == null) {
                log.info("[on demand] no downloaded pack to offer as a {} pack yet (packDir={}).", type, packDir)
                return@RepositorySource
            }
            val info = PackLocationInfo("gravelmon_downloaded", Component.literal("Gravelmon Pokémon (downloaded)"), PackSource.BUILT_IN, Optional.empty())
            val pack = Pack.readMetaAndCreate(
                info,
                object : Pack.ResourcesSupplier {
                    override fun openPrimary(info: PackLocationInfo) = PathPackResources(info, dir)
                    override fun openFull(info: PackLocationInfo, metadata: Pack.Metadata) = PathPackResources(info, dir)
                },
                type,
                PackSelectionConfig(true, Pack.Position.TOP, false),
            )
            if (pack == null) {
                log.error("The downloaded Pokemon pack at {} could not be read as a {} pack.", dir, type)
            } else {
                log.info("[on demand] offering the downloaded pack as a {} pack (compatibility: {}).", type, pack.compatibility)
                consumer.accept(pack)
            }
        }
    }
}
