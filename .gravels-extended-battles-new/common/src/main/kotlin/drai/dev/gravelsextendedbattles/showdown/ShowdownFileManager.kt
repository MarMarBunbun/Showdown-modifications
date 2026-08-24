package drai.dev.gravelsextendedbattles.showdown

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.StandardCopyOption

object ShowdownFileManager {

    private val showdownFiles = listOf(
        "abilities.js",
        "conditions.js",
        "items.js",
        "moves.js",
        "pokedex.js",
        "scripts.js",
        "tags.js"
    )

    private const val FAN_GAME_TYPE_CHART = "typechart2.js"
    private const val GEB_TYPE_CHART = "typechart.js"

    fun injectShowdown() {
        val showdownFolder = Path.of(
            ShowdownFolderLocator.getShowdownFolder()
        )

        exportShowdownFiles(showdownFolder)
        injectStage2(showdownFolder)

        injectTypeChart(showdownFolder)
    }

    private fun exportShowdownFiles(showdownFolder: Path) {
        showdownFiles.forEach { resource ->
            exportResource(showdownFolder, resource)
        }
    }

    private fun injectTypeChart(showdownFolder: Path) {
        if (GravelsExtendedBattles.CONFIG.enableFangameTypechart) {
            exportResource(showdownFolder, FAN_GAME_TYPE_CHART)

            val source = showdownFolder.resolve(FAN_GAME_TYPE_CHART)
            val target = showdownFolder.resolve(GEB_TYPE_CHART)

            Files.move(
                source,
                target,
                StandardCopyOption.REPLACE_EXISTING
            )
        } else {
            exportResource(showdownFolder, GEB_TYPE_CHART)
        }
    }

    private fun injectStage2(showdownFolder: Path) {
        val simFolder = showdownFolder
            .resolveSibling("sim")

        injectBattleActions(simFolder)
        injectPokemon(simFolder)
        injectDex(simFolder)

        exportResource(
            showdownFolder.resolveSibling("server/chat-commands"),
            "info.js"
        )

        exportResource(
            showdownFolder.resolveSibling("server/chat-plugins"),
            "datasearch.js"
        )

        exportResource(
            showdownFolder.resolveSibling("data/text"),
            "default.js"
        )

        exportResource(
            showdownFolder.resolveSibling("config"),
            "formats.js"
        )
    }

    private fun injectBattleActions(simFolder: Path) {
        val file = simFolder.resolve("battle-actions.js")

        if (!Files.exists(file)) {
            exportResource(simFolder, "battle-actions.js")
            return
        }

        ShowdownInjectionManager.injectEntry(
            file = file,
            targetText = """Dragon: "Max Wyrmwind"""",
            entryText = """
                ,
                    Cosmic: "Max Galaxy",
                    Crystal: "Max Shatterstorm",
                    Digital: "Max Overclock",
                    Eldritch: "Max Dreadvoid",
                    Light: "Max Radiance",
                    Nuclear: "Max Meltdown",
                    Plastic: "Max Recast",
                    Mystery: "Max Mystery",
                    Shadow: "Max Umbrage",
                    Slime: "Max Ooze Flood",
                    Sound: "Max Reverb",
                    Wind: "Max Tempest",
                    Blood: "Max Leechrush"
            """.trimIndent()
        )

        ShowdownInjectionManager.injectEntry(
            file = file,
            targetText = """Fairy: "Twinkle Tackle"""",
            entryText = """
                ,
                    Cosmic: "Supernova Implosion",
                    Crystal: "Prism Breaker Beam",
                    Digital: "Code Overload",
                    Eldritch: "Whispers Beyond the Veil",
                    Light: "Divine Nova",
                    Nuclear: "Core Detonation",
                    Plastic: "Synthetic Evolution",
                    Mystery: "Mystery Protocol",
                    Shadow: "Veil of Oblivion",
                    Slime: "Mucus Tsunami",
                    Sound: "Bass Drop Finale",
                    Wind: "Heaven's Gale",
                    Blood: "Crimson Pact"
            """.trimIndent()
        )

        injectRefinedMegaCheck(file)
    }

    private fun injectPokemon(simFolder: Path) {
        val file = simFolder.resolve("pokemon.js")

        if (!Files.exists(file)) {
            exportResource(simFolder, "pokemon.js")
            return
        }

        ShowdownInjectionManager.injectEntry(
            file = file,
            targetText = """this.modifyStat("atk", 0.5);""",
            entryText = """
                if (this.status === "fbt")
                    this.modifyStat("spa", 0.5);
            """.trimIndent()
        )
    }

    private fun injectDex(simFolder: Path) {
        val file = simFolder.resolve("dex.js")

        ShowdownInjectionManager.injectEntry(
            file = file,
            targetText = """const targetTyping = target.getTypes?.() || target.types || target;""",
            entryText = """
                if (sourceType === "Shadow" && Array.isArray(targetTyping)) {
                    const effects = targetTyping.map(type =>
                        this.getEffectiveness(sourceType, type)
                    );

                    const max = Math.max(...effects);
                    const min = Math.min(...effects);

                    if (max > 0 && min < 0) return 0;
                    if (max > 0) return 1;
                    if (min < 0) return -1;

                    return 0;
                }
            """.trimIndent()
        )
    }

    private fun injectRefinedMegaCheck(file: Path) {
        ShowdownInjectionManager.replaceFirst(
            file = file,
            target = Regex("""item\.megaEvolves === species\.baseSpecies"""),
            replacement = """item.megaEvolves === species.name"""
        )
    }

    @Throws(IOException::class)
    private fun exportResource(
        folder: Path,
        resourceName: String
    ) {
        Files.createDirectories(folder)

        val target = folder.resolve(resourceName)

        GravelsExtendedBattles::class.java
            .getResourceAsStream(resourceName)
            ?.use { input ->
                Files.copy(input, target, StandardCopyOption.REPLACE_EXISTING)
            }
            ?: throw IOException(
                "Cannot find resource '$resourceName' in the mod JAR."
            )
    }
}