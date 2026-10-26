package drai.dev.gravelsextendedbattles.ondemand

import com.google.gson.JsonObject

/**
 * Twin species: one species name that two or more games each have a species of (`amber#hatchick` and `okeno#hatchick`). The site
 * keeps both under their own name; Cobblemon has one species registry, so every file built here gives **every** claimant the name
 * `<name>_<game>` (`hatchick_amber`, `hatchick_okeno`). The display name stays the species' own, only the id changes.
 *
 * The site works the names out over its whole catalogue and sends them as the download's `speciesNames` (`<game>#<name>` to
 * `<name>_<game>`), so an id never depends on a selection. They are applied in one place, to the kept forms before any file is
 * built ([apply], [starters]), and to the resolvers the models zip installs ([resolverSpecies]); the builders never see a twin.
 * The rule is the web app's `twinNames.ts`, which has the tests of the cases below.
 */
object TwinNames {
    /** `amber#hatchick#normal` -> `amber#hatchick_amber#normal` when `amber#hatchick` is a twin. */
    fun renamedFormId(formId: String, names: Map<String, String>): String {
        val parts = formId.split('#')
        if (parts.size < 2) return formId
        val renamed = names["${parts[0]}#${parts[1]}"] ?: return formId
        return (listOf(parts[0], renamed) + parts.drop(2)).joinToString("#")
    }

    /** The `species` a resolver from a form folder of [game] should name: `cobblemon:hatchick` under `amber/` is `cobblemon:hatchick_amber`. */
    fun resolverSpecies(game: String, species: String, names: Map<String, String>): String {
        val colon = species.indexOf(':')
        if (colon < 0 || species.substring(0, colon) != "cobblemon") return species
        val renamed = names["$game#${species.substring(colon + 1)}"] ?: return species
        return "cobblemon:$renamed"
    }

    /** A properties string (`hatchick`, `krabby mazian level=5`) with its species renamed when [game] has it as a twin. */
    private fun renamedProperties(text: String, game: String, names: Map<String, String>): String {
        val words = text.split(' ')
        val renamed = names["$game#${words.first()}"] ?: return text
        return (listOf(renamed) + words.drop(1)).joinToString(" ")
    }

    /** A lang key base (`hatchick`, `megahatchick`, `mega_hatchick`) of a form of [pokemon], renamed. */
    private fun renamedLangBase(base: String, pokemon: String, renamed: String): String =
        if (base.endsWith(pokemon)) base.dropLast(pokemon.length) + renamed else base

    private fun renameEvolutions(holder: JsonObject, game: String, names: Map<String, String>) {
        JsonTrees.objects(holder, "evolutions").forEach { evolution ->
            JsonTrees.string(evolution, "result")?.let { evolution.addProperty("result", renamedProperties(it, game, names)) }
        }
    }

    private fun renameItem(item: JsonObject, game: String, pokemon: String, renamed: String?, names: Map<String, String>) {
        JsonTrees.string(item, "formId")?.let { item.addProperty("formId", renamedFormId(it, names)) }
        JsonTrees.string(item, "preEvolution")?.let { item.addProperty("preEvolution", renamedProperties(it, game, names)) }
        renameEvolutions(item, game, names)
        JsonTrees.string(item, "target")?.let { item.addProperty("target", resolverSpecies(game, it, names)) }
        JsonTrees.obj(item, "additions")?.let { additions ->
            JsonTrees.string(additions, "preEvolution")?.let { additions.addProperty("preEvolution", renamedProperties(it, game, names)) }
            renameEvolutions(additions, game, names)
        }
        if (renamed == null) return
        JsonTrees.obj(item, "origin")?.let { origin ->
            val kind = JsonTrees.string(origin, "kind")
            if (kind == "species" || kind == "inline") origin.addProperty("file", renamed)
        }
        JsonTrees.obj(item, "lang")?.let { lang ->
            val entries = lang.entrySet().map { it.key to it.value }
            entries.forEach { (key, _) -> lang.remove(key) }
            entries.forEach { (key, value) ->
                val dot = key.indexOf('.')
                val base = if (dot < 0) key else key.substring(0, dot)
                lang.add(renamedLangBase(base, pokemon, renamed) + (if (dot < 0) "" else key.substring(dot)), value)
            }
        }
        JsonTrees.list(item, "pokedex")?.let { pokedex ->
            val keys = pokedex.mapNotNull { it.takeIf { e -> e.isJsonPrimitive }?.asString }
            item.add("pokedex", JsonTrees.strings(keys.map { key ->
                val match = Regex("^(cobblemon\\.species\\.)([^.]+)(\\..*)$").find(key)
                if (match == null) key else match.groupValues[1] + renamedLangBase(match.groupValues[2], pokemon, renamed) + match.groupValues[3]
            }))
        }
    }

    /**
     * One form of the download with every twin renamed: its form id, the species file it is written to, its lang keys and pokedex
     * entries, its spawn files and the spawn entries' `pokemon`, an addition's `target`, and the `preEvolution` and evolution `result`s
     * that name a twin of the same game. A name only another game claims is left alone: which twin it means is unknowable.
     */
    fun apply(form: JsonObject, names: Map<String, String>): JsonObject {
        if (names.isEmpty()) return form
        val formId = JsonTrees.string(form, "formId") ?: return form
        val parts = formId.split('#')
        val game = parts[0]
        val pokemon = parts.getOrNull(1) ?: return form
        val renamed = names["$game#$pokemon"]
        val out = form.deepCopy()
        out.addProperty("formId", renamedFormId(formId, names))
        JsonTrees.obj(out, "species")?.let { renameItem(it, game, pokemon, renamed, names) }
        JsonTrees.obj(out, "addition")?.let { renameItem(it, game, pokemon, renamed, names) }
        if (renamed != null) {
            JsonTrees.objects(out, "spawns").forEach { spawn ->
                if (JsonTrees.string(spawn, "file") == pokemon) spawn.addProperty("file", renamed)
                JsonTrees.obj(spawn, "entry")?.let { entry ->
                    JsonTrees.string(entry, "pokemon")?.let { entry.addProperty("pokemon", renamedProperties(it, game, names)) }
                }
            }
        }
        return out
    }

    /** The starters with every twin renamed: each entry's `formId` and the species of its `properties`. */
    fun starters(games: List<ExtrasBuilder.GameStarters>, names: Map<String, String>): List<ExtrasBuilder.GameStarters> {
        if (names.isEmpty()) return games
        return games.map { game ->
            ExtrasBuilder.GameStarters(game.id, game.categories.map { category ->
                val copy = category.deepCopy()
                JsonTrees.objects(copy, "pokemon").forEach { entry ->
                    val formId = JsonTrees.string(entry, "formId") ?: return@forEach
                    val owner = formId.substringBefore('#')
                    entry.addProperty("formId", renamedFormId(formId, names))
                    JsonTrees.string(entry, "properties")?.let { entry.addProperty("properties", renamedProperties(it, owner, names)) }
                }
                copy
            })
        }
    }

    /** Whether a resolver installed from [from] (`<game>/<folder>/<file>`) to [to] may need its species renamed. */
    fun mayRename(from: String, to: String, names: Map<String, String>): Boolean =
        names.isNotEmpty() && to.startsWith(RESOLVER_FOLDER) && names.keys.any { it.startsWith(from.substringBefore('/') + "#") }

    /** A resolver's text with its `species` renamed for [game]; null when nothing changes. */
    fun renamedResolver(text: String, game: String, names: Map<String, String>): String? {
        val root = runCatching { JsonText.parseStrict(text) }.getOrNull() as? JsonObject ?: return null
        val species = JsonTrees.string(root, "species") ?: return null
        val renamed = resolverSpecies(game, species, names)
        if (renamed == species) return null
        root.addProperty("species", renamed)
        return JsonText.render(JsonTrees.plain(root))
    }

    const val RESOLVER_FOLDER = "assets/cobblemon/bedrock/species/"
}
