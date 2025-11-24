package drai.dev.gravelmon.pokemon.attributes;

import org.jetbrains.annotations.*;

import java.util.*;
import java.util.concurrent.atomic.*;

public class EvolutionEntry {
    String result;
    String source;
    String shedder;
    EvolutionType kind;
    boolean consumesHeldItem = false;
    boolean optional = true;
    private List<MoveLearnSetEntry> moves;
    private List<EvolutionRequirementEntry> requirements;
    private List<Aspect> aspects = new ArrayList<>();
    private String requiredContext;

    @Override
    public String toString() {

        StringBuilder evolutionText = new StringBuilder();
        evolutionText.append("evolves into ").append(result).append(" when ");
        if(kind == EvolutionType.ITEM_INTERACT) {
            evolutionText.append(requiredContext).append(" is used on it");
            if(requirements.isEmpty()) return evolutionText.toString();
            evolutionText.append(" when ");
        } else if(kind == EvolutionType.TRADE){
            evolutionText.append(" traded");
            if(requirements.isEmpty()) return evolutionText.toString();
            evolutionText.append(" when ");
        }
        AtomicBoolean hasLevelRequirement = new AtomicBoolean(false);
        AtomicBoolean hasPropertyRequirement = new AtomicBoolean(false);
        AtomicBoolean hasLocationRequirement = new AtomicBoolean(false);
        AtomicBoolean hasPartyMemberRequirement = new AtomicBoolean(false);
        AtomicBoolean hasTimeRequirement = new AtomicBoolean(false);
        AtomicBoolean hasHeldItemRequirement = new AtomicBoolean(false);
        AtomicBoolean hasStatRatioRequirement = new AtomicBoolean(false);
        AtomicBoolean hasFriendshipRequirement = new AtomicBoolean(false);
        AtomicBoolean hasWeatherRequirement = new AtomicBoolean(false);
        AtomicBoolean hasMoveRequirement = new AtomicBoolean(false);
        AtomicBoolean hasBlocksTraveledRequirement = new AtomicBoolean(false);
        requirements.stream().sorted(Comparator.comparing(EvolutionRequirementEntry::getRequirementKind)).forEach(evolutionRequirementEntry -> {
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("level")) {
                if(hasLevelRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasLevelRequirement.set(true);
                }
                evolutionText.append("it is ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("property")) {
                if(hasPropertyRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasPropertyRequirement.set(true);
                }
                evolutionText.append("it has property ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("boime")) {
                if(hasLocationRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasLocationRequirement.set(true);
                }
                evolutionText.append("it is in boime ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("party_member")) {
                if(hasPartyMemberRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasPartyMemberRequirement.set(true);
                }
                evolutionText.append("it has party member that has ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("time")) {
                if(hasTimeRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasTimeRequirement.set(true);
                }
                evolutionText.append("current time is in ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("has_move")) {
                if(hasMoveRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasMoveRequirement.set(true);
                }
                evolutionText.append("it knows ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("ratio")) {
                if(hasStatRatioRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasStatRatioRequirement.set(true);
                }
                evolutionText.append("it's stats are in ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("held_item")) {
                if(hasHeldItemRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasHeldItemRequirement.set(true);
                }
                evolutionText.append("it's holding ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("friendship")) {
                if(hasFriendshipRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasFriendshipRequirement.set(true);
                }
                evolutionText.append("it's friendship is ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("weather")) {
                if(hasWeatherRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasWeatherRequirement.set(true);
                }
                evolutionText.append("it is ");
            }
            if(evolutionRequirementEntry.getRequirementKind().equalsIgnoreCase("blocks_traveled")) {
                if(hasBlocksTraveledRequirement.get()) {
                    evolutionText.append("and ");
                } else {
                    hasBlocksTraveledRequirement.set(true);
                }
                evolutionText.append("it has blocks traveled ");
            }
            evolutionText.append(evolutionRequirementEntry.getCondition()).append("=").append(evolutionRequirementEntry.getConditionParameter());
            evolutionText.append(",");
        });
        
        return evolutionText.toString();
    }

    public EvolutionEntry(String result, EvolutionType kind, boolean consumesHeldItem, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements, List<Aspect> aspects, String requiredContext, String shedder) {
        this(result, kind, consumesHeldItem, moves, requirements, aspects, requiredContext);
        this.shedder = shedder;
    }

    public EvolutionEntry(String result, EvolutionType kind, boolean consumesHeldItem, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements, List<Aspect> aspects, String requiredContext) {
        this(result, kind, consumesHeldItem, moves, requirements, aspects);
        this.requiredContext = requiredContext;
    }

    public EvolutionEntry(String result, EvolutionType kind, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements, List<Aspect> aspects) {
        this(result, kind, false, moves, requirements, aspects);
    }

    public EvolutionEntry(String result, EvolutionType kind, boolean consumesHeldItem, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements, List<Aspect> aspects) {
        this(result, kind, consumesHeldItem,moves, requirements);
        this.aspects = aspects;
    }

    public EvolutionEntry(String result, EvolutionType kind, boolean consumesHeldItem, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements) {
        this(result, kind, moves, requirements);
        this.consumesHeldItem = consumesHeldItem;
    }

    public EvolutionEntry(String result, EvolutionType kind, List<MoveLearnSetEntry> moves,
                          List<EvolutionRequirementEntry> requirements) {
        this.result = result;
        this.kind = kind;
        this.moves = moves;
        this.requirements = requirements;
    }

    public String getResult() {
        return result;
    }

    public String getShedder() {
        return shedder;
    }

    public EvolutionType getKind() {
        return kind;
    }

    public Boolean consumesHeldItem() {
        return consumesHeldItem;
    }

    public boolean hasMoves() {
        return !moves.isEmpty();
    }

    public List<MoveLearnSetEntry> getMoves() {
        return moves;
    }

    public List<EvolutionRequirementEntry> getRequirements() {
        return requirements;
    }

    public List<Aspect> getAspects() {
        return aspects;
    }

    public String getRequiredContext() {
        return requiredContext;
    }

    public void setResult(String s) {
        this.result = s;
    }

    public void setShedder(String s) {
        this.shedder = s;
    }

    public boolean isOptional() {
        return optional;
    }

    public void setOptional(boolean optional) {
        this.optional = optional;
    }

    public EvolutionEntry notOptional() {
        this.optional = false;
        return this;
    }

    public @Nullable String getSource() {
        return source;
    }
}
