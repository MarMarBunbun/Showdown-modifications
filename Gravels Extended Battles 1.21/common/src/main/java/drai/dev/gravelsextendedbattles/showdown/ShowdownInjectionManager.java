package drai.dev.gravelsextendedbattles.showdown;

import java.nio.file.*;
import java.util.*;
import java.util.function.*;

public class ShowdownInjectionManager {

    public static void injectEntry(
            String targetFile,
            String targetText,
            String entryText
    ) {
        try {
            Path filePath = Path.of(targetFile);
            String content = Files.readString(filePath);

            // Find highest num
            java.util.regex.Pattern numPattern = java.util.regex.Pattern.compile("num:\\s*(\\d+)");
            java.util.regex.Matcher matcher = numPattern.matcher(content);

            StringBuilder builder = new StringBuilder();
            if (!builder.toString().contains(entryText)){
                builder.append(entryText);
            }

            int insertPos = content.lastIndexOf(targetText);
            if (insertPos == -1) {
                throw new RuntimeException("Can't find closing marker: " + targetText);
            }
            insertPos = insertPos + targetText.length();
            String newContent = content.substring(0, insertPos) + builder + content.substring(insertPos);
            Files.writeString(filePath, newContent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


