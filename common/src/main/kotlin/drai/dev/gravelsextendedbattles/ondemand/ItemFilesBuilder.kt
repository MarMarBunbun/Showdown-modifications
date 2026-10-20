package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject
import com.google.gson.JsonParseException
import com.google.gson.JsonPrimitive

/**
 * The site's Gravelmon items (`GET /api/selector/items`, items plan section 4) and the files built from them (section 7): a port of
 * `itemFiles.ts` and `neededItems.ts`, compared with them by [ItemFilesGoldenTest]. Every item is registered whatever the selection
 * (the Mod reads `registry.json`); only the items the selection **needs** get recipes, advancements, block loot, ore worldgen and
 * biome modifiers, block tags, mega stone scripts, models and blockstates. Every registered item gets its name in the language files.
 *
 * The definitions are kept as the JSON the site sent and read with [JsonTrees], like the other builders: nothing here needs a typed copy.
 */
object ItemFilesBuilder {
    /** One item of the download. [definition] is the site's `ItemDefinition`. */
    class SiteItem(val id: String, val name: String, val texture: String?, val definition: JsonObject) {
        val type: String get() = JsonTrees.string(definition, "type") ?: "basic"
        val retired: Boolean get() = definition.get("retired")?.takeIf { it.isJsonPrimitive }?.asBoolean == true
        val isBlock: Boolean get() = type == "ore" || type == "storage_block"
    }

    class Items(val dataRevision: String?, val items: List<SiteItem>)

    private val ITEM_ID = Regex("^gravelmon:[a-z0-9_]{1,64}$")

    /** The body of `GET /api/selector/items`. An item without a valid id or definition is left out rather than failing the whole download. */
    fun parse(text: String): Items {
        val root = JsonText.parseStrict(text) as? JsonObject ?: throw JsonParseException("The items data is not a JSON object")
        val list = JsonTrees.list(root, "items") ?: throw JsonParseException("The items data has no items")
        val items = list.mapNotNull { element ->
            val item = element.takeIf { it.isJsonObject }?.asJsonObject ?: return@mapNotNull null
            val id = JsonTrees.string(item, "id")?.takeIf { ITEM_ID.matches(it) } ?: return@mapNotNull null
            val name = JsonTrees.string(item, "name")?.takeIf { id == "gravelmon:$it" } ?: return@mapNotNull null
            val definition = JsonTrees.obj(item, "definition") ?: return@mapNotNull null
            SiteItem(id, name, JsonTrees.string(item, "texture"), definition)
        }
        return Items(root.get("dataRevision")?.takeIf { it.isJsonPrimitive }?.asString, items)
    }

    // ---- textures -------------------------------------------------------------------------------------------------------------

    fun defaultTexture(name: String, type: String): String = when (type) {
        "ore", "storage_block" -> "gravelmon:block/$name"
        "mega_stone" -> "gravelmon:item/megastones/$name"
        "fossil" -> "gravelmon:item/fossils/$name"
        else -> "gravelmon:item/$name"
    }

    fun textureOf(item: SiteItem): String = item.texture ?: defaultTexture(item.name, item.type)

    /** The Models repository folder that holds a texture (`_items/<owner>`): the texture's own name, so borrowed textures share a folder. */
    fun textureFolder(location: String): String = "_items/" + location.substringAfter(':').substringAfterLast('/')

    // ---- which items a selection needs ------------------------------------------------------------------------------------------

    private fun itemIdOf(value: JsonElement?): String? {
        val text = value?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString ?: return null
        if (text.isEmpty() || text.startsWith("#")) return null
        return if (':' in text) text else "minecraft:$text"
    }

    private fun heldItems(requirements: JsonElement?): List<String> {
        if (requirements == null || !requirements.isJsonArray) return emptyList()
        return requirements.asJsonArray.flatMap { element ->
            val requirement = element.takeIf { it.isJsonObject }?.asJsonObject ?: return@flatMap emptyList()
            val variant = JsonTrees.string(requirement, "variant")
            val own = if (variant == "held_item" || variant == "owner_held_item") listOfNotNull(itemIdOf(requirement.get("itemCondition"))) else emptyList()
            own + heldItems(requirement.get("possibilities"))
        }
    }

    private fun dropTable(table: JsonElement?): List<String> {
        val obj = table?.takeIf { it.isJsonObject }?.asJsonObject ?: return emptyList()
        return JsonTrees.objects(obj, "entries").mapNotNull { itemIdOf(it.get("item")) }
    }

    /** Every item a species or an addition names through its evolutions and drops (`itemsNamedBy`). */
    private fun itemsNamedBy(data: JsonObject?): List<String> {
        if (data == null) return emptyList()
        val named = mutableListOf<String>()
        for (evolution in JsonTrees.objects(data, "evolutions")) {
            if (JsonTrees.string(evolution, "variant") == "item_interact") itemIdOf(evolution.get("requiredContext"))?.let(named::add)
            named += heldItems(evolution.get("requirements"))
            named += dropTable(evolution.get("drops"))
        }
        named += dropTable(data.get("drops"))
        return named
    }

    private fun itemsUsedBy(form: JsonObject): List<String> {
        val additions = JsonTrees.obj(form, "addition")?.let { JsonTrees.obj(it, "additions") }
        val herd = JsonTrees.objects(form, "spawns").flatMap { spawn ->
            val entry = JsonTrees.obj(spawn, "entry") ?: return@flatMap emptyList()
            JsonTrees.objects(entry, "herdablePokemon").flatMap { dropTable(it.get("dropTable")) }
        }
        return itemsNamedBy(JsonTrees.obj(form, "species")) + itemsNamedBy(additions) + herd
    }

    private fun gravelmonId(name: String): String = if (':' in name) name else "gravelmon:$name"

    /** `game#pokemon#mega,x` -> `game#pokemon#x`; `game#pokemon#mega` -> `game#pokemon#normal` (`megaEntries`). */
    fun megaBaseFormId(formId: String): String {
        val parts = formId.split('#')
        val aspects = parts.getOrNull(2)?.takeIf { it.isNotEmpty() }?.split(',') ?: emptyList()
        val rest = aspects.filter { it != "mega" && !it.startsWith("mega_") }
        return "${parts.getOrElse(0) { "" }}#${parts.getOrElse(1) { "" }}#${if (rest.isEmpty()) "normal" else rest.joinToString(",")}"
    }

    /** The items a definition names: recipe ingredients, the block's drop and the ores it generates (tags are not items). */
    fun referencedItems(definition: JsonObject): List<String> {
        val ids = linkedSetOf<String>()
        fun ingredient(value: JsonElement?) {
            value?.takeIf { it.isJsonObject }?.asJsonObject?.let { JsonTrees.string(it, "item") }?.let(ids::add)
        }
        for (recipe in JsonTrees.objects(definition, "recipes")) {
            when (JsonTrees.string(recipe, "type")) {
                "crafting_shaped" -> JsonTrees.obj(recipe, "key")?.entrySet()?.forEach { ingredient(it.value) }
                "crafting_shapeless" -> JsonTrees.items(recipe, "ingredients").forEach(::ingredient)
                else -> ingredient(recipe.get("ingredient"))
            }
        }
        JsonTrees.obj(definition, "block")?.let { JsonTrees.obj(it, "drops") }?.let { JsonTrees.string(it, "item") }?.let(ids::add)
        JsonTrees.obj(definition, "oreGeneration")?.let { ore ->
            JsonTrees.string(ore, "stoneOre")?.let(ids::add)
            JsonTrees.string(ore, "deepslateOre")?.let(ids::add)
        }
        return ids.toList()
    }

    /** Port of `neededItems`: [forms] are the species download's forms, [enabled] the enabled form ids. */
    fun neededItems(items: List<SiteItem>, forms: List<JsonObject>, enabled: Set<String>): Set<String> {
        val live = items.filter { !it.retired }.associateBy { it.id }
        val usedByAny = hashSetOf<String>()
        val needed = linkedSetOf<String>()
        fun need(id: String) {
            if (id in live) needed += id
        }

        for (form in forms) {
            val formId = JsonTrees.string(form, "formId") ?: continue
            for (id in itemsUsedBy(form)) {
                usedByAny += id
                if (formId in enabled && live[id]?.type == "basic") need(id)
            }
            val species = JsonTrees.obj(form, "species") ?: continue
            JsonTrees.obj(species, "mega")?.let { mega ->
                val stones = JsonTrees.list(mega, "stones") ?: return@let
                val base = megaBaseFormId(formId)
                for (stone in stones) {
                    val name = stone.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isString }?.asString ?: continue
                    usedByAny += gravelmonId(name)
                    if (formId in enabled && base in enabled) need(gravelmonId(name))
                }
            }
            JsonTrees.obj(species, "fossil")?.let { JsonTrees.string(it, "item") }?.let { item ->
                usedByAny += gravelmonId(item)
                if (formId in enabled) need(gravelmonId(item))
            }
        }
        for ((id, item) in live) {
            if (item.type == "held_item" || item.definition.has("battleEffect") || (item.type == "basic" && id !in usedByAny)) need(id)
        }

        val oresDropping = hashMapOf<String, MutableList<String>>()
        val storageMaking = hashMapOf<String, MutableList<String>>()
        for ((id, item) in live) {
            val drop = JsonTrees.obj(item.definition, "block")?.let { JsonTrees.obj(it, "drops") }?.let { JsonTrees.string(it, "item") }
            if (item.type == "ore" && drop != null) oresDropping.getOrPut(drop) { mutableListOf() } += id
            if (item.type == "storage_block") referencedItems(item.definition).forEach { storageMaking.getOrPut(it) { mutableListOf() } += id }
        }
        val queue = ArrayDeque(needed)
        while (queue.isNotEmpty()) {
            val id = queue.removeLast()
            val pulled = (oresDropping[id] ?: emptyList()) + (storageMaking[id] ?: emptyList()) + referencedItems(live.getValue(id).definition)
            for (next in pulled) {
                if (next in live && needed.add(next)) queue.addLast(next)
            }
        }
        return needed
    }

    // ---- the files -------------------------------------------------------------------------------------------------------------

    /** An ore generation's biomes in the one form (port of `biomeSelectionOf`): the older `"overworld"` and `{ tag }` included. */
    class BiomeSelection(val dimension: String, val tags: List<String>, val biomes: List<String>)

    fun biomeSelectionOf(ore: JsonObject): BiomeSelection {
        val biomes = ore.get("biomes")
        val obj = biomes?.takeIf { it.isJsonObject }?.asJsonObject ?: return BiomeSelection("overworld", emptyList(), emptyList())
        fun list(key: String) = JsonTrees.items(obj, key).mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }
        val dimension = JsonTrees.string(obj, "dimension")
        if (dimension == null) return BiomeSelection("overworld", listOfNotNull(JsonTrees.string(obj, "tag")), emptyList())
        return BiomeSelection(dimension, list("tags"), list("biomes"))
    }

    private fun featurePrefix(dimension: String) = when (dimension) {
        "the_nether" -> "nether"
        "the_end" -> "end"
        else -> "overworld"
    }

    /** `air_stone` -> `overworld_air_ore`; in the Nether `nether_<item>_ore`, in the End `end_<item>_ore`. */
    fun oreFeatureName(itemName: String, dimension: String = "overworld"): String =
        "${featurePrefix(dimension)}_${itemName.removeSuffix("_stone")}_ore"

    /** The biome tag that means every biome of a dimension. */
    fun dimensionBiomeTag(dimension: String): String = when (dimension) {
        "the_nether" -> "minecraft:is_nether"
        "the_end" -> "minecraft:is_end"
        else -> "minecraft:is_overworld"
    }

    fun recipeNames(name: String, recipes: List<JsonObject>): List<String> {
        val taken = recipes.mapNotNull { JsonTrees.string(it, "name") }.toMutableSet()
        var next = 1
        return recipes.map { recipe ->
            JsonTrees.string(recipe, "name") ?: run {
                var candidate = if (next == 1) name else "${name}_$next"
                while (candidate in taken) {
                    next += 1
                    candidate = "${name}_$next"
                }
                next += 1
                taken += candidate
                candidate
            }
        }
    }

    private fun ingredientJson(value: JsonElement?): JsonObject {
        val obj = value?.takeIf { it.isJsonObject }?.asJsonObject ?: JsonObject()
        return JsonTrees.string(obj, "item")?.let { JsonTrees.obj("item" to JsonTrees.text(it)) }
            ?: JsonTrees.obj("tag" to JsonTrees.text(JsonTrees.string(obj, "tag") ?: ""))
    }

    private fun num(recipe: JsonObject, key: String, default: Number): JsonElement =
        recipe.get(key)?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber } ?: JsonPrimitive(default)

    fun recipeJson(recipe: JsonObject, resultId: String): JsonObject = when (val type = JsonTrees.string(recipe, "type")) {
        "crafting_shaped" -> JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:crafting_shaped"),
            "category" to JsonTrees.text("misc"),
            "key" to JsonObject().also { key -> JsonTrees.obj(recipe, "key")?.entrySet()?.forEach { key.add(it.key, ingredientJson(it.value)) } },
            "pattern" to (JsonTrees.list(recipe, "pattern")?.deepCopy() ?: JsonArray()),
            "result" to JsonTrees.obj("count" to num(recipe, "count", 1), "id" to JsonTrees.text(resultId)),
        )
        "crafting_shapeless" -> JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:crafting_shapeless"),
            "category" to JsonTrees.text("misc"),
            "ingredients" to JsonTrees.array(JsonTrees.items(recipe, "ingredients").map(::ingredientJson)),
            "result" to JsonTrees.obj("count" to num(recipe, "count", 1), "id" to JsonTrees.text(resultId)),
        )
        "smelting", "blasting" -> JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:$type"),
            "category" to JsonTrees.text("misc"),
            "cookingtime" to num(recipe, "time", 200),
            "experience" to num(recipe, "xp", 0),
            "ingredient" to ingredientJson(recipe.get("ingredient")),
            "result" to JsonTrees.obj("id" to JsonTrees.text(resultId)),
        )
        else -> JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:stonecutting"),
            "ingredient" to ingredientJson(recipe.get("ingredient")),
            "result" to JsonTrees.obj("count" to num(recipe, "count", 1), "id" to JsonTrees.text(resultId)),
        ).also { json ->
            JsonTrees.string(recipe, "requiresMod")?.let { mod ->
                json.add("fabric:load_conditions", JsonTrees.array(listOf(JsonTrees.obj("condition" to JsonTrees.text("fabric:all_mods_loaded"), "values" to JsonTrees.strings(listOf(mod))))))
                json.add("neoforge:conditions", JsonTrees.array(listOf(JsonTrees.obj("type" to JsonTrees.text("neoforge:mod_loaded"), "modid" to JsonTrees.text(mod)))))
            }
        }
    }

    private fun ingredientsOf(recipe: JsonObject): List<JsonObject> = when (JsonTrees.string(recipe, "type")) {
        "crafting_shaped" -> {
            val key = JsonTrees.obj(recipe, "key") ?: JsonObject()
            JsonTrees.items(recipe, "pattern").mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }.joinToString("")
                .filter { it != ' ' }.toList().distinct().mapNotNull { key.get(it.toString())?.takeIf { e -> e.isJsonObject }?.asJsonObject }
        }
        "crafting_shapeless" -> JsonTrees.objects(recipe, "ingredients")
        else -> listOfNotNull(JsonTrees.obj(recipe, "ingredient"))
    }

    /** The criterion and what it checks for: the recipe's own `unlock`, else its first item ingredient (or first tag). */
    fun unlockOf(recipe: JsonObject): Triple<String, String, Boolean>? {
        JsonTrees.obj(recipe, "unlock")?.let { unlock ->
            val criterion = JsonTrees.string(unlock, "criterion") ?: return null
            JsonTrees.string(unlock, "item")?.let { return Triple(criterion, it, false) }
            JsonTrees.string(unlock, "tag")?.let { return Triple(criterion, it, true) }
            return null
        }
        val ingredients = ingredientsOf(recipe)
        ingredients.firstNotNullOfOrNull { JsonTrees.string(it, "item") }?.let { return Triple("has_${it.substringAfter(':')}", it, false) }
        ingredients.firstNotNullOfOrNull { JsonTrees.string(it, "tag") }?.let { return Triple("has_${it.substringAfter(':').replace('/', '_')}", it, true) }
        return null
    }

    fun advancementJson(recipeName: String, unlock: Triple<String, String, Boolean>): JsonObject {
        val (criterion, id, isTag) = unlock
        val recipeId = "gravelmon:$recipeName"
        return JsonTrees.obj(
            "parent" to JsonTrees.text("minecraft:recipes/root"),
            "criteria" to JsonTrees.obj(
                criterion to JsonTrees.obj(
                    "conditions" to JsonTrees.obj("items" to JsonTrees.array(listOf(JsonTrees.obj("items" to JsonTrees.text(if (isTag) "#$id" else id))))),
                    "trigger" to JsonTrees.text("minecraft:inventory_changed"),
                ),
                "has_the_recipe" to JsonTrees.obj(
                    "conditions" to JsonTrees.obj("recipe" to JsonTrees.text(recipeId)),
                    "trigger" to JsonTrees.text("minecraft:recipe_unlocked"),
                ),
            ),
            "requirements" to JsonTrees.array(listOf(JsonTrees.strings(listOf("has_the_recipe", criterion)))),
            "rewards" to JsonTrees.obj("recipes" to JsonTrees.strings(listOf(recipeId))),
        )
    }

    private fun survivesExplosion(): JsonArray = JsonTrees.array(listOf(JsonTrees.obj("condition" to JsonTrees.text("minecraft:survives_explosion"))))

    fun blockLootJson(blockId: String, definition: JsonObject): JsonObject {
        val drops = JsonTrees.obj(definition, "block")?.let { JsonTrees.obj(it, "drops") }
        if (drops == null) {
            return JsonTrees.obj(
                "type" to JsonTrees.text("minecraft:block"),
                "pools" to JsonTrees.array(listOf(JsonTrees.obj(
                    "bonus_rolls" to JsonPrimitive(0),
                    "conditions" to survivesExplosion(),
                    "entries" to JsonTrees.array(listOf(JsonTrees.obj("type" to JsonTrees.text("minecraft:item"), "name" to JsonTrees.text(blockId)))),
                    "rolls" to JsonPrimitive(1),
                ))),
            )
        }
        val count = JsonTrees.obj(drops, "count")
        val fortune = drops.get("fortune")?.takeIf { it.isJsonPrimitive }?.asBoolean == true
        val functions = mutableListOf<JsonElement>()
        if (count != null) {
            functions += JsonTrees.obj(
                "function" to JsonTrees.text("minecraft:set_count"),
                "count" to JsonTrees.obj("type" to JsonTrees.text("minecraft:uniform"), "min" to count.get("min"), "max" to count.get("max")),
                "add" to JsonPrimitive(false),
            )
        }
        if (fortune) {
            functions += JsonTrees.obj(
                "function" to JsonTrees.text("minecraft:apply_bonus"),
                "enchantment" to JsonTrees.text("minecraft:fortune"),
                "formula" to JsonTrees.text("minecraft:ore_drops"),
            )
        }
        if (count != null || fortune) functions += JsonTrees.obj("function" to JsonTrees.text("minecraft:explosion_decay"))
        val dropEntry = JsonTrees.obj("type" to JsonTrees.text("minecraft:item")).also { entry ->
            if (functions.isNotEmpty()) entry.add("functions", JsonTrees.array(functions)) else entry.add("conditions", survivesExplosion())
            entry.add("name", JsonTrees.text(JsonTrees.string(drops, "item") ?: ""))
        }
        val silk = drops.get("silkTouchSelf")?.takeIf { it.isJsonPrimitive }?.asBoolean == true
        val entries = if (silk) {
            val self = JsonTrees.obj(
                "type" to JsonTrees.text("minecraft:item"),
                "conditions" to JsonTrees.array(listOf(JsonTrees.obj(
                    "condition" to JsonTrees.text("minecraft:match_tool"),
                    "predicate" to JsonTrees.obj("predicates" to JsonTrees.obj("minecraft:enchantments" to JsonTrees.array(listOf(
                        JsonTrees.obj("enchantments" to JsonTrees.text("minecraft:silk_touch"), "levels" to JsonTrees.obj("min" to JsonPrimitive(1))),
                    )))),
                ))),
                "name" to JsonTrees.text(blockId),
            )
            listOf(JsonTrees.obj("type" to JsonTrees.text("minecraft:alternatives"), "children" to JsonTrees.array(listOf(self, dropEntry))))
        } else {
            listOf(dropEntry)
        }
        return JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:block"),
            "pools" to JsonTrees.array(listOf(JsonTrees.obj("bonus_rolls" to JsonPrimitive(0), "entries" to JsonTrees.array(entries), "rolls" to JsonPrimitive(1)))),
        )
    }

    fun configuredOreJson(ore: JsonObject): JsonObject {
        fun target(tag: String, block: String) = JsonTrees.obj(
            "target" to JsonTrees.obj("predicate_type" to JsonTrees.text("minecraft:tag_match"), "tag" to JsonTrees.text(tag)),
            "state" to JsonTrees.obj("Name" to JsonTrees.text(block)),
        )
        fun blockTarget(match: String, block: String) = JsonTrees.obj(
            "target" to JsonTrees.obj("predicate_type" to JsonTrees.text("minecraft:block_match"), "block" to JsonTrees.text(match)),
            "state" to JsonTrees.obj("Name" to JsonTrees.text(block)),
        )
        val stoneOre = JsonTrees.string(ore, "stoneOre")
        val targets = when (biomeSelectionOf(ore).dimension) {
            "the_nether" -> listOfNotNull(stoneOre?.let { blockTarget("minecraft:netherrack", it) })
            "the_end" -> listOfNotNull(stoneOre?.let { blockTarget("minecraft:end_stone", it) })
            else -> listOfNotNull(
                stoneOre?.let { target("minecraft:stone_ore_replaceables", it) },
                JsonTrees.string(ore, "deepslateOre")?.let { target("minecraft:deepslate_ore_replaceables", it) },
            )
        }
        return JsonTrees.obj(
            "type" to JsonTrees.text("minecraft:ore"),
            "config" to JsonTrees.obj(
                "size" to ore.get("veinSize"),
                "discard_chance_on_air_exposure" to ore.get("discardOnAirExposure"),
                "targets" to JsonTrees.array(targets),
            ),
        )
    }

    fun placedOreJson(feature: String, ore: JsonObject): JsonObject {
        val height = JsonTrees.obj(ore, "height") ?: JsonObject()
        val frequency = ore.get("perChunk")?.let { JsonTrees.obj("type" to JsonTrees.text("minecraft:count"), "count" to it) }
            ?: JsonTrees.obj("type" to JsonTrees.text("minecraft:rarity_filter"), "chance" to (ore.get("rarity") ?: JsonPrimitive(1)))
        return JsonTrees.obj(
            "feature" to JsonTrees.text("gravelmon:$feature"),
            "placement" to JsonTrees.array(listOf(
                frequency,
                JsonTrees.obj("type" to JsonTrees.text("minecraft:in_square")),
                JsonTrees.obj(
                    "type" to JsonTrees.text("minecraft:height_range"),
                    "height" to JsonTrees.obj(
                        "type" to JsonTrees.text("minecraft:${JsonTrees.string(height, "shape") ?: "trapezoid"}"),
                        "min_inclusive" to JsonTrees.obj("absolute" to height.get("min")),
                        "max_inclusive" to JsonTrees.obj("absolute" to height.get("max")),
                    ),
                ),
                JsonTrees.obj("type" to JsonTrees.text("minecraft:biome")),
            )),
        )
    }

    /** The biomes of a NeoForge biome modifier (port of `biomeHolderSet`). */
    fun biomeHolderSet(ore: JsonObject): JsonElement {
        val selection = biomeSelectionOf(ore)
        val tags = selection.tags
        val biomes = selection.biomes
        return when {
            tags.isEmpty() && biomes.isEmpty() -> JsonTrees.text("#${dimensionBiomeTag(selection.dimension)}")
            biomes.isEmpty() && tags.size == 1 -> JsonTrees.text("#${tags[0]}")
            tags.isEmpty() -> JsonTrees.strings(biomes)
            else -> JsonTrees.obj(
                "type" to JsonTrees.text("neoforge:or"),
                "values" to JsonTrees.array(tags.map { JsonTrees.text("#$it") } + if (biomes.isEmpty()) emptyList() else listOf(JsonTrees.strings(biomes))),
            )
        }
    }

    fun biomeModifierJson(feature: String, ore: JsonObject): JsonObject {
        return JsonTrees.obj(
            "type" to JsonTrees.text("neoforge:add_features"),
            "biomes" to biomeHolderSet(ore),
            "features" to JsonTrees.text("gravelmon:$feature"),
            "step" to JsonTrees.text("underground_ores"),
        )
    }

    /** Like `JSON.stringify` of a string: quotes, backslashes and control characters escaped, everything else as it is. */
    private fun quote(text: String): String = buildString {
        append('"')
        for (c in text) {
            when {
                c == '"' -> append("\\\"")
                c == '\\' -> append("\\\\")
                c == '\n' -> append("\\n")
                c == '\r' -> append("\\r")
                c == '\t' -> append("\\t")
                c < ' ' -> append("\\u%04x".format(c.code))
                else -> append(c)
            }
        }
        append('"')
    }

    /** The mega stone's Showdown item in the fixed template, every value quoted; null without one. */
    fun megaStoneScript(definition: JsonObject): String? {
        val showdown = JsonTrees.obj(definition, "megaShowdown") ?: return null
        val name = JsonTrees.string(showdown, "name") ?: return null
        val num = showdown.get("num")?.takeIf { it.isJsonPrimitive && it.asJsonPrimitive.isNumber }?.asLong ?: return null
        val megaStone = JsonTrees.obj(showdown, "megaStone")?.entrySet()
            ?.mapNotNull { (from, to) -> to.takeIf { it.isJsonPrimitive }?.asString?.let { "${quote(from)}: ${quote(it)}" } }?.joinToString(", ") ?: ""
        val users = JsonTrees.items(showdown, "itemUser").mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }.joinToString(", ") { quote(it) }
        return listOf(
            "{",
            "    name: ${quote(name)},",
            "    spritenum: 620,",
            "    megaStone: { $megaStone},",
            "    itemUser: [$users],",
            "    onTakeItem(item, source) {",
            "        return !item.megaStone?.[source.baseSpecies.baseSpecies];",
            "    },",
            "    num: $num,",
            "    gen: 6,",
            "    isNonstandard: \"Past\"",
            "}",
        ).joinToString("\n")
    }

    /** The language entries of one item by locale: its name, and `.tooltip`, `.tooltip2`, ... */
    fun langEntries(item: SiteItem): Map<String, Map<String, String>> {
        val key = "${if (item.isBlock) "block" else "item"}.gravelmon.${item.name}"
        val byLocale = linkedMapOf<String, LinkedHashMap<String, String>>()
        JsonTrees.obj(item.definition, "displayNames")?.entrySet()?.forEach { (locale, name) ->
            name.takeIf { it.isJsonPrimitive }?.asString?.let { byLocale.getOrPut(locale) { linkedMapOf() }[key] = it }
        }
        JsonTrees.obj(item.definition, "tooltip")?.entrySet()?.forEach { (locale, lines) ->
            lines.takeIf { it.isJsonArray }?.asJsonArray?.forEachIndexed { at, line ->
                byLocale.getOrPut(locale) { linkedMapOf() }["$key.tooltip${if (at == 0) "" else (at + 1).toString()}"] = line.asString
            }
        }
        return byLocale
    }

    /** Every file of the site's items, as text ready to write under the pack folder (port of `buildItemFiles`). */
    fun build(items: List<SiteItem>, needed: Set<String>): Map<String, String> {
        val files = linkedMapOf<String, String>()
        val tags = linkedMapOf<String, MutableList<String>>()
        val lang = linkedMapOf<String, LinkedHashMap<String, String>>()
        fun json(path: String, element: JsonElement) {
            files[path] = JsonTrees.renderFile(element)
        }

        for (item in items.sortedBy { it.id }) {
            langEntries(item).forEach { (locale, entries) -> lang.getOrPut(locale) { linkedMapOf() }.putAll(entries) }
            if (item.id !in needed || item.retired) continue
            val definition = item.definition
            val recipes = JsonTrees.objects(definition, "recipes")
            recipeNames(item.name, recipes).zip(recipes).forEach { (recipeName, recipe) ->
                json("data/gravelmon/recipe/$recipeName.json", recipeJson(recipe, item.id))
                val unlock = unlockOf(recipe)
                val modOnly = JsonTrees.string(recipe, "type") == "stonecutting" && JsonTrees.string(recipe, "requiresMod") != null
                if (unlock != null && !modOnly) json("data/gravelmon/advancement/recipes/misc/$recipeName.json", advancementJson(recipeName, unlock))
            }
            JsonTrees.obj(definition, "oreGeneration")?.let { ore ->
                val feature = oreFeatureName(item.name, biomeSelectionOf(ore).dimension)
                json("data/gravelmon/worldgen/configured_feature/$feature.json", configuredOreJson(ore))
                json("data/gravelmon/worldgen/placed_feature/$feature.json", placedOreJson(feature, ore))
                json("data/gravelmon/neoforge/biome_modifier/$feature.json", biomeModifierJson(feature, ore))
            }
            if (item.type == "mega_stone") {
                megaStoneScript(definition)?.let { script ->
                    val showdownId = JsonTrees.string(definition, "showdownId") ?: item.name.replace("_", "")
                    files["data/cobblemon/held_items/$showdownId.js"] = script
                }
            }
            if (item.isBlock) {
                JsonTrees.obj(definition, "block")?.let { JsonTrees.obj(it, "tool") }?.let { tool ->
                    JsonTrees.string(tool, "kind")?.let { tags.getOrPut("data/minecraft/tags/block/mineable/$it.json") { mutableListOf() } += item.id }
                    JsonTrees.string(tool, "level")?.let { tags.getOrPut("data/minecraft/tags/block/needs_${it}_tool.json") { mutableListOf() } += item.id }
                }
                json("data/gravelmon/loot_table/blocks/${item.name}.json", blockLootJson(item.id, definition))
                json("assets/gravelmon/blockstates/${item.name}.json", JsonTrees.obj("variants" to JsonTrees.obj("" to JsonTrees.obj("model" to JsonTrees.text("gravelmon:block/${item.name}")))))
                json("assets/gravelmon/models/block/${item.name}.json", JsonTrees.obj(
                    "parent" to JsonTrees.text("minecraft:block/cube_all"),
                    "textures" to JsonTrees.obj("all" to JsonTrees.text(textureOf(item))),
                ))
                json("assets/gravelmon/models/item/${item.name}.json", JsonTrees.obj("parent" to JsonTrees.text("gravelmon:block/${item.name}")))
            } else {
                json("assets/gravelmon/models/item/${item.name}.json", JsonTrees.obj(
                    "parent" to JsonTrees.text("minecraft:item/generated"),
                    "textures" to JsonTrees.obj("layer0" to JsonTrees.text(textureOf(item))),
                ))
            }
        }
        tags.forEach { (path, values) -> json(path, JsonTrees.obj("values" to JsonTrees.strings(values))) }
        lang.forEach { (locale, entries) ->
            json("assets/gravelmon/lang/$locale.json", JsonTrees.obj(*entries.map { it.key to JsonTrees.text(it.value) }.toTypedArray()))
        }
        return files
    }
}

/**
 * What the site's items mean for one selection: the items it needs, the `_items` folders their textures are in (kept by the prune) and
 * the files built for them. [registered] is how many items the site defines (all of them are registered, needed or not).
 */
class ItemSelection(val needed: Set<String>, val folders: Set<String>, val files: Map<String, String>, val registered: Int) {
    companion object {
        val NONE = ItemSelection(emptySet(), emptySet(), emptyMap(), 0)

        /** [allItems] is the config's toggle: every item that is not retired counts as needed. */
        fun of(items: ItemFilesBuilder.Items?, species: SelectorData.Species, enabled: Collection<Gms3.SelectableForm>, allItems: Boolean = false): ItemSelection {
            if (items == null) return NONE
            val needed = if (allItems) items.items.filter { !it.retired }.map { it.id }.toSet()
            else ItemFilesBuilder.neededItems(items.items, species.forms, enabled.map { it.formId }.toSet())
            val folders = items.items.filter { it.id in needed }.map { ItemFilesBuilder.textureFolder(ItemFilesBuilder.textureOf(it)) }.toSet()
            val files = ItemFilesBuilder.build(items.items, needed) + (PATH to selectionText(needed, species.forms))
            return ItemSelection(needed, folders, files, items.items.size)
        }

        /** What the Mod reads at init from the pack: which items to show (creative tabs) and which species each needed fossil revives. */
        const val PATH = "data/gravelmon/item_selection.json"

        /** `{ needed: [...], fossils: { "gravelmon:tusk_fossil": "arctusk" } }`; a fossil's species is the form's name and aspects, as properties. */
        fun selectionText(needed: Set<String>, forms: List<JsonObject>): String {
            val fossils = java.util.TreeMap<String, String>()
            for (form in forms) {
                val item = JsonTrees.obj(form, "species")?.let { JsonTrees.obj(it, "fossil") }?.let { JsonTrees.string(it, "item") } ?: continue
                val id = if (':' in item) item else "gravelmon:$item"
                if (id !in needed || id in fossils) continue
                val parts = (JsonTrees.string(form, "formId") ?: continue).split('#')
                val aspects = parts.getOrNull(2)?.split(',')?.filter { it.isNotEmpty() && it != "normal" } ?: emptyList()
                fossils[id] = (listOf(parts.getOrElse(1) { "" }) + aspects).joinToString(" ")
            }
            return JsonTrees.renderFile(
                JsonTrees.obj(
                    "needed" to JsonTrees.strings(needed.sorted()),
                    "fossils" to JsonTrees.obj(*fossils.map { it.key to JsonTrees.text(it.value) }.toTypedArray()),
                ),
            )
        }
    }
}
