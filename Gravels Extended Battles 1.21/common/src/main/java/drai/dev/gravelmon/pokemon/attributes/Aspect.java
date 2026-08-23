package drai.dev.gravelmon.pokemon.attributes;

import org.apache.commons.lang3.text.*;
import org.jetbrains.annotations.*;

public enum Aspect {
    ALOLAN("alolan", false, null, true),
    FEMALE("female", false, null, false),
    GALARIAN("galarian", false, null, true),
    HISUIAN("hisuian", false, null, true),
    PALDEAN("paldean", false, null, true),
    VALENCIAN("valencian", false, null, false),
    COSPLAY("cosplay", false, null, false),
    WORLD("world", false, null, false),
    GMAX("gmax", false, null, false),
    STARTER("starter", false, null, false),
    PARTNER("partner", false, null, false),
    KALOS("kalos", false, null, true),
    UNOVA("unova", false, null, true),
    SINNOH("sinnoh", false, null, true),
    LIBRE("libre", false, null, false),
    PHD("phd", false, null, false),
    POP_STAR("pop-star", false, null, false),
    BELLE("belle", false, null, false),
    ROCK_STAR("rock-star", false, null, false),
    MEGA("mega", false, null, false),
    SUNNY("sunny", false, null, false),
    RAINY("rainy", false, null, false),
    SNOWY("snowy", false, null, false),
    HOENNIAN("blazing_emerald", true),
    X("xenoverse", true),
    STORM("xenoverse", false),
    FAIRY(null, false),
    DRAGON(null, false),
    PSYCHIC(null, false),
    SOUND(null, false),
    WATER(null, false),
    STEEL(null, false),
    GROUND(null, false),
    POISON(null, false),
    ROCK(null, false),
    GRASS(null, false),
    FLYING(null, false),
    FIGHTING(null, false),
    ELECTRIC(null, false),
    DARK(null, false),
    ICE(null, false),
    GHOST(null, false),
    FIRE(null, false),
    RED("xenoverse", false),
    GREEN("xenoverse", false),
    YELLOW("xenoverse", false),
    MONSTER("xenoverse", false),
    SUMMER("flux", false),
    SCHOOL("radical_red", false),
    SWARM("lockemon", false),
    DRY("lockemon", false),
    SIRIUS("deneb", false),
    ALTAIR("deneb", false),

    ONE( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWO( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    THREE( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    FOUR( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    FIVE( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    SIX( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    SEVEN(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    EIGHT( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    NINE( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TEN(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    ELEVEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWELVE( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    THIRTEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    FOURTEEN(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    FIFTEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    SIXTEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    SEVENTEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    EIGHTEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    NINETEEN( true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTY(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYONE(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYTWO(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYTHREE(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYFOUR(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYFIVE(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYSIX(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    TWENTYSEVEN(true, "deneb", false, "numberedVariant", "NumberedVariant"),
    NOSE_PATTERN("Nose Pattern", true, "hub", false),
    BROW_PATTERN("Brow Pattern", true, "hub", false),
    QAMORAN("qamor", true),
    NOSTAN("nosto", true),
    VARITASIAN("varitas", true),
    SEVIIAN("radical_red", true),
    DEEP("radical_red", false),
    AYREIAN("vanguard", true),
    KASKADIAN("lockemon", true),
    MYSTIC("azure", true),
    AVALOSSIAN("avalos", true),
    ENJINNIAN("enjin", true),
    NOVRAN("novrai", true),
    NEO("neo_nintendo", true),
    NORHEIMAN("norheim", true),
    AVORIAN("avoris", true),
    HIZIAN("hiza", true),
    ALTERAN("flux", true),
    ARISTOSIAN("aristos", true),
    ARMIRAN("daybreak", true),
    RELIC("phoenix_rising", true),
    GUTSY("lockemon", false),
    WINDY("lockemon", false),
    SMOGGY("lockemon", false),
    DUSTY("lockemon", false),
    SANDY("lockemon", false),
    SWARMY("lockemon", false),
    SPOOKY("lockemon", false),
    WHIRLY("lockemon", false),
    ALLERGY("lockemon", false),
    ZAPPY("lockemon", false),
    ZENNY("lockemon", false),
    SORCERY("lockemon", false),
    SHADY("lockemon", false),
    LOVELY("lockemon", false),
    CEFIRAN("opal", true),
    //infinity
    EGHO("infinity", true),

    //insurgence
    DELTA("insurgence", true),
    SPIDER("insurgence", false),
    RUIN("insurgence", false),
    BERRY("insurgence", false),
    CAKE("insurgence", false),
    UNLEASHED("insurgence", true),
    INACTIVE("insurgence", true),
    CRYSTAL(null, false),
    ACTIVE("insurgence", true),
    BLAZE_BOOST("insurgence", true),
    ARMORED("insurgence", true),
    MAGICIAN("insurgence", true),

    //sage
    BLUE("sage", false),
    EXOTHERMIC("sage", false),

    HUBIAN("hub", true),
    EARTH("xenoverse", false),
    HAVAIIAN("orohn_havai", true),
    LAGOONAN("lagoone", true),
    RICAN("rica", true),
    CROZOICAN("crozoic", true),
    INTERIAN("interregional", true),
    SIGNETAN("deneb", true),
    OKENIAN("okeno", true),
    LOST_ISLANDS("ferroa", true),
    SPACE("insurgence", true),
    SAGE_SPACE("Space", true, "sage", false),
    BETA("uranium", false),
    TERRESTRIAL("xenoverse", false),
    XENOVERSAL("xenoverse", false),
    ASTRAL("xenoverse", false),
    MIX("lockemon", false),
    TWIRL("lockemon", false),
    BASS("lockemon", false),
    HOME("lockemon", false),
    JUNK("lockemon", false),
    WEB("lockemon", false),
    BRAWL("lockemon", false),
    SWAY("lockemon", false),
    SOL("lockemon", false),
    AMAZE_ALL("lockemon", true),
    ELDIWAN("xenoverse", true),
    WINTER_COAT("flux", false),
    SUMMER_COAT("flux", false),
    XENOVERSE("xenoverse", false),
    AFRICANUSAN("africanus", true),
    VESITAN("chaos_in_vesita", true),
    EPOCH("soulstones", true),
    TOKASSIAN("tokas", true),
    PASTELIAN("pastel_island", true),
    NODORRAN("nodorro", true),
    OLYSOSIAN("olysos", true),
    OTTORAN("beginnings", true),
    MYSTISIAN("mystis", true),
    MASTENIAN("mastenia", true),
    THEOSSIAN("theos", true),
    DHIOMAN("dhiome", true),
    IONOSIAN("ionos", true),
    FORMAN("form", true),
    RAIANIAN("raian", true),
    TRIBAL("raian", false),
    NORSE("norse", true),
    PALMIAN("palmia", true),
    TRIZORAN("trizor", true),
    FOREST("raian", false),
    CAVE("raian", false),
    SEA("raian", false),
    IVRISIAN("ivris", true),
    FERRANIAN("ferran", true),
    MAHALIAN("mahal", true),
    FABELIAN("fabel", true),
    SAHLIAN("sahl", true),
    ELBIAN("elb", true),
    AROMIAN("aroma", true),
    MIKITARIAN("mikitari", true),
    ISHIRIAN("ishiria", true),
    SHADOW("insurgence", true),
    GUITARIST("xenoverse", false),
    DRUMMER("xenoverse", false),
    BASSIST("xenoverse", false);
    private String aspectName;
    private final String game;
    private boolean isNew = true;
    private boolean isDefault = false;
    private boolean isPrimary = false;
    private String choiceAspectName;
    private String choiceAspectFullName;

    public boolean isNew() {
        return isNew;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public @Nullable String getGame() {
        return game;
    }

    public boolean isPrimary() {
        return isPrimary;
    }

    public String getName() {
        return this.name().toLowerCase().replace(' ', '_').replaceAll("[^a-zA-Z0-9_]", "").replace("'", "").replace("\\.", "").replace("-", "").replace(" ", "");
    }

    public String getAspectName() {
        return this.aspectName;}

    public String getChoiceAspectName() {
        return choiceAspectName;
    }

    public String getChoiceAspectFullName() {
        return choiceAspectFullName;
    }

    Aspect(
            String aspectName, 
            @Nullable String game, 
            boolean isPrimary
    ) {
        this(aspectName, true, game, isPrimary);
    }

    Aspect(
            @Nullable String game,
            boolean isPrimary
    ) {
        this(null, true, game, isPrimary);
        this.aspectName = WordUtils.capitalizeFully(name().replaceAll("_", " "));
    }

    Aspect(
            String aspectName,
            boolean isNew,
            String game,
            boolean isPrimary
    ) {
        this.aspectName = aspectName;
        this.isNew = isNew;
        this.isPrimary = isPrimary;
        this.game = game;
    }

    Aspect(
            boolean isNew,
            @Nullable String game,
            boolean isPrimary,
            String choiceAspectName,
            String choiceAspectFullName
    ) {
        this.aspectName = WordUtils.capitalizeFully(name().replaceAll("_", " "));;
        this.isNew = isNew;
        this.isPrimary = isPrimary;
        this.game = game;
        this.choiceAspectName = choiceAspectName;
        this.choiceAspectFullName = choiceAspectFullName;
    }
}
