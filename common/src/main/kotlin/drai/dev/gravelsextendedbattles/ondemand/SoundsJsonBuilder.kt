package drai.dev.gravelsextendedbattles.ondemand

/**
 * The `sounds.json` events of the cries that survived pruning (port of `soundsJson.ts`).
 *
 * The file is generated into the downloaded pack (plan, decision 6) and holds only the Gravelmon cries; Minecraft merges the
 * `sounds.json` of every pack of a namespace, so the mod's own file keeps the events that point at vanilla Cobblemon cries.
 * A cry installs at `assets/gravelmon/sounds/pokemon/<game>/<name>_cry.ogg` and its event is
 * `"pokemon.<name>.cry": { "sounds": [ { "name": "gravelmon:pokemon/<game>/<name>_cry", "volume": 0.8 } ] }`.
 */
object SoundsJsonBuilder {
    const val CRY_VOLUME = 0.8
    const val NAMESPACE = "gravelmon"
    private val CRY_INSTALL_PATH = Regex("^assets/gravelmon/sounds/pokemon/([^/]+)/([^/]+)_cry\\.ogg$")

    data class CryEvent(val key: String, val resource: String)

    /** The event of one install path, or null when the path is not a cry. */
    fun cryEvent(installPath: String): CryEvent? {
        val match = CRY_INSTALL_PATH.matchEntire(installPath) ?: return null
        val (game, name) = match.destructured
        return CryEvent("pokemon.$name.cry", "$NAMESPACE:pokemon/$game/${name}_cry")
    }

    /**
     * The events for a set of install paths; anything that is not a cry is ignored. Keys are sorted, so the same cries give the
     * same bytes. Two different cries that want one event key are an error, since the later would shadow the first.
     */
    fun generate(installPaths: Iterable<String>): Map<String, Map<String, Any>> {
        val events = hashMapOf<String, String>()
        for (path in installPaths) {
            val event = cryEvent(path) ?: continue
            val existing = events[event.key]
            check(existing == null || existing == event.resource) { "${event.key} would point at both $existing and ${event.resource}." }
            events[event.key] = event.resource
        }
        val result = linkedMapOf<String, Map<String, Any>>()
        for (key in events.keys.sorted()) {
            result[key] = mapOf("sounds" to listOf(linkedMapOf("name" to events.getValue(key), "volume" to CRY_VOLUME)))
        }
        return result
    }

    /** The file's text: two spaces, trailing newline, the way the site writes it. */
    fun render(events: Map<String, Map<String, Any>>): String = JsonText.render(events, indent = 2) + "\n"
}
