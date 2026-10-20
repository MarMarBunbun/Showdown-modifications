package drai.dev.gravelsextendedbattles.ondemand

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.config.GEBConfig
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
 * On a client it may ask for a code and shows the download; a dedicated server cannot ask, so without a valid code it **stops the game
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

    @JvmStatic
    fun run() {
        System.getProperty(DEV_PACK_PROPERTY)?.takeIf { it.isNotBlank() }?.let {
            val dir = Path.of(it).toAbsolutePath().normalize()
            log.info("Using the development pack at {} instead of downloading.", dir)
            packDir = dir.takeIf { path -> Files.isDirectory(path) }
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
        val prompt = if (dedicated) null else createPrompt()
        val forceProperty = System.getProperty(FORCE_PROPERTY).toBoolean()
        val force = forceProperty || GEBConfig.forceUpdate
        val client = ApiClient(userAgent = "GravelsExtendedBattles/${GravelsExtendedBattles.MOD_ID}")
        val runner = OnDemandRunner(
            OnDemandSettings(
                gameDir = gameDir,
                modVersion = version,
                dedicatedServer = dedicated,
                rules = GEBConfig.rules,
                readCode = { GEBConfig.selectionCode },
                writeCode = {
                    GEBConfig.selectionCode = it
                    GEBConfig.save()
                },
                forceUpdate = force,
                implementedTypes = GEBConfig.getImplementedTypes(),
            ),
            SelectorApi(client),
            client,
            prompt,
            { log.info(it) },
        )
        val outcome = try {
            runner.run()
        } catch (e: Exception) {
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
                    GEBConfig.save()
                }
            }
            is OnDemandOutcome.KeptOld -> {
                log.warn(outcome.reason)
                packDir = outcome.packDir
            }
        }
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
