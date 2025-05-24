package drai.dev.gravelsextendedbattles.showdown;

import drai.dev.gravelsextendedbattles.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.gravelmonConfig;

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

    public static void injectShowdown(String showdownFolder) {
        for (String fileName : SHOWDOWN_FILES) {
            try {
                ShowdownFileManager.exportResource(showdownFolder, fileName);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        try {
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","sim/"), "battle-actions.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","sim/"), "pokemon.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","server/chat-commands/"), "info.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","server/chat-plugins/"), "datasearch.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","data/text/"), "default.js");
            ShowdownFileManager.exportResource(showdownFolder.replaceAll("data/mods/cobblemon/","config/"), "formats.js");
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
}
