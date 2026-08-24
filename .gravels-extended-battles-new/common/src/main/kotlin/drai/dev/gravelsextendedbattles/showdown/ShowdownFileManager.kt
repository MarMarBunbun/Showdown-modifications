package drai.dev.gravelsextendedbattles.showdown

import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.nio.file.StandardOpenOption
import java.util.regex.Matcher
import java.util.regex.Pattern
import kotlin.collections.ArrayList
import kotlin.collections.mutableListOf

object ShowdownFileManager {
    val SHOWDOWN_FILES: ArrayList<String> = ArrayList(
        mutableListOf(
            "abilities.js",
            "conditions.js",
            "items.js",
            "moves.js",
            "pokedex.js",
            "scripts.js",
            "tags.js"
        )
    )
    val FAN_GAME_TYPE_CHART: ArrayList<String> = ArrayList(
        mutableListOf("typechart2.js")
    )
    val GEB_TYPE_CHART: ArrayList<String> = ArrayList(
        mutableListOf("typechart.js")
    )

    @Throws(IOException::class)
    fun renameFile(originalFilePath: String, newFilePath: String) {
        val source = Paths.get(originalFilePath)
        val destination = Paths.get(newFilePath)
        Files.move(source, destination, StandardCopyOption.REPLACE_EXISTING)
    }

    @Throws(Exception::class)
    fun exportResource(showdownFolder: String, resourceName: String) {
        val jarFolder = showdownFolder + resourceName
        Files.createDirectories(File(showdownFolder).toPath())
        try {
            GravelsExtendedBattles::class.java.getResourceAsStream(resourceName).use { stream ->
                FileOutputStream(jarFolder).use { resStreamOut ->
                    if (stream == null) {
                        throw Exception("Cannot get resource \"" + resourceName + "\" from Jar file.")
                    }
                    var readBytes: Int
                    val buffer = ByteArray(4096)
                    Files.createDirectories(File(showdownFolder).toPath())
                    while ((stream.read(buffer).also { readBytes = it }) > 0) {
                        resStreamOut.write(buffer, 0, readBytes)
                    }
                }
            }
        } catch (ex: Exception) {
            throw ex
        }
    }

    fun injectShowdown() {
        val showdownFolder =
            ShowdownFolderLocator.getShowdownFolder()
        for (fileName in SHOWDOWN_FILES) {
            try {
                ShowdownFileManager.exportResource(showdownFolder, fileName)
            } catch (e: Exception) {
                throw RuntimeException(e)
            }
        }
        ShowdownFileManager.injectStage2(showdownFolder)

        //        ShowdownItemManager.injectItems(showdownFolder);
        val enableFanGameTypeChart: Boolean = GravelsExtendedBattles.CONFIG.enableFangameTypechart
        if (enableFanGameTypeChart) {
            for (fileName in FAN_GAME_TYPE_CHART) {
                try {
                    ShowdownFileManager.exportResource(showdownFolder, fileName)
                } catch (e: Exception) {
                    throw RuntimeException(e)
                }
            }

            // Rename the typechart2.js file after loading
            try {
                val originalFilePath = showdownFolder.toString() + File.separator + "typechart2.js"
                val renamedFilePath = showdownFolder.toString() + File.separator + "typechart.js"
                renameFile(originalFilePath, renamedFilePath)
            } catch (e: IOException) {
                throw RuntimeException(e)
            }
        } else {
            // If fangameTypechart is disabled, use showdownFiles instead
            for (fileName in GEB_TYPE_CHART) {
                try {
                    ShowdownFileManager.exportResource(showdownFolder, fileName)
                } catch (e: Exception) {
                    throw RuntimeException(e)
                }
            }
        }
    }

    private fun injectStage2(showdownFolder: String) {
        try {
            val showdownSimFolder = showdownFolder.replace("data/mods/cobblemon/".toRegex(), "sim/")
            if (!Files.exists(Paths.get(showdownSimFolder + "battle-actions.js"))) {
                exportResource(showdownSimFolder, "battle-actions.js")
            } else {
                ShowdownInjectionManager.injectEntry(
                    showdownSimFolder + "battle-actions.js",
                    "Dragon: \"Max Wyrmwind\"",
                    ",\n" +
                            "\t\t\tCosmic: \"Max Galaxy\",\n" +
                            "\t\t\tCrystal: \"Max Shatterstorm\",\n" +
                            "\t\t\tDigital: \"Max Overclock\",\n" +
                            "\t\t\tEldritch: \"Max Dreadvoid\",\n" +
                            "\t\t\tLight: \"Max Radiance\",\n" +
                            "\t\t\tNuclear: \"Max Meltdown\",\n" +
                            "\t\t\tPlastic: \"Max Recast\",\n" +
                            "\t\t\tMystery: \"Max Mystery\",\n" +
                            "\t\t\tShadow: \"Max Umbrage\",\n" +
                            "\t\t\tSlime: \"Max Ooze Flood\",\n" +
                            "\t\t\tSound: \"Max Reverb\",\n" +
                            "\t\t\tWind: \"Max Tempest\",\n" +
                            "\t\t\tBlood: \"Max Leechrush\""
                )
                ShowdownInjectionManager.injectEntry(
                    showdownSimFolder + "battle-actions.js",
                    "Fairy: \"Twinkle Tackle\"",
                    ",\n" +
                            "\t\t\tCosmic: \"Supernova Implosion\",\n" +
                            "\t\t\tCrystal: \"Prism Breaker Beam\",\n" +
                            "\t\t\tDigital: \"Code Overload\",\n" +
                            "\t\t\tEldritch: \"Whispers Beyond the Veil\",\n" +
                            "\t\t\tLight: \"Divine Nova\",\n" +
                            "\t\t\tNuclear: \"Core Detonation\",\n" +
                            "\t\t\tPlastic: \"Synthetic Evolution\",\n" +
                            "\t\t\tMystery: \"Mystery Protocol\",\n" +
                            "\t\t\tShadow: \"Veil of Oblivion\",\n" +
                            "\t\t\tSlime: \"Mucus Tsunami\",\n" +
                            "\t\t\tSound: \"Bass Drop Finale\",\n" +
                            "\t\t\tWind: \"Heaven’s Gale\",\n" +
                            "\t\t\tBlood: \"Crimson Pact\""
                )
                injectRefinedMegaCheck(showdownSimFolder)
            }
            if (!Files.exists(Paths.get(showdownSimFolder + "pokemon.js"))) {
                exportResource(showdownSimFolder, "pokemon.js")
            } else {
                ShowdownInjectionManager.injectEntry(
                    showdownSimFolder + "pokemon.js",
                    "this.modifyStat(\"atk\", 0.5);",
                    "\n\t\t\tif (this.status === \"fbt\")\n" +
                            "\t\t\t\tthis.modifyStat(\"spa\", 0.5);"
                )
            }
            ShowdownInjectionManager.injectEntry(
                showdownSimFolder + "dex.js",
                "const targetTyping = target.getTypes?.() || target.types || target;",
                """
                            
                            
                            ${'\t'}${'\t'}if (sourceType === "Shadow" && Array.isArray(targetTyping)) {
                                    const effects = targetTyping.map(type => this.getEffectiveness(sourceType, type));
                                    const max = Math.max(...effects);
                                    const min = Math.min(...effects);
                                    if (max > 0 && min < 0) return 0; // Weakness + Resistance = Neutral
                                    if (max > 0) return 1;            // At least one Weakness
                                    if (min < 0) return -1;           // At least one Resistance
                                    return 0;                         // Neutral
                                }
                                """.trimIndent()
            )
            exportResource(showdownFolder.replace("data/mods/cobblemon/".toRegex(), "server/chat-commands/"), "info.js")
            exportResource(
                showdownFolder.replace("data/mods/cobblemon/".toRegex(), "server/chat-plugins/"),
                "datasearch.js"
            )
            exportResource(showdownFolder.replace("data/mods/cobblemon/".toRegex(), "data/text/"), "default.js")
            exportResource(showdownFolder.replace("data/mods/cobblemon/".toRegex(), "config/"), "formats.js")
        } catch (e: Exception) {
            throw RuntimeException(e)
        }
    }

    @Throws(IOException::class)
    fun injectRefinedMegaCheck(showdownFolder: String?) {
        val filePath = showdownFolder + "battle-actions.js" // Replace with your actual path
        val content = String(Files.readAllBytes(Paths.get(filePath)))

        val patchPattern = Pattern.compile(
            "(item.megaEvolves === species.baseSpecies &&)",
            Pattern.MULTILINE
        )
        val patchMatcher = patchPattern.matcher(content)
        val replacementFunctionForCheck = """
            item.megaEvolves === species.name && 
            """.trimIndent()
        if (patchMatcher.find()) {
            val patchedContent = patchMatcher.replaceFirst(Matcher.quoteReplacement(replacementFunctionForCheck))
            Files.write(Paths.get(filePath), patchedContent.toByteArray(), StandardOpenOption.TRUNCATE_EXISTING)
        }
    }
}