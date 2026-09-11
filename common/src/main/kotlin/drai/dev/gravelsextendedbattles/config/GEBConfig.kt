package drai.dev.gravelsextendedbattles.config

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.pokemon.RenderablePokemon
import com.electronwill.nightconfig.core.file.CommentedFileConfig
import com.electronwill.nightconfig.core.file.FileNotFoundAction
import java.nio.file.Path

object GEBConfig {

    private val CONFIG_PATH: Path =
        Path.of("config", "gravels-extended-battles.toml")

    private lateinit var config: CommentedFileConfig

    @JvmField
    var bannedLabels: MutableList<String> =
        mutableListOf("not_modeled", "joke")

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
        config = CommentedFileConfig
            .builder(CONFIG_PATH)
            .onFileNotFound(FileNotFoundAction.CREATE_EMPTY)
            .build()

        config.load()

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

        writeValues()
    }

    /**
     * Saves the current configuration to disk.
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