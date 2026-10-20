package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

private fun forms(text: String): List<JsonObject> = JsonText.parseStrict(text).asJsonArray.map { it.asJsonObject }

private fun json(text: String) = JsonText.parseStrict(text)

private fun SpeciesFileBuilder.Built.file(path: String) = files[path] ?: error("No file $path in ${files.keys}")

class RebalancedOverlayTest {
    private fun fields(text: String) = json(text).asJsonObject

    @Test
    fun apply_WithoutAnOverlay_DropsOnlyTheField() {
        assertEquals(json("""{"baseStats":{"hp":1}}"""), RebalancedOverlay.apply(fields("""{"baseStats":{"hp":1}}""")))
    }

    @Test
    fun apply_BaseStatsAbilitiesAndMovesReplaceWhole() {
        val result = RebalancedOverlay.apply(
            fields("""{"baseStats":{"hp":1,"atk":2},"abilities":["a"],"moves":["1:x","2:y"],"rebalanced":{"baseStats":{"hp":9},"moves":["1:z"]}}"""),
        )

        assertEquals(json("""{"baseStats":{"hp":9},"abilities":["a"],"moves":["1:z"]}"""), result)
    }

    @Test
    fun apply_ANewPrimaryTypeWithoutASecondary_DropsTheOldSecondary() {
        val result = RebalancedOverlay.apply(fields("""{"primaryType":"fire","secondaryType":"flying","rebalanced":{"primaryType":"water"}}"""))

        assertEquals(json("""{"primaryType":"water"}"""), result)
    }

    @Test
    fun apply_ASecondaryAloneKeepsThePrimary() {
        val result = RebalancedOverlay.apply(fields("""{"primaryType":"fire","rebalanced":{"secondaryType":"ghost"}}"""))

        assertEquals(json("""{"primaryType":"fire","secondaryType":"ghost"}"""), result)
    }

    @Test
    fun apply_AnUnimplementedRebalancedType_RejectsTheWholeOverlay() {
        val input = fields("""{"primaryType":"normal","baseStats":{"hp":1},"rebalanced":{"primaryType":"digital","baseStats":{"hp":9}}}""")

        val result = RebalancedOverlay.apply(input, setOf("normal", "electric"))

        assertEquals(json("""{"primaryType":"normal","baseStats":{"hp":1}}"""), result)
    }

    @Test
    fun apply_AnUnimplementedRebalancedSecondaryType_RejectsTheOverlay() {
        val result = RebalancedOverlay.apply(fields("""{"primaryType":"fire","rebalanced":{"secondaryType":"Digital"}}"""), setOf("fire"))

        assertEquals(json("""{"primaryType":"fire"}"""), result)
    }

    @Test
    fun apply_ImplementedRebalancedTypes_AreApplied() {
        val result = RebalancedOverlay.apply(fields("""{"primaryType":"normal","rebalanced":{"primaryType":"digital"}}"""), setOf("normal", "digital"))

        assertEquals(json("""{"primaryType":"digital"}"""), result)
    }

    @Test
    fun apply_AnOverlayWithoutTypes_IsAppliedWhateverTheImplementedTypes() {
        val result = RebalancedOverlay.apply(fields("""{"baseStats":{"hp":1},"rebalanced":{"baseStats":{"hp":9}}}"""), emptySet())

        assertEquals(json("""{"baseStats":{"hp":9}}"""), result)
    }

    @Test
    fun apply_DoesNotChangeItsInput() {
        val input = fields("""{"primaryType":"fire","rebalanced":{"primaryType":"water"}}""")

        RebalancedOverlay.apply(input)

        assertEquals(json("""{"primaryType":"fire","rebalanced":{"primaryType":"water"}}"""), input)
    }

    @Test
    fun parse_RulesDefaultToRebalanced() {
        assertEquals(RulesVariant.FAITHFUL, RulesVariant.parse(" Faithful "))
        assertEquals(RulesVariant.REBALANCED, RulesVariant.parse("rebalanced"))
        assertEquals(RulesVariant.REBALANCED, RulesVariant.parse(null))
        assertEquals(RulesVariant.REBALANCED, RulesVariant.parse("nonsense"))
    }
}

class SpeciesFileBuilderTest {
    private val base = """
        {"formId":"infinity#tuskor#normal","addedByGame":"infinity","source":"gravelmon","revision":3,"pk":"x",
         "origin":{"kind":"species","folder":"infinity","file":"tuskor"},
         "lang":{"tuskor.name":"Tuskor","tuskor.desc":"A tusked one."},
         "implemented":true,"name":"Tuskor","primaryType":"rock","baseStats":{"hp":50},
         "fossil":{"item":"tusk_fossil","digSites":[],"definition":false,"rare":false},
         "rebalanced":{"baseStats":{"hp":70},"primaryType":"ground"},"zzz":1,"nationalPokedexNumber":9}
    """

    private fun inline(index: Int, aspect: String) = """
        {"formId":"infinity#tuskor#$aspect","addedByGame":"infinity","source":"gravelmon","revision":1,
         "origin":{"kind":"inline","folder":"infinity","file":"tuskor","index":$index},"name":"Tuskor $aspect","aspects":["$aspect"]}
    """

    private fun form(species: String, extra: String = "") = """{"formId":"x","addedByGame":"infinity","source":"gravelmon","species":$species,"spawns":[]$extra}"""

    @Test
    fun build_WritesASpeciesFileWithItsInlineFormsInIndexOrder_FieldsInTheFilesOrder() {
        val built = SpeciesFileBuilder.build(
            forms("[${form(base)},${form(inline(1, "b"))},${form(inline(0, "a"))}]"),
            RulesVariant.FAITHFUL,
        )

        val file = built.file("data/cobblemon/species/infinity/tuskor.json").asJsonObject
        assertEquals(listOf("name", "primaryType", "baseStats", "nationalPokedexNumber", "implemented", "forms", "zzz"), file.keySet().toList())
        assertEquals(listOf("a", "b"), file.getAsJsonArray("forms").map { it.asJsonObject.getAsJsonArray("aspects")[0].asString })
        assertTrue(built.problems.isEmpty())
    }

    @Test
    fun build_NeverWritesTheStoresAttributesOrTheOverlayFields() {
        val file = SpeciesFileBuilder.build(forms("[${form(base)}]"), RulesVariant.FAITHFUL)
            .file("data/cobblemon/species/infinity/tuskor.json").asJsonObject

        for (name in listOf("formId", "addedByGame", "source", "revision", "pk", "origin", "lang", "fossil", "mega", "rebalanced")) {
            assertFalse(file.has(name), name)
        }
    }

    @Test
    fun build_Rebalanced_LaysTheOverlayOverTheFields() {
        val file = SpeciesFileBuilder.build(forms("[${form(base)}]"), RulesVariant.REBALANCED)
            .file("data/cobblemon/species/infinity/tuskor.json").asJsonObject

        assertEquals(json("""{"hp":70}"""), file.get("baseStats"))
        assertEquals("ground", file.get("primaryType").asString)
        assertFalse(file.has("rebalanced"))
    }

    @Test
    fun build_CollectsTheLangEntries_AndReportsTwoCopiesThatDisagree() {
        val other = base.replace("A tusked one.", "Another text.").replace("infinity#tuskor#normal", "infinity#tuskor#b")
            .replace(""""file":"tuskor"}""", """"file":"other"}""")

        val built = SpeciesFileBuilder.build(forms("[${form(base)},${form(other)}]"), RulesVariant.FAITHFUL)

        assertEquals("A tusked one.", built.lang["cobblemon.species.tuskor.desc"])
        assertEquals("Tuskor", built.lang["cobblemon.species.tuskor.name"])
        assertEquals(1, built.problems.size)
        assertTrue(built.problems[0].startsWith("cobblemon.species.tuskor.desc:"))
    }

    @Test
    fun build_InlineFormsWhoseSpeciesFormIsNotEnabled_AreLeftOutAndNamed() {
        val built = SpeciesFileBuilder.build(forms("[${form(inline(0, "a"))}]"), RulesVariant.FAITHFUL)

        assertTrue(built.files.isEmpty())
        assertEquals(1, built.skipped.size)
        assertTrue(built.problems.isEmpty())
    }

    private val addition = """{"file":"abomasnow","target":"cobblemon:abomasnow","hasForms":true,"additions":{"preEvolution":"snover","features":["x"]}}"""
    private fun additionForm(index: Int, name: String) = """
        {"formId":"infinity#abomasnow#$name","addedByGame":"infinity","source":"gravelmon",
         "species":{"formId":"infinity#abomasnow#$name","origin":{"kind":"addition","file":"abomasnow","index":$index},"name":"$name","aspects":["$name"]},"spawns":[]}
    """

    @Test
    fun build_AnAdditionFileHasTheTargetItsFieldsAndItsFormsInOrder() {
        val owner = """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","addition":$addition,"spawns":[]}"""

        val built = SpeciesFileBuilder.build(forms("[$owner,${additionForm(1, "b")},${additionForm(0, "a")}]"), RulesVariant.FAITHFUL)

        val file = built.file("data/gravelmon/species_additions/abomasnow.json").asJsonObject
        assertEquals(listOf("target", "forms", "preEvolution", "features"), file.keySet().toList())
        assertEquals(listOf("a", "b"), file.getAsJsonArray("forms").map { it.asJsonObject.get("name").asString })
    }

    @Test
    fun build_AnAdditionDoesNotEvolveIntoSpeciesThatAreLeftOut() {
        val withEvolutions = addition.replace(
            """"additions":{""",
            """"additions":{"evolutions":[{"id":"a_tuskor","result":"tuskor"},{"id":"a_oreon","result":"cobblemon:oreon form=x"},{"id":"a_vaporeon","result":"vaporeon"}],""",
        )
        val owner = """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","addition":$withEvolutions,"spawns":[]}"""

        val built = SpeciesFileBuilder.build(forms("[$owner]"), RulesVariant.FAITHFUL, setOf("tuskor", "oreon"))

        val evolutions = built.file("data/gravelmon/species_additions/abomasnow.json").asJsonObject.getAsJsonArray("evolutions")
        assertEquals(listOf("a_vaporeon"), evolutions.map { it.asJsonObject.get("id").asString })
    }

    @Test
    fun build_AnAdditionDropsTheItemsOfTheEvolutionsItLosesUnlessAKeptOneNeedsThem() {
        val evolutions = """"evolutions":[
            {"id":"a","result":"tuskor","requiredContext":"gravelmon:varia_stone","requirements":[]},
            {"id":"b","result":"tuskor","requirements":[{"variant":"held_item","itemCondition":"cobblemon:expert_belt"}]},
            {"id":"c","result":"tuskor","requiredContext":"cobblemon:moon_stone","requirements":[]},
            {"id":"d","result":"oreon","requiredContext":"cobblemon:moon_stone","requirements":[]}],
            "drops":{"amount":1,"entries":[{"item":"gravelmon:varia_stone"},{"item":"cobblemon:expert_belt"},{"item":"cobblemon:moon_stone"},{"item":"minecraft:cookie"}]},"""
        val owner = """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","spawns":[],
            "addition":${addition.replace(""""additions":{""", """"additions":{$evolutions""")}}"""

        val built = SpeciesFileBuilder.build(forms("[$owner]"), RulesVariant.FAITHFUL, setOf("tuskor"))

        val drops = built.file("data/gravelmon/species_additions/abomasnow.json").asJsonObject.getAsJsonObject("drops").getAsJsonArray("entries")
        assertEquals(listOf("cobblemon:moon_stone", "minecraft:cookie"), drops.map { it.asJsonObject.get("item").asString })
    }

    @Test
    fun build_TheMovesOfAnAdditionFileAreAMoveAdditionsFile_NotPartOfTheAdditionFile() {
        val owner = """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","spawns":[],
            "addition":${addition.replace(""""additions":{""", """"additions":{"moves":["tm:dragonpledge","tm:soundpledge"],""")}}"""

        val built = SpeciesFileBuilder.build(forms("[$owner]"), RulesVariant.FAITHFUL)
        val extras = ExtrasBuilder.build(forms("[$owner]"), emptyList())

        assertTrue("moves" !in built.file("data/gravelmon/species_additions/abomasnow.json").asJsonObject.keySet())
        val file = extras.files["data/cobblemon/move_additions/abomasnow.json"]!!.asJsonObject
        assertEquals("abomasnow", file.get("recipient").asString)
        assertEquals(listOf("tm:dragonpledge", "tm:soundpledge"), file.getAsJsonArray("learnsetEntries").map { it.asString })
    }

    @Test
    fun build_AnAdditionWhoseFormsAreAllDisabled_KeepsWhatElseItAddsOrIsDropped() {
        val owner = """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","addition":$addition,"spawns":[]}"""
        val onlyForms = owner.replace(""""additions":{"preEvolution":"snover","features":["x"]}""", """"additions":{}""")

        val kept = SpeciesFileBuilder.build(forms("[$owner]"), RulesVariant.FAITHFUL)
        val dropped = SpeciesFileBuilder.build(forms("[$onlyForms]"), RulesVariant.FAITHFUL)

        assertEquals(listOf("target", "preEvolution", "features"), kept.file("data/gravelmon/species_additions/abomasnow.json").asJsonObject.keySet().toList())
        assertTrue(dropped.files.isEmpty())
    }

    @Test
    fun build_AdditionFormsWithoutTheirTarget_AreLeftOutAndNamed() {
        val built = SpeciesFileBuilder.build(forms("[${additionForm(0, "a")}]"), RulesVariant.FAITHFUL)

        assertTrue(built.files.isEmpty())
        assertEquals(1, built.skipped.size)
    }

    private fun spawnForm(formId: String, vararg spawns: Triple<String, Int, String>) =
        """{"formId":"$formId","addedByGame":"infinity","source":"gravelmon","spawns":[${spawns.joinToString(",") { (file, ord, entry) -> """{"ns":"gravelmon","file":"$file","ord":$ord,"source":"gravelmon","entry":$entry}""" }}]}"""

    @Test
    fun build_SpawnFilesAreTheUnionOfTheirFormsEntries_InOrder_AndACopyIsWrittenOnce() {
        val built = SpeciesFileBuilder.build(
            forms(
                "[${spawnForm("infinity#a#normal", Triple("a", 1, """{"id":"second"}"""), Triple("a", 0, """{"id":"first"}"""))}," +
                    "${spawnForm("infinity#a#b", Triple("a", 0, """{"id":"first"}"""), Triple("a", 2, """{"id":"third"}"""))}]",
            ),
            RulesVariant.FAITHFUL,
        )

        val file = built.file("data/gravelmon/spawn_pool_world/a.json").asJsonObject
        assertEquals(json("""{"enabled":true,"neededInstalledMods":[],"neededUninstalledMods":[],"spawns":[{"id":"first"},{"id":"second"},{"id":"third"}]}"""), file)
    }

    @Test
    fun build_DifferentEntriesAtOnePosition_AreAllWritten() {
        val built = SpeciesFileBuilder.build(
            forms("[${spawnForm("infinity#a#normal", Triple("a", 0, """{"id":"x","w":1}"""))},${spawnForm("infinity#a#b", Triple("a", 0, """{"id":"x","w":2}"""))}]"),
            RulesVariant.FAITHFUL,
        )

        assertEquals(2, built.file("data/gravelmon/spawn_pool_world/a.json").asJsonObject.getAsJsonArray("spawns").size())
    }

    @Test
    fun renderFile_IsTwoSpaceIndentedWithAFinalNewline() {
        assertEquals("{\n  \"a\": [\n    1\n  ]\n}\n", JsonTrees.renderFile(json("""{"a":[1]}""")))
    }

    @Test
    fun contentHash_MatchesTheSite_ForTheSameCanonicalText() {
        // sha256("{\"a\":1,\"b\":[true,null]}") starts with the digits the site's spawnContentHash gives for this entry.
        val a = JsonTrees.contentHash(json("""{"b":[true,null],"a":1}"""))
        val b = JsonTrees.contentHash(json("""{"a":1,"b":[true,null]}"""))

        assertEquals(a, b)
        assertEquals(16, a.length)
    }
}

class ExtrasBuilderTest {
    private fun form(formId: String, species: String) =
        """{"formId":"$formId","addedByGame":"infinity","source":"gravelmon","species":{"formId":"$formId",$species},"spawns":[]}"""

    private val fossilForm = form(
        "infinity#tuskor#normal",
        """"fossil":{"item":"tusk_fossil","definition":true,"rare":true,"digSites":[{"site":"mud_pit","rarity":"common"},{"site":"oak_tree","rarity":"uncommon"}]}""",
    )
    private val otherFossil = form(
        "infinity#amberon#alolan",
        """"fossil":{"item":"amber_fossil","definition":false,"rare":false,"digSites":[{"site":"mud_pit","rarity":"common"}]}""",
    )
    private val megaForm = form("soulstones#absol#epoch,mega", """"mega":{"stones":["epoch_absolite"],"palette":{"core":"#112233"}}""")
    private val megaPlain = form("soulstones#absol#mega_x", """"mega":{"stones":["absolite_x","absolite_y"]}""")

    private fun build(vararg forms: String, starters: List<ExtrasBuilder.GameStarters> = emptyList()) =
        ExtrasBuilder.build(forms("[${forms.joinToString(",")}]"), starters)

    @Test
    fun fossils_WriteTheDefinitionTheRareTableAndTheDigSiteLoot() {
        val built = build(fossilForm, otherFossil)

        assertEquals(json("""{"result":"tuskor","fossils":["gravelmon:tusk_fossil"]}"""), built.files["data/cobblemon/fossils/tuskor.json"])
        assertEquals(
            json(
                """{"type":"minecraft:archaeology","pools":[{"bonus_rolls":0,"entries":[{"type":"minecraft:item","name":"gravelmon:tusk_fossil","weight":2}],"rolls":1}],"random_sequence":"cobblemon:fossils/rare/tusk_fossil"}""",
            ),
            built.files["data/cobblemon/loot_tables/fossils/rare/tusk_fossil.json"],
        )
        assertEquals(
            json(
                """{"additions":[{"table":"cobblemon:fossils/common/prehistoric_mud_pit","items":["gravelmon:amber_fossil","gravelmon:tusk_fossil"]},{"table":"cobblemon:fossils/uncommon/prehistoric_oak_tree","items":["gravelmon:tusk_fossil"]}]}""",
            ),
            built.files["data/gravelmon/fossil_loot.json"],
        )
        assertFalse(built.files.containsKey("data/cobblemon/fossils/amberon_alolan.json"))
    }

    @Test
    fun fossils_NoFossilMeansNoLootFile() {
        assertTrue(build(form("infinity#a#normal", """"name":"a"""")).files.isEmpty())
    }

    @Test
    fun megas_WriteTheShowdownItemScriptOfEachStone() {
        val built = build(megaPlain, megaForm)

        val epoch = built.texts["data/gravelmon/mega_showdown/showdown/held_items/epochabsolite.js"]!!
        assertTrue(epoch.contains("""name: "Epoch absolite""""))
        assertTrue(epoch.contains("""megaStone: { "Absol-Epoch": "Absol-mega" }"""))
        assertTrue(epoch.contains("""itemUser: ["Absol-Epoch"]"""))
        val x = built.texts["data/gravelmon/mega_showdown/showdown/held_items/absolitex.js"]!!
        assertTrue(x.contains("""megaStone: { "Absol": "Absol-mega_x" }"""))
        assertEquals(built.files.keys.count { it.startsWith("data/gravelmon/mega_showdown/mega/") }, built.texts.size)
    }

    @Test
    fun megas_MapTheRecipientToItsStones_AndWriteOneMegaShowdownFilePerStone() {
        val built = build(megaPlain, megaForm)

        assertEquals(
            json("""{"megaEvolutions":[{"megaStones":["epoch_absolite"],"recipient":"absol epoch"},{"megaStones":["absolite_x","absolite_y"],"recipient":"absol"}]}"""),
            built.files["data/gravelmon/mega_evolutions.json"],
        )
        assertEquals(json("""{"pokemon":["absol"]}"""), built.files["data/gravelmon/species_feature_assignments/mega_evolution.json"])
        assertEquals(
            json(
                """{"showdown_id":"epochabsolite","pokemons":["Absol"],"aspect_conditions":{"apply":{"aspect":{"required_aspects":[["epoch"]]},"aspects":["mega_evolution=mega"]},"revert":{"aspects":["mega_evolution=none"]}}}""",
            ),
            built.files["data/gravelmon/mega_showdown/mega/epoch_absolite.json"],
        )
        assertEquals(
            json("""{"showdown_id":"absolitex","pokemons":["Absol"],"aspect_conditions":{"apply":{"aspect":{},"aspects":["mega_evolution=mega_x"]},"revert":{"aspects":["mega_evolution=none"]}}}"""),
            built.files["data/gravelmon/mega_showdown/mega/absolite_x.json"],
        )
    }

    @Test
    fun megas_AFormWithStonesButNoMegaAspect_IsAProblem() {
        val built = build(form("soulstones#absol#epoch", """"mega":{"stones":["s"]}"""))

        assertEquals(1, built.problems.size)
        assertFalse(built.files.containsKey("data/gravelmon/mega_evolutions.json"))
    }

    private fun category(name: String, order: Int, title: String?, vararg pokemon: Pair<String, String>): JsonObject {
        val titlePart = if (title == null) "" else ",\"title\":\"$title\""
        val entries = pokemon.joinToString(",") { "{\"formId\":\"${it.first}\",\"properties\":\"${it.second}\"}" }
        return json("{\"name\":\"$name\",\"order\":$order,\"displayName\":\"cobblemon.starterselection.category.$name\"$titlePart,\"pokemon\":[$entries]}").asJsonObject
    }

    @Test
    fun starters_AreFilesPerCategory_WithTheTitleInTheLanguageEntries() {
        val games = listOf(
            ExtrasBuilder.GameStarters(
                "infinity",
                listOf(category("infinity_1", 10, "Infinity 1", "infinity#lukpup#normal" to "lukpup level=10", "pokemon#abomasnow#normal" to "abomasnow level=5"), category("infinity_2", 20, null, "infinity#x#normal" to "x")),
            ),
        )

        val built = build(starters = games)

        assertEquals(
            json("""{"name":"infinity_1","order":10,"displayName":"cobblemon.starterselection.category.infinity_1","pokemon":["lukpup level=10","abomasnow level=5"]}"""),
            built.files["data/gravelmon/starters/infinity_1.json"],
        )
        assertEquals(mapOf("cobblemon.starterselection.category.infinity_1" to "Infinity 1"), built.lang)
    }

    @Test
    fun filterStarters_DropsDisabledGamesAndStartersAndEmptyCategories_KeepsVanilla() {
        val games = listOf(
            ExtrasBuilder.GameStarters(
                "infinity",
                listOf(
                    category("a", 1, null, "infinity#on#normal" to "on", "infinity#off#normal" to "off", "pokemon#abomasnow#normal" to "abomasnow"),
                    category("b", 2, null, "infinity#off#normal" to "off"),
                ),
            ),
            ExtrasBuilder.GameStarters("gone", listOf(category("c", 1, null, "pokemon#abomasnow#normal" to "abomasnow"))),
        )

        val kept = ExtrasBuilder.filterStarters(games, disabledGames = setOf("gone"), enabledFormIds = setOf("infinity#on#normal"))

        assertEquals(listOf("infinity"), kept.map { it.id })
        assertEquals(listOf("a"), kept[0].categories.map { it.get("name").asString })
        assertEquals(
            listOf("on", "abomasnow"),
            kept[0].categories[0].getAsJsonArray("pokemon").map { it.asJsonObject.get("properties").asString },
        )
        // The input is left as it was.
        assertEquals(3, games[0].categories[0].getAsJsonArray("pokemon").size())
    }

    @Test
    fun propertiesOfForm_IsTheNameAndTheAspects() {
        assertEquals("absol epoch mega", ExtrasBuilder.propertiesOfForm("g#absol#epoch,mega"))
        assertEquals("absol", ExtrasBuilder.propertiesOfForm("g#absol#normal"))
    }
}

class SelectorDataTest {
    @Test
    fun parseSpecies_KeepsTheFormsAsObjects() {
        val data = SelectorData.parseSpecies("""{"dataRevision":7,"games":[],"forms":[{"formId":"a#b#normal"},5]}""")

        assertEquals("7", data.dataRevision)
        assertEquals(1, data.forms.size)
    }

    @Test
    fun parseGames_ReadsTheCategoriesOfEachGame() {
        val data = SelectorData.parseGames("""{"dataRevision":2,"games":[{"id":"infinity","starters":[{"name":"a","order":1,"displayName":"d","pokemon":[]}]},{"nope":1}]}""")

        assertEquals(listOf("infinity"), data.games.map { it.id })
        assertEquals(1, data.games[0].categories.size)
    }

    @Test
    fun parse_ABodyOfTheWrongShapeIsRefused() {
        org.junit.jupiter.api.Assertions.assertThrows(com.google.gson.JsonParseException::class.java) { SelectorData.parseSpecies("""{"forms":5}""") }
        org.junit.jupiter.api.Assertions.assertThrows(com.google.gson.JsonParseException::class.java) { SelectorData.parseGames("[]") }
    }
}

class PackDataBuilderTest {
    private fun speciesForm(game: String, name: String, extra: String = "") =
        """{"formId":"$game#$name#normal","addedByGame":"$game","source":"gravelmon","species":{"formId":"$game#$name#normal","origin":{"kind":"species","folder":"$game","file":"$name"},"lang":{"$name.name":"${name.replaceFirstChar { it.uppercase() }}"},"name":"$name"$extra},"spawns":[{"ns":"gravelmon","file":"$name","ord":0,"source":"gravelmon","entry":{"id":"$name"}}]}"""

    private val vanillaWithAddition =
        """{"formId":"pokemon#abomasnow#normal","addedByGame":"pokemon","source":"cobblemon","addition":{"file":"abomasnow","target":"cobblemon:abomasnow","hasForms":false,"additions":{"preEvolution":"snover"}},"spawns":[]}"""

    private val species = SelectorData.parseSpecies(
        """{"dataRevision":4,"games":[],"forms":[${speciesForm("infinity", "lukpup")},${speciesForm("infinity", "tuskor", ""","fossil":{"item":"tusk_fossil","definition":true,"rare":false,"digSites":[{"site":"mud_pit","rarity":"common"}]}""")},${speciesForm("atlas", "orchynx")},$vanillaWithAddition]}""",
    )

    private fun category(name: String, vararg forms: String): String =
        """{"name":"$name","order":1,"displayName":"cobblemon.starterselection.category.$name","title":"Title $name","pokemon":[${forms.joinToString(",") { """{"formId":"$it","properties":"${it.split('#')[1]} level=10"}""" }}]}"""

    private val games = SelectorData.parseGames(
        """{"dataRevision":4,"games":[{"id":"infinity","starters":[${category("infinity_1", "infinity#lukpup#normal", "infinity#tuskor#normal")}]},{"id":"atlas","starters":[${category("atlas_1", "atlas#orchynx#normal")}]}]}""",
    )

    private fun build(selection: Gms3.Selection = Gms3.Selection(emptyList(), emptyList()), rules: RulesVariant = RulesVariant.FAITHFUL) =
        PackDataBuilder.build(species, games, selection, rules)

    @Test
    fun everythingEnabled_BuildsEveryFile() {
        val result = build()

        assertEquals(
            setOf(
                "data/cobblemon/species/infinity/lukpup.json", "data/cobblemon/species/infinity/tuskor.json", "data/cobblemon/species/atlas/orchynx.json",
                "data/gravelmon/spawn_pool_world/lukpup.json", "data/gravelmon/spawn_pool_world/tuskor.json", "data/gravelmon/spawn_pool_world/orchynx.json",
                "data/gravelmon/species_additions/abomasnow.json", "data/gravelmon/starters/infinity_1.json", "data/gravelmon/starters/atlas_1.json",
                "data/cobblemon/fossils/tuskor.json", "data/gravelmon/fossil_loot.json", "assets/cobblemon/lang/en_us.json",
                "data/cobblemon/dex_entries/pokemon/infinity/lukpup.json", "data/cobblemon/dex_entries/pokemon/infinity/tuskor.json",
                "data/cobblemon/dex_entries/pokemon/atlas/orchynx.json",
            ),
            result.files.keys,
        )
        assertEquals(3, result.enabledForms)
        assertTrue(result.problems.isEmpty())
    }

    @Test
    fun aDisabledGame_RemovesItsFormsSpawnsStartersAndLang_ButNotVanillaAdditions() {
        val result = build(Gms3.Selection(listOf("atlas"), emptyList()))

        assertFalse(result.files.containsKey("data/cobblemon/species/atlas/orchynx.json"))
        assertFalse(result.files.containsKey("data/gravelmon/spawn_pool_world/orchynx.json"))
        assertFalse(result.files.containsKey("data/gravelmon/starters/atlas_1.json"))
        assertTrue(result.files.containsKey("data/gravelmon/species_additions/abomasnow.json"))
        val lang = PackDataBuilder.parse(result.files.getValue("assets/cobblemon/lang/en_us.json")).asJsonObject
        assertFalse(lang.has("cobblemon.species.orchynx.name"))
        assertEquals("Lukpup", lang.get("cobblemon.species.lukpup.name").asString)
        assertEquals("Title infinity_1", lang.get("cobblemon.starterselection.category.infinity_1").asString)
        assertEquals(1, result.disabledForms)
    }

    @Test
    fun aDisabledForm_RemovesItsFossil_AndItsStarterButNotTheCategoryOfOthers() {
        val result = build(Gms3.Selection(emptyList(), listOf("infinity#tuskor#normal")))

        assertFalse(result.files.containsKey("data/cobblemon/fossils/tuskor.json"))
        assertFalse(result.files.containsKey("data/gravelmon/fossil_loot.json"))
        val starter = PackDataBuilder.parse(result.files.getValue("data/gravelmon/starters/infinity_1.json")).asJsonObject
        assertEquals(listOf("lukpup level=10"), starter.getAsJsonArray("pokemon").map { it.asString })
    }

    @Test
    fun aCategoryWithNoEnabledStarter_IsNotWritten() {
        val result = build(Gms3.Selection(emptyList(), listOf("atlas#orchynx#normal")))

        assertFalse(result.files.containsKey("data/gravelmon/starters/atlas_1.json"))
    }

    @Test
    fun theRulesDecideTheOverlay() {
        val withOverlay = SelectorData.parseSpecies(
            """{"forms":[${speciesForm("infinity", "lukpup", ""","primaryType":"fire","rebalanced":{"primaryType":"water"}""")}]}""",
        )
        val empty = SelectorData.Games(null, emptyList())
        val none = Gms3.Selection(emptyList(), emptyList())

        val faithful = PackDataBuilder.build(withOverlay, empty, none, RulesVariant.FAITHFUL)
        val rebalanced = PackDataBuilder.build(withOverlay, empty, none, RulesVariant.REBALANCED)

        fun type(r: PackDataBuilder.Result) = PackDataBuilder.parse(r.files.getValue("data/cobblemon/species/infinity/lukpup.json")).asJsonObject.get("primaryType").asString
        assertEquals("fire", type(faithful))
        assertEquals("water", type(rebalanced))
    }

    @Test
    fun idsInTheCodeThatMatchNothing_AreReported_NotFatal() {
        val result = build(Gms3.Selection(listOf("nowhere"), listOf("nope#x#normal")))

        assertEquals(listOf("nowhere"), result.unknownGames)
        assertEquals(listOf("nope#x#normal"), result.unknownForms)
        assertEquals(3, result.enabledForms)
    }

    @Test
    fun filesAreWrittenTwoSpaceIndentedWithAFinalNewline() {
        val text = build().files.getValue("data/gravelmon/starters/infinity_1.json")

        assertTrue(text.startsWith("{\n  \"name\": \"infinity_1\""))
        assertTrue(text.endsWith("}\n"))
    }

    private fun numbered(game: String, name: String, number: Int) =
        """{"formId":"$game#$name#normal","addedByGame":"$game","source":"gravelmon","species":{"formId":"$game#$name#normal","origin":{"kind":"species","folder":"$game","file":"$name"},"name":"$name","catalogue":{"localDexNumber":$number}},"spawns":[]}"""

    private fun numberedForm(game: String, name: String, formName: String, number: Int) =
        """{"formId":"$game#$name#${formName.lowercase()}","addedByGame":"$game","source":"gravelmon","species":{"formId":"$game#$name#${formName.lowercase()}","origin":{"kind":"addition","file":"$name","index":0},"name":"$formName","catalogue":{"localDexNumber":$number}},"spawns":[]}"""

    private fun dexSpecies(vararg forms: String, priorities: String = "[]") = SelectorData.parseSpecies("""{"games":$priorities,"forms":[${forms.joinToString(",")}]}""")

    private fun dexOf(result: PackDataBuilder.Result, game: String) =
        PackDataBuilder.parse(result.files.getValue("data/gravelmon/dexes/$game.json")).asJsonObject

    private val noGames = SelectorData.Games(null, emptyList())
    private val nothingOff = Gms3.Selection(emptyList(), emptyList())

    @Test
    fun aGamesDexIsDerivedFromItsFormsInLocalDexOrder_WithAdditionFormsAsSpeciesAndForm() {
        val data = dexSpecies(
            numbered("atlas", "second", 2),
            numbered("atlas", "first", 1),
            numberedForm("atlas", "bulbasaur", "Epoch", 3),
            numberedForm("atlas", "arbok", "nuclear", 4),
            numberedForm("atlas", "venusaur", "mega_epoch", 5),
        )

        val dex = dexOf(PackDataBuilder.build(data, noGames, nothingOff, RulesVariant.FAITHFUL), "atlas")

        assertEquals("cobblemon:simple_pokedex_def", dex.get("type").asString)
        assertEquals("gravelmon:atlas", dex.get("id").asString)
        assertEquals(
            listOf("cobblemon:first", "cobblemon:second", "cobblemon:bulbasaur-epoch"),
            dex.getAsJsonArray("entries").map { it.asString },
        )
    }

    @Test
    fun aPokemonTheSelectionLeftOut_IsNotInTheDexOrAsAnEntry() {
        val data = dexSpecies(numbered("atlas", "kept", 1), numbered("atlas", "gone", 2))

        val result = PackDataBuilder.build(data, noGames, Gms3.Selection(emptyList(), listOf("atlas#gone#normal")), RulesVariant.FAITHFUL)

        assertEquals(listOf("cobblemon:kept"), dexOf(result, "atlas").getAsJsonArray("entries").map { it.asString })
        assertFalse(result.files.containsKey("data/cobblemon/dex_entries/pokemon/atlas/gone.json"))
    }

    @Test
    fun theNationalDexListsTheGameDexesThatAreLeft_ByPriorityThenId_WithNumberedSortOrders() {
        val data = dexSpecies(
            numbered("infinity", "a", 1),
            numbered("xenoverse", "b", 1),
            numbered("atlas", "c", 1),
            priorities = """[{"id":"xenoverse","priority":2},{"id":"atlas","priority":99},{"id":"infinity","priority":99}]""",
        )

        val all = PackDataBuilder.build(data, noGames, nothingOff, RulesVariant.FAITHFUL)
        val noXenoverse = PackDataBuilder.build(data, noGames, Gms3.Selection(listOf("xenoverse"), emptyList()), RulesVariant.FAITHFUL)

        fun national(r: PackDataBuilder.Result) =
            PackDataBuilder.parse(r.files.getValue("data/gravelmon/dex_additions/national.json")).asJsonObject.getAsJsonArray("entries").map { it.asString }
        assertEquals(listOf("gravelmon:xenoverse", "gravelmon:atlas", "gravelmon:infinity"), national(all))
        assertEquals(listOf(11, 12, 13), listOf("xenoverse", "atlas", "infinity").map { dexOf(all, it).get("sortOrder").asInt })
        assertEquals(listOf("gravelmon:atlas", "gravelmon:infinity"), national(noXenoverse))
        assertFalse(noXenoverse.files.containsKey("data/gravelmon/dexes/xenoverse.json"))
    }

    @Test
    fun aGameWithNothingLeftToList_HasNoDex_AndThereIsNoNationalDex() {
        val data = dexSpecies(numbered("infinity", "tuskor", 1))

        val result = PackDataBuilder.build(data, noGames, Gms3.Selection(emptyList(), listOf("infinity#tuskor#normal")), RulesVariant.FAITHFUL)

        assertFalse(result.files.containsKey("data/gravelmon/dexes/infinity.json"))
        assertFalse(result.files.containsKey("data/gravelmon/dex_additions/national.json"))
    }

    @Test
    fun aFormWithoutALocalDexNumber_AndVanillasOwnGame_AreNotInAnyDex() {
        val data = dexSpecies(numbered("atlas", "numbered", 1), numbered("pokemon", "abra", 63), speciesForm("atlas", "unnumbered"))

        val result = PackDataBuilder.build(data, noGames, nothingOff, RulesVariant.FAITHFUL)

        assertEquals(listOf("cobblemon:numbered"), dexOf(result, "atlas").getAsJsonArray("entries").map { it.asString })
        assertFalse(result.files.containsKey("data/gravelmon/dexes/pokemon.json"))
    }

    @Test
    fun theDexEntryAdditionsListTheFormsOfAnAdditionFile_MegasFirst_WithoutTheFlagForms() {
        fun additionForm(index: Int, name: String) =
            """{"formId":"uranium#abra#$name","addedByGame":"uranium","source":"gravelmon","species":{"formId":"uranium#abra#$name","origin":{"kind":"addition","file":"abra","index":$index},"name":"$name"},"spawns":[]}"""
        val owner = """{"formId":"pokemon#abra#normal","addedByGame":"pokemon","source":"cobblemon","addition":{"file":"abra","target":"cobblemon:abra","hasForms":true,"additions":{}},"spawns":[]}"""
        val data = SelectorData.parseSpecies(
            """{"forms":[$owner,${additionForm(0, "Epoch")},${additionForm(1, "mega_epoch")},${additionForm(2, "nuclear")},${additionForm(3, "armored")}]}""",
        )

        val result = PackDataBuilder.build(data, SelectorData.Games(null, emptyList()), Gms3.Selection(emptyList(), emptyList()), RulesVariant.FAITHFUL)

        val file = PackDataBuilder.parse(result.files.getValue("data/gravelmon/dex_entry_additions/abra.json")).asJsonObject
        assertEquals("cobblemon:abra", file.get("entryId").asString)
        assertEquals(listOf("Mega_epoch", "Epoch"), file.getAsJsonArray("forms").map { it.asJsonObject.get("displayForm").asString })
    }

    @Test
    fun anAdditionWhoseOnlyFormsAreFlagForms_HasNoDexEntryAddition() {
        val owner = """{"formId":"pokemon#abra#normal","addedByGame":"pokemon","source":"cobblemon","addition":{"file":"abra","target":"cobblemon:abra","hasForms":true,"additions":{}},"spawns":[]}"""
        val nuclear = """{"formId":"uranium#abra#nuclear","addedByGame":"uranium","source":"gravelmon","species":{"formId":"uranium#abra#nuclear","origin":{"kind":"addition","file":"abra","index":0},"name":"nuclear"},"spawns":[]}"""
        val data = SelectorData.parseSpecies("""{"forms":[$owner,$nuclear]}""")

        val result = PackDataBuilder.build(data, SelectorData.Games(null, emptyList()), Gms3.Selection(emptyList(), emptyList()), RulesVariant.FAITHFUL)

        assertFalse(result.files.containsKey("data/gravelmon/dex_entry_additions/abra.json"))
    }

    @Test
    fun aFormsMoveAdditionsAreWrittenAsAMoveAdditionsFile_AndNeverIntoTheSpeciesFile() {
        val owner = """{"formId":"pokemon#arbok#normal","addedByGame":"pokemon","source":"cobblemon","addition":{"file":"arbok","target":"cobblemon:arbok","hasForms":true,"additions":{}},"spawns":[]}"""
        val nuclear = """{"formId":"uranium#arbok#nuclear","addedByGame":"uranium","source":"gravelmon","species":{"formId":"uranium#arbok#nuclear","origin":{"kind":"addition","file":"arbok","index":0},"name":"nuclear","moveAdditions":["25:radioacid","25:nuclearwaste"]},"spawns":[]}"""
        val data = SelectorData.parseSpecies("""{"forms":[$owner,$nuclear]}""")

        val result = PackDataBuilder.build(data, SelectorData.Games(null, emptyList()), Gms3.Selection(emptyList(), emptyList()), RulesVariant.FAITHFUL)

        val file = PackDataBuilder.parse(result.files.getValue("data/cobblemon/move_additions/arbok_nuclear.json")).asJsonObject
        assertEquals("arbok nuclear", file.get("recipient").asString)
        assertEquals(listOf("25:radioacid", "25:nuclearwaste"), file.getAsJsonArray("learnsetEntries").map { it.asString })
        assertFalse(result.files.getValue("data/gravelmon/species_additions/arbok.json").contains("moveAdditions"))
    }
}
