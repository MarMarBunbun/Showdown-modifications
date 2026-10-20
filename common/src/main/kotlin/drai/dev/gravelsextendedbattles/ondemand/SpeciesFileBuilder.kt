package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonArray
import com.google.gson.JsonElement
import com.google.gson.JsonObject

/**
 * Builds the species, `species_additions` and spawn files, and the species language entries, from the forms of
 * `GET /api/selector/species`: a port of `generateSpeciesFiles` (`speciesFiles.ts` on the site), which the site's own tests
 * check against the Mod's files. Paths are relative to the root of the pack (`data/...`).
 *
 * The caller passes the forms the player's selection **enables**; nothing here knows about selections. Because of that a
 * species file can be left without parts: an inline form whose species form is disabled has no file to be in, and an addition
 * form whose target is disabled has none either. Those are skipped and named in [Built.skipped], never raised as problems.
 *
 * - `data/cobblemon/species/<folder>/<file>.json`: a species form plus its inline forms (`forms`, in `origin.index` order).
 * - `data/gravelmon/species_additions/<file>.json`: the `addition` of a form plus the addition forms. For a Pokemon that is not
 *   Gravelmon's own (`source` `cobblemon`) it only **adds forms** (`target`, `features`, `forms`): what the addition changes about the
 *   Pokemon itself (typing, moves, abilities, evolutions) is written for the one form it is for by [PokemonChangesBuilder], and the rest
 *   (drops, pre-evolution, base stats) is not applied. For one of Gravelmon's own Pokemon the file has every file level field but `moves`.
 * - `data/<namespace>/spawn_pool_world/<file>.json`: the spawn entries of that file in `ord` order.
 * - the `lang` entries: `cobblemon.species.<key>` for every entry a species form carries.
 */
object SpeciesFileBuilder {
    const val SPECIES_FOLDER = "data/cobblemon/species"
    const val ADDITIONS_FOLDER = "data/gravelmon/species_additions"
    const val LANG_SPECIES_PREFIX = "cobblemon.species."

    /** The language file the species entries (and the starter titles) are written into; Minecraft merges it with the Mod's. */
    const val LANG_PATH = "assets/cobblemon/lang/en_us.json"

    /** The attributes of a species item that are not fields of the Cobblemon file (`RESERVED_FIELDS`). */
    private val RESERVED = setOf("pk", "sk", "formId", "addedByGame", "source", "revision", "origin", "catalogue", "lang", "cpk", "csk", "bpk", "bsk")

    /** Fields of the item that are not fields of the Cobblemon file either: never written as they are (`OVERLAY_FIELDS`). */
    private val OVERLAY = setOf("rebalanced", "fossil", "mega", "moveAdditions")

    /** The order species fields are written in, as the files have them. Anything else follows, sorted. */
    private val FIELD_ORDER = listOf(
        "name", "primaryType", "secondaryType", "catchRate", "maleRatio", "baseExperienceYield", "experienceGroup", "eggCycles",
        "baseFriendship", "preEvolution", "baseScale", "cannotDynamax", "abilities", "behaviour", "baseStats", "evYield",
        "eggGroups", "drops", "moves", "placeholderMoves", "labels", "pokedex", "height", "weight", "aspects", "evolutions",
        "nationalPokedexNumber", "battleOnly", "shoulderMountable", "hitbox", "features", "implemented", "forms", "game", "actualName",
    )

    private val ADDITION_FILE_ORDER = listOf("target", "forms", "preEvolution", "evolutions", "drops", "features")

    class Built(
        /** Pack path to JSON, in the order they were built. */
        val files: Map<String, JsonElement>,
        /** The `cobblemon.species.*` entries the forms carry. */
        val lang: Map<String, String>,
        /** Things that are wrong in the data itself (two forms that disagree about one language key). */
        val problems: List<String>,
        /** Forms that were left out because the file they belong in has no enabled base. */
        val skipped: List<String>,
    )

    fun spawnFolder(namespace: String) = "data/$namespace/spawn_pool_world"

    private fun orderedBy(fields: JsonObject, order: List<String>): JsonObject {
        val rank = order.withIndex().associate { it.value to it.index }
        val result = JsonObject()
        fields.entrySet().sortedWith(compareBy<Map.Entry<String, JsonElement>> { rank[it.key] ?: order.size }.thenBy { it.key })
            .forEach { result.add(it.key, it.value) }
        return result
    }

    /** The species fields of a `species` item: everything that is not the store's own attribute, the overlay applied for [rules]. */
    fun speciesFieldsOf(item: JsonObject, rules: RulesVariant, implementedTypes: Set<String>? = null): JsonObject {
        val fields = JsonObject()
        item.entrySet().forEach { if (it.key !in RESERVED) fields.add(it.key, it.value.deepCopy()) }
        val laid = if (rules == RulesVariant.REBALANCED) RebalancedOverlay.apply(fields, implementedTypes) else fields
        val result = JsonObject()
        laid.entrySet().forEach { if (it.key !in OVERLAY) result.add(it.key, it.value) }
        return result
    }

    private class FileGroup {
        var base: JsonObject? = null
        val inline = mutableListOf<JsonObject>()
    }

    private class SpawnEntry(val formId: String, val ord: Int, val entry: JsonElement, val hash: String)

    private fun indexOf(species: JsonObject): Int =
        JsonTrees.obj(species, "origin")?.get("index")?.takeIf { it.isJsonPrimitive }?.asInt ?: 0

    /** The species an evolution leads to (`result` is a species name, optionally namespaced and followed by properties), lower case. */
    fun resultSpecies(evolution: JsonElement): String? {
        val result = evolution.takeIf { it.isJsonObject }?.asJsonObject?.let { JsonTrees.string(it, "result") } ?: return null
        return result.trim().substringAfter(':').substringBefore(' ').lowercase()
    }

    /** The items an evolution needs: the item it is triggered with (`requiredContext`) and the held items it asks for (`held_item` requirements). */
    private fun itemsOf(evolution: JsonElement): Set<String> {
        val obj = evolution.takeIf { it.isJsonObject }?.asJsonObject ?: return emptySet()
        val items = mutableSetOf<String>()
        JsonTrees.string(obj, "requiredContext")?.let { items += it.trim().lowercase() }
        JsonTrees.objects(obj, "requirements").filter { JsonTrees.string(it, "variant") == "held_item" }
            .forEach { requirement -> JsonTrees.string(requirement, "itemCondition")?.let { items += it.trim().lowercase() } }
        return items
    }

    /**
     * [fields] without the evolutions into a species in [leftOut]: a vanilla species that gets evolutions from the Mod (an addition) would otherwise
     * evolve into species this player does not have. The field is removed when none is left. The drops that only served the removed evolutions
     * (the item they are triggered with or hold) go with them, unless an evolution that stays still needs that item.
     */
    fun withoutLeftOutEvolutions(fields: JsonObject, leftOut: Set<String>): JsonObject {
        if (leftOut.isEmpty()) return fields
        val evolutions = JsonTrees.list(fields, "evolutions") ?: return fields
        val (kept, removed) = evolutions.partition { resultSpecies(it) !in leftOut }
        if (removed.isEmpty()) return fields
        val copy = fields.deepCopy()
        if (kept.isEmpty()) copy.remove("evolutions") else copy.add("evolutions", JsonTrees.array(kept))
        val unneeded = removed.flatMap(::itemsOf).toSet() - kept.flatMap(::itemsOf).toSet()
        val drops = JsonTrees.obj(copy, "drops")
        val entries = drops?.let { JsonTrees.list(it, "entries") }
        if (drops != null && entries != null && unneeded.isNotEmpty()) {
            val remaining = entries.filter { entry ->
                val item = entry.takeIf { it.isJsonObject }?.asJsonObject?.let { JsonTrees.string(it, "item") }?.trim()?.lowercase()
                item == null || item !in unneeded
            }
            if (remaining.size != entries.size()) {
                if (remaining.isEmpty()) copy.remove("drops") else drops.add("entries", JsonTrees.array(remaining))
            }
        }
        return copy
    }

    /**
     * The addition file of one of Gravelmon's own Pokemon: the target, every file level field but `moves` (they would replace the moves the
     * species learns, so [PokemonChangesBuilder] writes them as a `move_additions` file) and the forms. Null when it adds nothing any more.
     */
    private fun ownAdditionFile(
        header: JsonObject,
        addedForms: List<JsonObject>,
        hasForms: Boolean,
        rules: RulesVariant,
        leftOut: Set<String>,
        implementedTypes: Set<String>?,
    ): JsonObject? {
        val out = JsonObject()
        header.get("target")?.let { out.add("target", it.deepCopy()) }
        JsonTrees.obj(header, "additions")?.let { withoutLeftOutEvolutions(it, leftOut) }?.entrySet()?.forEach { if (it.key != "moves") out.add(it.key, it.value.deepCopy()) }
        if (hasForms && addedForms.isNotEmpty()) {
            out.add("forms", JsonTrees.array(addedForms.map { orderedBy(withoutLeftOutEvolutions(speciesFieldsOf(it, rules, implementedTypes), leftOut), FIELD_ORDER) }))
        }
        // A file that only added forms and has none left adds nothing any more.
        if (hasForms && addedForms.isEmpty() && out.keySet().all { it == "target" }) return null
        return orderedBy(out, ADDITION_FILE_ORDER)
    }

    /** [leftOut] holds the names (lower case) of the species whose forms are all disabled: nothing is allowed to evolve into them. */
    fun build(forms: List<JsonObject>, rules: RulesVariant, leftOut: Set<String> = emptySet(), implementedTypes: Set<String>? = null): Built {
        val files = LinkedHashMap<String, JsonElement>()
        val lang = LinkedHashMap<String, String>()
        val problems = mutableListOf<String>()
        val skipped = mutableListOf<String>()

        val speciesFiles = LinkedHashMap<String, FileGroup>()
        val additionForms = LinkedHashMap<String, MutableList<JsonObject>>()
        val additionHeaders = LinkedHashMap<String, JsonObject>()
        /** The addition files that extend one of Gravelmon's own Pokemon: those are not limited to adding forms. */
        val ownAdditions = HashSet<String>()
        val spawnGroups = LinkedHashMap<String, Triple<String, String, MutableList<SpawnEntry>>>()

        for (form in forms) {
            val formId = JsonTrees.string(form, "formId") ?: continue
            val species = JsonTrees.obj(form, "species")
            if (species != null) {
                val origin = JsonTrees.obj(species, "origin")
                val kind = origin?.let { JsonTrees.string(it, "kind") }
                val file = origin?.let { JsonTrees.string(it, "file") }
                if (origin != null && file != null) {
                    if (kind == "species" || kind == "inline") {
                        val folder = JsonTrees.string(origin, "folder") ?: continue
                        val group = speciesFiles.getOrPut("$folder/$file") { FileGroup() }
                        if (kind == "species") group.base = species else group.inline += species
                    } else if (kind == "addition") {
                        additionForms.getOrPut(file) { mutableListOf() } += species
                    }
                }
                JsonTrees.obj(species, "lang")?.entrySet()?.forEach { (suffix, value) ->
                    val text = value.takeIf { it.isJsonPrimitive }?.asString ?: return@forEach
                    val key = LANG_SPECIES_PREFIX + suffix
                    val existing = lang[key]
                    // Forms of one shared species name each hold a copy of the same entry; copies edited apart cannot both be written.
                    if (existing != null && existing != text) {
                        problems += "$key: $formId says \"${text.take(30)}\" but another form's copy says \"${existing.take(30)}\"."
                    } else {
                        lang[key] = text
                    }
                }
            }
            JsonTrees.obj(form, "addition")?.let { addition ->
                JsonTrees.string(addition, "file")?.let {
                    additionHeaders[it] = addition
                    if (JsonTrees.string(form, "source") == "gravelmon") ownAdditions += it
                }
            }
            JsonTrees.list(form, "spawns")?.forEach { element ->
                val spawn = element.takeIf { it.isJsonObject }?.asJsonObject ?: return@forEach
                val ns = JsonTrees.string(spawn, "ns") ?: return@forEach
                val file = JsonTrees.string(spawn, "file") ?: return@forEach
                val entry = spawn.get("entry") ?: return@forEach
                val ord = spawn.get("ord")?.takeIf { it.isJsonPrimitive }?.asInt ?: 0
                spawnGroups.getOrPut("$ns/$file") { Triple(ns, file, mutableListOf()) }.third += SpawnEntry(formId, ord, entry, JsonTrees.contentHash(entry))
            }
        }

        for ((key, group) in speciesFiles) {
            val base = group.base
            if (base == null) {
                skipped += "$key: ${group.inline.size} form(s) left out, the species form this file belongs to is not enabled."
                continue
            }
            val inline = group.inline.sortedBy(::indexOf)
            val fields = withoutLeftOutEvolutions(speciesFieldsOf(base, rules, implementedTypes), leftOut)
            fields.add("forms", JsonTrees.array(inline.map { orderedBy(withoutLeftOutEvolutions(speciesFieldsOf(it, rules, implementedTypes), leftOut), FIELD_ORDER) }))
            val (folder, file) = key.split('/', limit = 2)
            files["$SPECIES_FOLDER/$folder/$file.json"] = orderedBy(fields, FIELD_ORDER)
        }

        for ((file, header) in additionHeaders) {
            val addedForms = (additionForms[file] ?: emptyList()).sortedBy(::indexOf)
            val hasForms = header.get("hasForms")?.takeIf { it.isJsonPrimitive }?.asBoolean ?: false
            if (file in ownAdditions) {
                ownAdditionFile(header, addedForms, hasForms, rules, leftOut, implementedTypes)?.let { files["$ADDITIONS_FOLDER/$file.json"] = it }
                continue
            }
            val features = JsonTrees.obj(header, "additions")?.get("features")
            // The file only adds forms (and the features they need): with no form left it adds nothing.
            if (hasForms && addedForms.isEmpty()) continue
            if (!hasForms && features == null) continue
            val out = JsonObject()
            header.get("target")?.let { out.add("target", it.deepCopy()) }
            features?.let { out.add("features", it.deepCopy()) }
            if (hasForms) {
                out.add("forms", JsonTrees.array(addedForms.map { orderedBy(withoutLeftOutEvolutions(speciesFieldsOf(it, rules, implementedTypes), leftOut), FIELD_ORDER) }))
            }
            files["$ADDITIONS_FOLDER/$file.json"] = orderedBy(out, ADDITION_FILE_ORDER)
        }
        for ((file, list) in additionForms) {
            if (file !in additionHeaders) {
                skipped += "$file: ${list.size} addition form(s) left out, the species the file extends is not enabled."
            }
        }

        for ((ns, file, spawns) in spawnGroups.values) {
            spawns.sortWith(compareBy<SpawnEntry> { it.ord }.thenBy { it.formId }.thenBy { it.hash })
            // A spawn file is the union of the entries of the forms filed in it. Forms of one shared species name each hold a copy of the
            // entries that fit them, so the same entry (same position, same content) can appear once per claimant: it is written once.
            val unique = mutableListOf<SpawnEntry>()
            val seen = HashSet<Pair<Int, String>>()
            for (spawn in spawns) {
                if (seen.add(spawn.ord to JsonTrees.canonical(spawn.entry))) unique += spawn
            }
            val out = JsonObject()
            out.addProperty("enabled", true)
            out.add("neededInstalledMods", JsonArray())
            out.add("neededUninstalledMods", JsonArray())
            out.add("spawns", JsonTrees.array(unique.map { it.entry }))
            files["${spawnFolder(ns)}/$file.json"] = out
        }

        return Built(files, lang, problems, skipped)
    }
}
