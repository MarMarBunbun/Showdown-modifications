package drai.dev.gravelmon.pokemon.attributes;

import java.util.*;

public enum Label {
    NOT_MODELED("not_modeled"),
    GEN1("gen1"),
    GEN2("gen2"),
    GEN3("gen3"),
    GEN4("gen4"),
    GEN5("gen5"),
    GEN6("gen6"),
    GEN7("gen7"),
    GEN8("gen8"),
    GEN9("gen9"),
    LEGENDARY("legendary"), FOSSIL(), STARTER(), PSEUDO_LEGENDARY(), SUB_LEGENDARY("legendary"), PARADOX(), ULTRA_BEAST(),
    SAGE("sage"),
    INFINITY("infinity"),
    ALOLA_REGIONAL("alola_regional"),
    KANTO_REGIONAL("kanto_regional"),
    GMAX("gmax"),
    INSURGENCE("insurgence"),
    XENOVERSE("xenoverse"),
    BLAZING_EMERALD("blazing_emerald"),
    VEGA("vega"),
    FAKEMON("fakemon"),
    EEVEELUTION("eeveelution"),
    FAKEMON_EVOLUTION("fakemonevolution"),
    RADICAL_RED("radicalred"),
    MYTHICAL("mythical"),
    DAYBREAK("daybreak"),
    PHOENIX_RISING("phoenix_rising"),
    FLUX("flux"),
    MYTH("myth"),
    LOCKEMON("lockemon"),
    VANGUARD("vanguard"),
    URANIUM("uranium"),
    REALIDEA_SYSTEM("realidea_system"),
    AZURE("azure"),
    OPAL("opal"),
    ETERNAL_FOREST("eternal_forest"),
    UMBRA("umbra"),
    DENEB("deneb"),
    ATLAS("atlas"),
    AVORIS("avoris"),
    ENRIKO("enriko"),
    FERROA("ferroa"),
    INTERREGIONAL("interregional"),
    JUNNIN("junnin"),
    LONAVA("lonava"),
    MYTHIRE("mythire"),
    NOVRAI("novrai"),
    OKENO("okeno"),
    OROHNHAVAI("orohnhavai"),
    QAMOR("qamor"),
    VARITAS("varitas"),
    RICA("rica"),
    MIDAMIS("midamis"),
    NORHEIM("norheim"),
    ARISTOS("aristos"),
    HIZA("hiza"),
    NOSTO("nosto"),
    HUB("hub"),
    ISIAH("isiah"),
    OCEANE("oceane"),
    JOKE("joke"),
    MISSING("missing"),
    AMAVI("amavi"),
    CYARE("cyare"),
    DHIOME("dhiome"),
    ENJIN("enjin"),
    AVALOS("fliga"),
    FLIGA("fliga"),
    GOETIA("goetia"),
    IONOS("ionos"),
    KURIA("kuria"),
    LAGOONE("lagoone"),
    MASTENIA("mastenia"),
    MONGRATIS("mongratis"),
    MUSHI("mushi"),
    MYSTIS("mystis"),
    NEONINTENDO("neonintendo"),
    NODORRO("nodorro"),
    OLYSOS("olysos"),
    ORBIS("orbis"),
    OTOPO("otopo"),
    OTTORA("ottora"),
    PANJAEA("panjaea"),
    PASTEL_ISLAND("pastel_island"),
    RUSKOW("ruskow"),
    TERRANOV("terranov"),
    THEOS("theos"),
    TOKAS("tokas"),
    ULTRASPACE("ultraspace"),
    URZAVOS("urzavos"),
    SPION("spion"),
    NEO_NINTENDO("neonintendo"),
    PASTELL_ISLAND("pastel_island"),
    CROZOIC("crozoic"),
    AFRICANUS,
    CHAOSINVESTIA,
    SOULSTONES,
    MASTENIAN,
    FORM,
    KORZA,
    RAIAN, PALMIA, NORSE, TRIZOR, ALDAO, BAGO, FRA, IVRIS, ELB(), FABEL(), FERRAN(), AROMA(), SAHL(), MAHAL(), BORAZUL(), KUULKID(), MIKITARI(), SORIN(), INSTAGRAM(), ISHIRIA(), SOLARLIGHTLUNARDARK(), TOCHI();

    private String name;

    Label(String name) {
        this.name = name;
    }

    Label() {
        this.name = name().toLowerCase();
    }

    public String getName() {
        return name;
    }

    public static Map<Label, String> passwordProtectedLabels;

    static {
        passwordProtectedLabels = new HashMap<>();
//        passwordProtectedLabels.put(OTTORA, "15thaddictionIsAddicted");
//        passwordProtectedLabels.put(IONOS, "airikr4283");
//        passwordProtectedLabels.put(MASTENIA, "airikr4283");
//        passwordProtectedLabels.put(NORHEIM, "airikr4283");
//        passwordProtectedLabels.put(GOETIA, "aviculor");
//        passwordProtectedLabels.put(AVORIS, "azriaPending");
//        passwordProtectedLabels.put(OROHNHAVAI, "azriaPending");
//        passwordProtectedLabels.put(ORBIS, "goneBlumoo");
//        passwordProtectedLabels.put(MYSTIS, "breadbun.");
//        passwordProtectedLabels.put(CYARE, "cobaltDragonPens");
//        passwordProtectedLabels.put(ATLAS, "collaborativeEffort");
//        passwordProtectedLabels.put(ENJIN, "collaborativeEffort");
//        passwordProtectedLabels.put(HUB, "collaborativeEffort");
//        passwordProtectedLabels.put(INTERREGIONAL, "collaborativeEffort");
//        passwordProtectedLabels.put(NEO_NINTENDO, "collaborativeEffort");
//        passwordProtectedLabels.put(MUSHI, "deepzekrom");
//        passwordProtectedLabels.put(FERROA, "drtapewormRulez");
//        passwordProtectedLabels.put(MYTHIRE, "drtapewormRulez");
//        passwordProtectedLabels.put(RUSKOW, "extyrannomon");
//        passwordProtectedLabels.put(AMAVI, "vanishedEntity");
//        passwordProtectedLabels.put(ARISTOS, "ginzuishou");
//        passwordProtectedLabels.put(HIZA, "godOfWarioReverance");
//        passwordProtectedLabels.put(TERRANOV, "godOfWarioReverance");
//        passwordProtectedLabels.put(LAGOONE, "godOfWarioReverance");
//        passwordProtectedLabels.put(DHIOME, "vanishedHaritos");
//        passwordProtectedLabels.put(PANJAEA, "janejewelShiny");
//        passwordProtectedLabels.put(LONAVA, "kingTapirDec");
//        passwordProtectedLabels.put(THEOS, "lehnk");
//        passwordProtectedLabels.put(QAMOR, "considerateCrustle");
//        passwordProtectedLabels.put(OKENO, "mymarshlands");
//        passwordProtectedLabels.put(ENRIKO, "nixliz");
//        passwordProtectedLabels.put(OTOPO, "pixelmisterdec");
//        passwordProtectedLabels.put(JUNNIN, "vanished");
//        passwordProtectedLabels.put(NOSTO, "vanished");
//        passwordProtectedLabels.put(URZAVOS, "scarfflesLooker");
//        passwordProtectedLabels.put(SPION, "sketchyant");
//        passwordProtectedLabels.put(AVALOS, "skur01Rocks");
//        passwordProtectedLabels.put(FLIGA, "skur01Rocks");
//        passwordProtectedLabels.put(NOVRAI, "znogyrop");
//        passwordProtectedLabels.put(PASTEL_ISLAND, "mysteriousIsland");
//        passwordProtectedLabels.put(MYTH, "dramaQueen");
//        passwordProtectedLabels.put(ISIAH, "hiddenNinjaVillage");
//        passwordProtectedLabels.put(CROZOIC, "prehistoric");
//        passwordProtectedLabels.put(INSTAGRAM, "thezuccc");
//        passwordProtectedLabels.put(ISHIRIA, "ishirian");
//        passwordProtectedLabels.put(TOCHI, "toyota");
    }

    public static Map<Label, String> getPasswordProtectedLabels() {
        return passwordProtectedLabels;
    }
}
