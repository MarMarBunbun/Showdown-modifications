package drai.dev.GEBConfig

import eu.midnightdust.lib.config.MidnightConfig
import net.minecraft.resources.ResourceLocation

object GEBConfig : MidnightConfig() {

    @Entry(name = "Banned Labels: ")
    var bannedLabels: MutableList<String> = mutableListOf("not_modeled", "joke")
    
    @Entry(name = "Banned IDs: ")
    var bannedIds: MutableList<String> = mutableListOf()

    fun getBannedResourceLocations(): MutableList<ResourceLocation?> {
        return bannedIds.map { ResourceLocation.tryParse(it) }.toMutableList()
    }
    
    @Entry(name = "Allowed Labels: ")
    var allowedLabels: MutableList<String> = mutableListOf()

    @Entry(name = "Spawn Modifiers (Formatted as <label>:<modifier number>, eg 'delta:1.5'): ")
    var spawnModifiers: MutableList<String> = mutableListOf()

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

    fun getSpawnModifierInstances(): List<SpawnModifier> =
        spawnModifiers.map { raw ->
            val parts = raw.split(":")

            if (parts.size < 2) {
                println("Invalid spawn modifier format: $raw")
            }

            SpawnModifier(parts[0].toFloat(), parts[1])
        }

    
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