package drai.dev.gravelsextendedbattles.config

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import eu.midnightdust.lib.config.MidnightConfig

object GEBConfig : MidnightConfig() {

    @Entry(name = "Banned Labels: ")
    var bannedLabels: MutableList<String> = mutableListOf("not_modeled", "joke")
    
    @Entry(name = "Banned Pokemon: ")
    var bannedPokemon: MutableList<String> = mutableListOf()

    fun getBannedPokemonProperties(): MutableList<PokemonProperties> {
        return bannedPokemon.map { PokemonProperties.parse(it) }.toMutableList()
    }
    
    @Entry(name = "Allowed Labels: ")
    var allowedLabels: MutableList<String> = mutableListOf()

    @Entry(name = "Spawn Modifiers (Formatted as <label>:<modifier number>, eg 'delta:1.5'): ")
    private var _spawnModifiers: MutableList<String> = mutableListOf()
    val spawnModifiers: MutableList<SpawnModifier>
        get() = _spawnModifiers.map { it.split(":") }.map { SpawnModifier(it[1].toFloat(), it[0]) }.toMutableList()

    @Entry(name = "Passwords: ")
    var passwords: MutableList<String> = mutableListOf()

    @Entry(name = "Allowed Types: ")
    var implementedTypes: List<String> = getInitForTypes()

    @Entry(name = "Original Fangame Typings: ")
    var enableFangameTypechart: Boolean = false

    @Entry(name = "Re-sort pokedex in evolution order: ")
    var resortPokedexInEvolutionOrder: Boolean = false

    @Entry(name = "Add Starters to the starter screen: ")
    var addStartersToTheStarterScreen: Boolean = true

    @Entry(name = "Enable automatic move insertion: ")
    var enableAutomaticMoveInsertion: Boolean = true

    @Entry(name = "Enable automatic move insertion: ")
    var battleDebugging: Boolean = false

        fun getInitForTypes(): List<String> = listOf(
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