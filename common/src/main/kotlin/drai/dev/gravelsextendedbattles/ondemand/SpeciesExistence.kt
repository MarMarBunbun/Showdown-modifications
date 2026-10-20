package drai.dev.gravelsextendedbattles.ondemand

/**
 * Whether the Pokemon a stone, a fossil or a starter names exists, now that the selection decides which species the game has
 * (plan, section 4). It is a check next to the ban list, never instead of it.
 *
 * **Timing guard:** Cobblemon loads its species when a world is opened, long after the mod's init (spike C). Until then nothing can be said
 * about any species, so a Pokemon counts as existing and only the old checks apply; otherwise a list built early would see "no species" and
 * remove everything. [loaded] is the flag the species observable sets.
 */
object SpeciesExistence {
    /**
     * @param loaded whether the species have loaded
     * @param species the species the properties name (`cobblemon:absol`, `absol`), or null when they name none (a random Pokemon)
     * @param aspects the aspects the properties ask for (`epoch`)
     * @param formsOf the aspect sets of every form of a species (a form with no aspects is the standard one), or null when the species does not exist
     */
    fun exists(loaded: Boolean, species: String?, aspects: Set<String>, formsOf: (String) -> List<Set<String>>?): Boolean {
        if (!loaded) return true
        if (species == null) return true
        val name = species.substringAfter(':').lowercase()
        if (name == "random" || name.isEmpty()) return true
        val forms = formsOf(name) ?: return false
        if (aspects.isEmpty()) return true
        // A form exists when it carries every aspect the Pokemon asks for.
        return forms.any { it.containsAll(aspects) }
    }
}
