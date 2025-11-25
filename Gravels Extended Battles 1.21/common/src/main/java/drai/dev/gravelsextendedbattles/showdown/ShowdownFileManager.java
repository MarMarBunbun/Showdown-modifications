package drai.dev.gravelsextendedbattles.showdown;

import drai.dev.gravelsextendedbattles.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.regex.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.*;

public class ShowdownFileManager {
    public static final ArrayList<String> SHOWDOWN_FILES = new ArrayList<>(
            List.of("abilities.js","conditions.js", "items.js", "moves.js", "pokedex.js", "scripts.js", "tags.js"));
    public static final ArrayList<String> FAN_GAME_TYPE_CHART = new ArrayList<>(
            List.of("typechart2.js"));
    public static final ArrayList<String> GEB_TYPE_CHART = new ArrayList<>(
            List.of("typechart.js"));

    public static void renameFile(String originalFilePath, String newFilePath) throws IOException {
        Path source = Paths.get(originalFilePath);
        Path destination = Paths.get(newFilePath);
        Files.move(source, destination, StandardCopyOption.REPLACE_EXISTING);
    }

    static public void exportResource(String showdownFolder, String resourceName) throws Exception {
        String jarFolder = showdownFolder +resourceName;
        Files.createDirectories(new File(showdownFolder).toPath());
        try (InputStream stream = GravelsExtendedBattles.class.getResourceAsStream(resourceName); OutputStream resStreamOut = new FileOutputStream(jarFolder)){
            if(stream == null) {
                throw new Exception("Cannot get resource \"" + resourceName + "\" from Jar file.");
            }

            int readBytes;
            byte[] buffer = new byte[4096];
            Files.createDirectories(new File(showdownFolder).toPath());
            while ((readBytes = stream.read(buffer)) > 0) {
                resStreamOut.write(buffer, 0, readBytes);
            }

        } catch (Exception ex) {
            throw ex;
        }

    }

    public static void injectShowdown() {
        var showdownFolder = ShowdownFolderLocator.getShowdownFolder();
        for (String fileName : SHOWDOWN_FILES) {
            try {
                ShowdownFileManager.exportResource(showdownFolder, fileName);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        try {
            String showdownSimFolder = showdownFolder.replaceAll("data/mods/cobblemon/", "sim/");
            if(!Files.exists(Paths.get(showdownSimFolder + "battle-actions.js"))) {
                ShowdownFileManager.exportResource(showdownSimFolder, "battle-actions.js");
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
                                "\t\t\tQuestionmark: \"Max Questionmark\",\n" +
                                "\t\t\tShadow: \"Max Umbrage\",\n" +
                                "\t\t\tSlime: \"Max Ooze Flood\",\n" +
                                "\t\t\tSound: \"Max Reverb\",\n" +
                                "\t\t\tWind: \"Max Tempest\",\n" +
                                "\t\t\tBlood: \"Max Leechrush\""
                );
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
                                "\t\t\tQuestionmark: \"Questionmark Protocol\",\n" +
                                "\t\t\tShadow: \"Veil of Oblivion\",\n" +
                                "\t\t\tSlime: \"Mucus Tsunami\",\n" +
                                "\t\t\tSound: \"Bass Drop Finale\",\n" +
                                "\t\t\tWind: \"Heaven’s Gale\",\n" +
                                "\t\t\tBlood: \"Crimson Pact\""
                );
                injectRefinedMegaCheck(showdownSimFolder);
            }
            if(!Files.exists(Paths.get(showdownSimFolder + "pokemon.js"))) {
                ShowdownFileManager.exportResource(showdownSimFolder, "pokemon.js");
            } else {
                ShowdownInjectionManager.injectEntry(showdownSimFolder + "pokemon.js",
                        "this.modifyStat(\"atk\", 0.5);",
                        "\n\t\t\tif (this.status === \"fbt\")\n" +
                                "\t\t\t\tthis.modifyStat(\"spa\", 0.5);");
            }
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","server/chat-commands/"), "info.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","server/chat-plugins/"), "datasearch.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","data/text/"), "default.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","config/"), "formats.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","sim/"), "dex.js");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        ShowdownItemManager.injectItems(showdownFolder);

        boolean enableFangameTypechart = gravelmonConfig.getEnableOriginalFanGameTypings();
        if (enableFangameTypechart) {
            for (String fileName : FAN_GAME_TYPE_CHART) {
                try {
                    ShowdownFileManager.exportResource(showdownFolder, fileName);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }

            // Rename the typechart2.js file after loading
            try {
                String originalFilePath = showdownFolder + File.separator + "typechart2.js";
                String renamedFilePath = showdownFolder + File.separator + "typechart.js";
                ShowdownFileManager.renameFile(originalFilePath, renamedFilePath);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        } else {
            // If fangameTypechart is disabled, use showdownFiles instead
            for (String fileName : GEB_TYPE_CHART) {
                try {
                    ShowdownFileManager.exportResource(showdownFolder, fileName);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    public static void injectRefinedMegaCheck(String showdownFolder) throws IOException {
        String filePath = showdownFolder+"battle-actions.js"; // Replace with your actual path
        String content = new String(Files.readAllBytes(Paths.get(filePath)));

        var patchPattern = Pattern.compile(
                "(item.megaEvolves === species.baseSpecies &&)",
                Pattern.MULTILINE
        );
        var patchMatcher = patchPattern.matcher(content);
        var replacementFunctionForCheck = """
            item.megaEvolves === species.name && """;
        if (patchMatcher.find()) {
            var patchedContent = patchMatcher.replaceFirst(Matcher.quoteReplacement(replacementFunctionForCheck));
            Files.write(Paths.get(filePath), patchedContent.getBytes(), StandardOpenOption.TRUNCATE_EXISTING);
        }
    }
}
