package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonElement
import com.google.gson.JsonObject

/**
 * Builds the files for the starters, fossils and mega evolutions from the data of the site: a port of `generateExtrasFiles`
 * (`extrasFiles.ts`), which the site's own tests check against the Mod's files.
 *
 * - `data/gravelmon/starters/<category>.json` for each starter category of a game;
 * - `data/cobblemon/fossils/<result>.json` and `data/cobblemon/loot_tables/fossils/rare/<item>.json` for a fossil that has them;
 * - `data/gravelmon/fossil_loot.json`: which fossil items the dig-site loot tables gain (what the Mod code used to queue);
 * - `data/gravelmon/mega_evolutions.json`, `data/gravelmon/mega_showdown/mega/<stone>.json` and
 *   `data/gravelmon/species_feature_assignments/mega_evolution.json` for the mega forms;
 * - `data/cobblemon/move_additions/<name>_<aspects>.json` for a form with `moveAdditions`;
 * - `data/cobblemon/dex_entries/pokemon/<folder>/<name>.json` for every Pokemon of Gravelmon's own and `data/gravelmon/dex_entry_additions/<file>.json` for the
 *   forms an addition file gives a vanilla Pokemon (both derived, nothing is stored for them);
 * - `data/gravelmon/dexes/<game>.json` for each game's Pokedex and `data/gravelmon/dex_additions/national.json`, the games' dexes in order (both derived: see [GameDexes]).
 *
 * The caller passes the **enabled** forms only, and the starters already filtered with [filterStarters]; nothing else here
 * knows about selections, so a disabled Pokemon simply never gets a file.
 */
object ExtrasBuilder {
    class Built(
        /** Pack path to JSON. */
        val files: Map<String, JsonElement>,
        /** The language entries the extras carry: the title of each starter category's lang key. */
        val lang: Map<String, String>,
        val problems: List<String>,
        /** Pack path to the text of a file that is not JSON: the Showdown item script of each mega stone. */
        val texts: Map<String, String> = emptyMap(),
    )

    /** A game's starter categories as `GET /api/selector/games` carries them. */
    class GameStarters(val id: String, val categories: List<JsonObject>)

    /**
     * Starters hang off the game: a disabled game has none, a starter is enabled when its form is, and a category with no enabled
     * starter left is dropped. Vanilla forms are always enabled ([alwaysEnabled]); [enabledFormIds] holds the enabled Gravelmon forms.
     */
    fun filterStarters(
        games: List<GameStarters>,
        disabledGames: Set<String>,
        enabledFormIds: Set<String>,
        alwaysEnabled: (String) -> Boolean = { it.startsWith("pokemon#") },
    ): List<GameStarters> = games.filter { it.id !in disabledGames }.map { game ->
        GameStarters(
            game.id,
            game.categories.mapNotNull { category ->
                val kept = JsonTrees.list(category, "pokemon")?.filter { entry ->
                    val formId = entry.takeIf { it.isJsonObject }?.asJsonObject?.let { JsonTrees.string(it, "formId") }
                    formId != null && (formId in enabledFormIds || alwaysEnabled(formId))
                }.orEmpty()
                if (kept.isEmpty()) null else category.deepCopy().also { it.add("pokemon", JsonTrees.array(kept)) }
            },
        )
    }

    private class Parts(val game: String, val pokemon: String, val aspects: List<String>)

    /** `game#pokemon#aspect1,aspect2` as its parts (`normal` means no aspects). */
    private fun partsOf(formId: String): Parts {
        val pieces = formId.split('#')
        val aspects = pieces.getOrNull(2) ?: "normal"
        return Parts(pieces.getOrElse(0) { "" }, pieces.getOrElse(1) { "" }, if (aspects == "normal" || aspects.isEmpty()) emptyList() else aspects.split(','))
    }

    /** The properties string of a form: `name aspect1 aspect2`. */
    fun propertiesOfForm(formId: String): String = partsOf(formId).let { (listOf(it.pokemon) + it.aspects).joinToString(" ") }

    private fun String.capitalised() = replaceFirstChar { it.uppercaseChar() }

    private class MegaForm(val formId: String, val stones: List<String>)

    /** Forms an addition file gives a vanilla Pokemon that a Pokedex entry does not list: the ones that only switch a flag on (`nuclear`, `armored`). */
    private val DEX_HIDDEN_FORM = Regex("^(nuclear|armored(_.*)?)$", RegexOption.IGNORE_CASE)

    fun build(forms: List<JsonObject>, starters: List<GameStarters>, gamePriorities: Map<String, Int> = emptyMap()): Built {
        val files = LinkedHashMap<String, JsonElement>()
        val lang = LinkedHashMap<String, String>()
        val problems = mutableListOf<String>()
        val texts = LinkedHashMap<String, String>()

        // ---- the Pokedex of the games, derived from the forms the games add (GameDexes)
        val dexes = GameDexes.derive(forms, gamePriorities)
        for (dex in dexes) {
            files["data/gravelmon/dexes/${dex.game}.json"] = JsonTrees.obj(
                "type" to JsonTrees.text("cobblemon:simple_pokedex_def"),
                "sortOrder" to com.google.gson.JsonPrimitive(dex.sortOrder),
                "id" to JsonTrees.text("gravelmon:${dex.game}"),
                "entries" to JsonTrees.strings(dex.entries),
            )
        }
        if (dexes.isNotEmpty()) {
            files["data/gravelmon/dex_additions/national.json"] = JsonTrees.obj(
                "dexId" to JsonTrees.text("cobblemon:national"),
                "entries" to JsonTrees.strings(dexes.map { "gravelmon:${it.game}" }),
            )
        }

        // ---- the Pokedex entries (derived)
        val additionHeaders = LinkedHashMap<String, JsonObject>()
        val additionForms = LinkedHashMap<String, MutableList<JsonObject>>()
        for (form in forms) {
            val species = JsonTrees.obj(form, "species")
            val origin = species?.let { JsonTrees.obj(it, "origin") }
            val kind = origin?.let { JsonTrees.string(it, "kind") }
            val file = origin?.let { JsonTrees.string(it, "file") }
            if (kind == "species" && file != null) {
                val folder = JsonTrees.string(origin, "folder") ?: continue
                val id = JsonTrees.text("cobblemon:$file")
                files["data/cobblemon/dex_entries/pokemon/$folder/$file.json"] = JsonTrees.obj(
                    "id" to id,
                    "speciesId" to id,
                    "displayAspects" to JsonTrees.array(emptyList()),
                    "conditionAspects" to JsonTrees.array(emptyList()),
                    "forms" to JsonTrees.array(
                        listOf(JsonTrees.obj("displayForm" to JsonTrees.text("Normal"), "unlockForms" to JsonTrees.strings(listOf("Normal")))),
                    ),
                    "variations" to JsonTrees.array(emptyList()),
                )
            } else if (kind == "addition" && file != null) {
                additionForms.getOrPut(file) { mutableListOf() } += species
            }
            JsonTrees.obj(form, "addition")?.let { header -> JsonTrees.string(header, "file")?.let { additionHeaders[it] = header } }
        }
        for ((file, header) in additionHeaders) {
            val shown = (additionForms[file] ?: emptyList())
                .sortedBy { JsonTrees.obj(it, "origin")?.get("index")?.takeIf { e -> e.isJsonPrimitive }?.asInt ?: 0 }
                .mapNotNull { JsonTrees.string(it, "name") }
                .filter { it.isNotEmpty() && !DEX_HIDDEN_FORM.matches(it) }
                .map { it.capitalised() }
            if (shown.isEmpty()) continue
            val target = JsonTrees.string(header, "target") ?: continue
            val ordered = shown.filter { it.lowercase().startsWith("mega") } + shown.filter { !it.lowercase().startsWith("mega") }
            files["data/gravelmon/dex_entry_additions/$file.json"] = JsonTrees.obj(
                "entryId" to JsonTrees.text(target),
                "forms" to JsonTrees.array(
                    ordered.map { JsonTrees.obj("displayForm" to JsonTrees.text(it), "unlockForms" to JsonTrees.strings(listOf(it))) },
                ),
            )
        }

        // ---- starters
        for (game in starters) {
            for (category in game.categories) {
                val name = JsonTrees.string(category, "name") ?: continue
                val displayName = JsonTrees.string(category, "displayName") ?: continue
                files["data/gravelmon/starters/$name.json"] = JsonTrees.obj(
                    "name" to JsonTrees.text(name),
                    "order" to (category.get("order")?.deepCopy() ?: JsonTrees.text("")),
                    "displayName" to JsonTrees.text(displayName),
                    "pokemon" to JsonTrees.strings(
                        JsonTrees.objects(category, "pokemon").mapNotNull { JsonTrees.string(it, "properties") },
                    ),
                )
                JsonTrees.string(category, "title")?.let { lang[displayName] = it }
            }
        }

        // ---- fossils
        val lootByTable = LinkedHashMap<String, MutableList<String>>()
        val megaForms = mutableListOf<MegaForm>()
        for (form in forms) {
            val species = JsonTrees.obj(form, "species") ?: continue
            val formId = JsonTrees.string(species, "formId") ?: JsonTrees.string(form, "formId") ?: continue
            val fossil = JsonTrees.obj(species, "fossil")
            val fossilItem = fossil?.let { JsonTrees.string(it, "item") }
            if (fossil != null && fossilItem != null) {
                val result = propertiesOfForm(formId)
                if (fossil.get("definition")?.takeIf { it.isJsonPrimitive }?.asBoolean == true) {
                    files["data/cobblemon/fossils/${result.replace(' ', '_')}.json"] = JsonTrees.obj(
                        "result" to JsonTrees.text(result),
                        "fossils" to JsonTrees.strings(listOf("gravelmon:$fossilItem")),
                    )
                }
                if (fossil.get("rare")?.takeIf { it.isJsonPrimitive }?.asBoolean == true) {
                    files["data/cobblemon/loot_tables/fossils/rare/$fossilItem.json"] = rareTable(fossilItem)
                }
                for (site in JsonTrees.objects(fossil, "digSites")) {
                    val where = JsonTrees.string(site, "site") ?: continue
                    val rarity = JsonTrees.string(site, "rarity") ?: continue
                    lootByTable.getOrPut("cobblemon:fossils/$rarity/prehistoric_$where") { mutableListOf() } += "gravelmon:$fossilItem"
                }
            }
            JsonTrees.list(species, "moveAdditions")?.let { entries ->
                val recipient = propertiesOfForm(formId)
                files["data/cobblemon/move_additions/${recipient.replace(' ', '_')}.json"] = JsonTrees.obj(
                    "recipient" to JsonTrees.text(recipient),
                    "learnsetEntries" to JsonTrees.strings(entries.mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }),
                )
            }
            val stones = JsonTrees.obj(species, "mega")?.let { JsonTrees.list(it, "stones") }
            if (stones != null) {
                megaForms += MegaForm(formId, stones.mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString })
            }
        }
        // The moves of an addition file would replace the moves of the species it extends, so they become a move_additions file for that species.
        for (form in forms) {
            val addition = JsonTrees.obj(form, "addition") ?: continue
            val moves = JsonTrees.obj(addition, "additions")?.let { JsonTrees.list(it, "moves") }?.mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }
            val target = JsonTrees.string(addition, "target")
            if (moves.isNullOrEmpty() || target == null) continue
            val recipient = target.substringAfter(':')
            val path = "data/cobblemon/move_additions/${recipient.replace(' ', '_')}.json"
            val existing = files[path]?.asJsonObject?.let { JsonTrees.list(it, "learnsetEntries") }?.mapNotNull { it.asString } ?: emptyList()
            files[path] = JsonTrees.obj(
                "recipient" to JsonTrees.text(recipient),
                "learnsetEntries" to JsonTrees.strings(existing + moves.filter { it !in existing }),
            )
        }
        if (lootByTable.isNotEmpty()) {
            files["data/gravelmon/fossil_loot.json"] = JsonTrees.obj(
                "additions" to JsonTrees.array(
                    lootByTable.entries.sortedBy { it.key }.map { (table, items) ->
                        JsonTrees.obj("table" to JsonTrees.text(table), "items" to JsonTrees.strings(items.sorted()))
                    },
                ),
            )
        }

        // ---- megas
        val evolutions = mutableListOf<JsonElement>()
        val featurePokemon = sortedSetOf<String>()
        for (mega in megaForms.sortedBy { it.formId }) {
            val parts = partsOf(mega.formId)
            val megaAspect = parts.aspects.firstOrNull { it == "mega" || it.startsWith("mega_") }
            if (megaAspect == null) {
                problems += "${mega.formId} has mega stones but no mega aspect."
                continue
            }
            val recipientAspects = parts.aspects.filter { it != megaAspect }
            val recipient = (listOf(parts.pokemon) + recipientAspects).joinToString(" ")
            evolutions += JsonTrees.obj("megaStones" to JsonTrees.strings(mega.stones), "recipient" to JsonTrees.text(recipient))
            featurePokemon += parts.pokemon
            for (stone in mega.stones) {
                val aspect = if (recipientAspects.isEmpty()) JsonObject()
                else JsonTrees.obj("required_aspects" to JsonTrees.array(listOf(JsonTrees.strings(recipientAspects))))
                files["data/gravelmon/mega_showdown/mega/$stone.json"] = JsonTrees.obj(
                    "showdown_id" to JsonTrees.text(stone.replace("_", "")),
                    "pokemons" to JsonTrees.strings(listOf(parts.pokemon.capitalised())),
                    "aspect_conditions" to JsonTrees.obj(
                        "apply" to JsonTrees.obj("aspect" to aspect, "aspects" to JsonTrees.strings(listOf("mega_evolution=$megaAspect"))),
                        "revert" to JsonTrees.obj("aspects" to JsonTrees.strings(listOf("mega_evolution=none"))),
                    ),
                )
                texts["data/gravelmon/mega_showdown/showdown/held_items/${stone.replace("_", "")}.js"] =
                    stoneScript(stone, parts.pokemon, recipientAspects, megaAspect)
            }
        }
        if (evolutions.isNotEmpty()) {
            files["data/gravelmon/mega_evolutions.json"] = JsonTrees.obj("megaEvolutions" to JsonTrees.array(evolutions))
            files["data/gravelmon/species_feature_assignments/mega_evolution.json"] = JsonTrees.obj("pokemon" to JsonTrees.strings(featurePokemon))
        }
        return Built(files, lang, problems, texts)
    }

    /**
     * The Showdown item of a mega stone, named as the Mod's own stones are (`Absol-Epoch` evolves into `Absol-mega_epoch`). The `num` is
     * negative, derived from the id, so it never meets one of the Mod's or Cobblemon's.
     */
    private fun stoneScript(stone: String, pokemon: String, recipientAspects: List<String>, megaAspect: String): String {
        val base = pokemon.capitalised()
        val user = (listOf(base) + recipientAspects.map { it.replace('_', ' ').capitalised() }).joinToString("-")
        val name = stone.replace('_', ' ').capitalised()
        val num = -(10000 + Math.floorMod(stone.hashCode(), 900000))
        return """
            |{
            |    name: "$name",
            |    spritenum: 620,
            |    megaStone: { "$user": "$base-$megaAspect" },
            |    itemUser: ["$user"],
            |    onTakeItem(item, source) {
            |        return !item.megaStone?.[source.baseSpecies.baseSpecies];
            |    },
            |    num: $num,
            |    gen: 6,
            |    isNonstandard: "Past"
            |}
            |""".trimMargin()
    }

    private fun rareTable(item: String): JsonElement = JsonTrees.obj(
        "type" to JsonTrees.text("minecraft:archaeology"),
        "pools" to JsonTrees.array(
            listOf(
                JsonTrees.obj(
                    "bonus_rolls" to com.google.gson.JsonPrimitive(0),
                    "entries" to JsonTrees.array(
                        listOf(
                            JsonTrees.obj(
                                "type" to JsonTrees.text("minecraft:item"),
                                "name" to JsonTrees.text("gravelmon:$item"),
                                "weight" to com.google.gson.JsonPrimitive(2),
                            ),
                        ),
                    ),
                    "rolls" to com.google.gson.JsonPrimitive(1),
                ),
            ),
        ),
        "random_sequence" to JsonTrees.text("cobblemon:fossils/rare/$item"),
    )
}
