package drai.dev.gravelsextendedbattles.interfaces;

import drai.dev.gravelsextendedbattles.*;

import java.util.*;

public interface IGravelmonConfig {
    boolean getEnableOriginalFanGameTypings();
    boolean getEnableDexResort();
    boolean getAutomaticMoveInsertion();
    List<String> getBannedLabels();
    List<String> getAllowedLabels();
    List<SpawnModifier> getSpawnModifiers();
    List<String> getImplementedTypes();
    List<String> getPasswords();
    boolean getShouldAddStarters();
}
