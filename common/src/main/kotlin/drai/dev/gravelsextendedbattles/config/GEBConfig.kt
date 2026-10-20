package drai.dev.gravelsextendedbattles.config

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.pokemon.RenderablePokemon
import com.electronwill.nightconfig.core.file.CommentedFileConfig
import com.electronwill.nightconfig.core.file.FileNotFoundAction
import com.electronwill.nightconfig.core.io.ParsingException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

object GEBConfig {

    private val CONFIG_PATH: Path =
        Path.of("config", "gravels-extended-battles.toml")

    private lateinit var config: CommentedFileConfig

    /**
     * The Pokemon selection made on https://submit.gravelmon.com/pokemon-selector (a `GMS3.` code). Gravelmon downloads only
     * what it names. Empty until one is made: a client asks for it at startup, a dedicated server refuses to start without it.
     */
    @JvmField
    var selectionCode: String = ""

    /** Which implementation of the Pokemon is built: `rebalanced` (the default) or `faithful`. */
    @JvmField
    var rules: String = "rebalanced"

    /** One-shot: when true, the next start downloads everything again, ignoring caches. Reset to false once the update has succeeded. */
    @JvmField
    var forceUpdate: Boolean = false

    /** Every Gravelmon item gets its recipes, textures, ores and models, not only the ones the selected Pokemon need. */
    @JvmField
    var allItems: Boolean = false

    // Empty by default: what exists is decided by the selection (selectionCode), whose presets say whether unmodeled Pokemon are included.
    // A config file written earlier keeps the labels it has.
    @JvmField
    var bannedLabels: MutableList<String> =
        mutableListOf()

    @JvmField
    var allowedLabels: MutableList<String> =
        mutableListOf()

    @JvmField
    var spawnModifiers: MutableList<String> =
        mutableListOf()

    @JvmField
    var implementedTypes: MutableList<String> =
        getInitForTypes().toMutableList()

    @JvmField
    var enableFangameTypechart: Boolean = false

    @JvmField
    var resortPokedexInEvolutionOrder: Boolean = false

    @JvmField
    var battleDebugging: Boolean = false

    @JvmField
    var bannedPokemon: MutableList<String> =
        mutableListOf()

    private var bannedRenderablePokemon: List<RenderablePokemon>? = null

    /**
     * Loads the configuration from disk.
     *
     * If the config does not exist, it is created with the default values.
     */
    @JvmStatic
    fun load() {
        config = buildConfig()

        try {
            config.load()
        } catch (e: ParsingException) {
            // A hand-edited file with invalid TOML (e.g. a key defined twice) must not stop the game from starting:
            // keep a copy of it and carry on with the defaults, which are written back below.
            val backup = CONFIG_PATH.resolveSibling(CONFIG_PATH.fileName.toString() + ".broken")
            println("Gravel's Extended Battles: could not parse $CONFIG_PATH (${e.message}); moved it to $backup and using defaults.")
            config.close()
            Files.move(CONFIG_PATH, backup, StandardCopyOption.REPLACE_EXISTING)
            config = buildConfig()
            config.load()
        }

        selectionCode = config.getOrElse("selectionCode", selectionCode)

        rules = config.getOrElse("rules", rules)

        forceUpdate = config.getOrElse("forceUpdate", forceUpdate)

        allItems = config.getOrElse("allItems", allItems)

        bannedLabels = config.getOrElse(
            "bannedLabels",
            bannedLabels
        )

        allowedLabels = config.getOrElse(
            "allowedLabels",
            allowedLabels
        )

        spawnModifiers = config.getOrElse(
            "spawnModifiers",
            spawnModifiers
        )

        implementedTypes = config.getOrElse(
            "implementedTypes",
            implementedTypes
        )

        enableFangameTypechart = config.getOrElse(
            "enableFangameTypechart",
            enableFangameTypechart
        )

        resortPokedexInEvolutionOrder = config.getOrElse(
            "resortPokedexInEvolutionOrder",
            resortPokedexInEvolutionOrder
        )

        battleDebugging = config.getOrElse(
            "battleDebugging",
            battleDebugging
        )

        bannedPokemon = config.getOrElse(
            "bannedPokemon",
            bannedPokemon
        )

        try {
            writeValues()
        } catch (e: Exception) {
            // Writing back the defaults and comments is a convenience: a file that cannot be written must not stop the game from starting.
            println("Gravel's Extended Battles: could not write ${configFile()} (${e.message}).")
        }
    }

    // Synchronous: the default asynchronous config writes on a daemon thread after a delay and drops any error, so a value saved
    // just before the game stops (or a write that fails, e.g. while another program holds the file) was silently lost.
    private fun buildConfig(): CommentedFileConfig =
        CommentedFileConfig
            .builder(CONFIG_PATH)
            .onFileNotFound(FileNotFoundAction.CREATE_EMPTY)
            .sync()
            .build()

    /** The config file, as an absolute path, for messages. */
    @JvmStatic
    fun configFile(): Path = CONFIG_PATH.toAbsolutePath().normalize()

    /**
     * Saves the current configuration to disk, before returning. Throws when the file cannot be written.
     */
    @JvmStatic
    fun save() {
        check(::config.isInitialized) {
            "GEBConfig has not been loaded yet!"
        }

        writeValues()
    }

    private fun writeValues() {
        config.bulkCommentedUpdate {
            it.set<String>("selectionCode", selectionCode)
            it.set<String>("rules", rules)
            it.set<Boolean>("forceUpdate", forceUpdate)
            it.set<Boolean>("allItems", allItems)
            it.set<MutableList<String>>("bannedLabels", bannedLabels)
            it.set<MutableList<String>>("allowedLabels", allowedLabels)
            it.set<MutableList<String>>("spawnModifiers", spawnModifiers)
            it.set<MutableList<String>>("implementedTypes", implementedTypes)
            it.set<Boolean>(
                "enableFangameTypechart",
                enableFangameTypechart
            )
            it.set<Boolean>(
                "resortPokedexInEvolutionOrder",
                resortPokedexInEvolutionOrder
            )
            it.set<Boolean>("battleDebugging", battleDebugging)
            it.set<MutableList<String>>("bannedPokemon", bannedPokemon)

            it.setComment(
                listOf("selectionCode"),
                "Which Pokemon to download: the code made at https://submit.gravelmon.com/pokemon-selector. A client asks for it when it is empty; a dedicated server will not start without it. Changing it re-downloads what is needed on the next start. Pokemon of a species you leave out are permanently deleted from your worlds, so back them up first."
            )

            it.setComment(
                listOf("rules"),
                "Which version of the Pokemon to build: \"rebalanced\" (the default) or \"faithful\"."
            )

            it.setComment(
                listOf("forceUpdate"),
                "Set to true to make the next start download the Pokemon data and models again, ignoring everything cached (for example after editing the model repository by hand). It resets itself to false once the update has succeeded."
            )

            it.setComment(
                listOf("allItems"),
                "Set to true to get every Gravelmon item (its recipes, textures, ores and models), not only the ones the Pokemon of your selection need. Every item is always registered either way, so worlds and servers are not affected. Changing it rebuilds the pack on the next start."
            )

            it.setComment(
                listOf("bannedLabels"),
                "Labels that should never be used."
            )

            it.setComment(
                listOf("allowedLabels"),
                "Labels that are explicitly allowed."
            )

            it.setComment(
                listOf("spawnModifiers"),
                "Spawn modifiers formatted as <label>:<modifier number>, e.g. \"delta:1.5\"."
            )

            it.setComment(
                listOf("implementedTypes"),
                "Types that are implemented by Gravel's Extended Battles."
            )

            it.setComment(
                listOf("enableFangameTypechart"),
                "Use the original fangame type chart instead of the standard Cobblemon type chart."
            )

            it.setComment(
                listOf("resortPokedexInEvolutionOrder"),
                "Re-sort the Pokédex in evolution order."
            )

            it.setComment(
                listOf("battleDebugging"),
                "Enable outputting Showdown battle logs."
            )

            it.setComment(
                listOf("bannedPokemon"),
                "Pokémon that should be banned."
            )
        }

        config.save()
    }

    @JvmStatic
    fun getBannedPokemonProperties(): List<RenderablePokemon> {
        bannedRenderablePokemon?.let {
            return it
        }

        return bannedPokemon
            .map(PokemonProperties.Companion::parse)
            .map(PokemonProperties::asRenderablePokemon)
            .also {
                bannedRenderablePokemon = it
            }
    }

    @JvmStatic
    fun getEnableOriginalFanGameTypings(): Boolean {
        return enableFangameTypechart
    }

    @JvmStatic
    fun getEnableDexResort(): Boolean {
        return resortPokedexInEvolutionOrder
    }

    @JvmStatic
    fun getAllowedLabels(): List<String> {
        return allowedLabels
    }

    @JvmStatic
    fun getSpawnModifiers(): List<SpawnModifier> {
        return spawnModifiers.mapNotNull { raw ->
            val parts = raw.split(":")

            if (parts.size < 2) {
                println("Invalid spawn modifier format: $raw")
                return@mapNotNull null
            }

            try {
                SpawnModifier(
                    parts[1].toFloat(),
                    parts[0]
                )
            } catch (e: NumberFormatException) {
                println("Invalid spawn modifier value: $raw")
                null
            }
        }
    }

    @JvmStatic
    fun getImplementedTypes(): List<String> {
        return implementedTypes
    }

    @JvmStatic
    fun unmuteBattleLogs(): Boolean {
        return battleDebugging
    }

    /**
     * Clears cached values which are derived from the config.
     *
     * Call this after changing bannedPokemon.
     */
    @JvmStatic
    fun invalidateCaches() {
        bannedRenderablePokemon = null
    }

    private fun getInitForTypes(): List<String> {
        return listOf(
            "normal",
            "fire",
            "water",
            "grass",
            "electric",
            "ice",
            "fighting",
            "poison",
            "ground",
            "flying",
            "psychic",
            "bug",
            "rock",
            "ghost",
            "dragon",
            "dark",
            "steel",
            "fairy",
            "cosmic",
            "crystal",
            "digital",
            "light",
            "nuclear",
            "plastic",
            "mystery",
            "shadow",
            "slime",
            "sound",
            "wind",
            "eldritch",
            "blood"
        )
    }

    init {
        load()
    }
}