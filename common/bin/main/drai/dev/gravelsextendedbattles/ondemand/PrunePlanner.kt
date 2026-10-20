package drai.dev.gravelsextendedbattles.ondemand

/**
 * What the client keeps, deletes and installs once the player's selection is known (port of `prunePlan.ts`).
 *
 * Pruning is **by reference**: the keep-set is the union of every enabled form's files and `uses`; a file is deleted only if it
 * belongs to a disabled folder and is not in the keep-set. A file no form folder owns is never touched. Files are named by their
 * repository path `<game>/<folder>/<flat file>`.
 */
object PrunePlanner {
    /** One form folder of the downloaded tree. */
    data class Folder(
        /** `<game>/<folder>`. */
        val path: String,
        val manifest: InstallManifest,
        /** Every file actually in the folder, when known. A folder that still holds a file `install.json` does not list is kept. */
        val listing: List<String>? = null,
    )

    enum class IssueCode { USES_MISSING, INSTALL_COLLISION }

    data class Issue(val code: IssueCode, val message: String)

    data class Install(val from: String, val to: String)

    data class Plan(
        /** Kept in disabled folders because an enabled form needs them. */
        val sharedKept: List<String>,
        /** Every file to delete, as repository paths, sorted. */
        val delete: List<String>,
        /** Folders that end up empty and are removed, sorted. */
        val removeFolders: List<String>,
        /** Every file to install, sorted by repository path. */
        val install: List<Install>,
        /** Problems that make the plan unsafe or the tree inconsistent. Empty for a sound tree. */
        val issues: List<Issue>,
    ) {
        val sound: Boolean get() = issues.isEmpty()
    }

    /** `<game>/<folder>` of every enabled form that has a folder in [folders]. */
    fun enabledFolderPaths(enabled: Collection<Gms3.SelectableForm>, folders: Collection<Folder>): Set<String> {
        val present = folders.map { it.path }.toSet()
        return enabled.mapNotNull { it.folder }.filter { it in present }.toSet()
    }

    /** The files a selection keeps: every file of an enabled folder, plus their `uses`. */
    fun keepSet(enabledFolders: Set<String>, folders: Collection<Folder>): Set<String> {
        val keep = linkedSetOf<String>()
        for (folder in folders) {
            if (folder.path !in enabledFolders) continue
            folder.manifest.files.keys.forEach { keep += "${folder.path}/$it" }
            keep += folder.manifest.uses
        }
        return keep
    }

    fun plan(enabled: Collection<Gms3.SelectableForm>, allFolders: Collection<Folder>): Plan {
        val folders = allFolders.filter { !InstallManifests.isMismatchedPath(it.path) }
        val enabledFolders = enabledFolderPaths(enabled, folders)
        val keep = keepSet(enabledFolders, folders)
        val issues = mutableListOf<Issue>()

        val installPathOf = hashMapOf<String, String>()
        for (folder in folders) {
            for ((name, to) in folder.manifest.files) installPathOf["${folder.path}/$name"] = to
        }

        for (folder in folders) {
            if (folder.path !in enabledFolders) continue
            for (entry in folder.manifest.uses) {
                if (InstallManifests.parseUsesEntry(entry) == null || entry !in installPathOf) {
                    issues += Issue(IssueCode.USES_MISSING, "${folder.path} uses $entry, which is not in any install.json.")
                }
            }
        }

        val remove = mutableListOf<String>()
        val removeFolders = mutableListOf<String>()
        val sharedKept = mutableListOf<String>()
        for (folder in folders) {
            if (folder.path in enabledFolders) continue
            val manifestFiles = folder.manifest.files.keys
            val kept = manifestFiles.filter { "${folder.path}/$it" in keep }
            for (name in manifestFiles) {
                val path = "${folder.path}/$name"
                if (path in keep) sharedKept += path else remove += path
            }
            val owned = manifestFiles + InstallManifests.INSTALL_FILE + InstallManifests.CREDITS_FILE
            val unowned = (folder.listing ?: emptyList()).filter { it !in owned }
            if (kept.isEmpty() && unowned.isEmpty()) {
                removeFolders += folder.path
                remove += "${folder.path}/${InstallManifests.INSTALL_FILE}"
                // credits.json is export-ignored, so it is only deleted when the listing shows it.
                if (folder.listing?.contains(InstallManifests.CREDITS_FILE) == true) {
                    remove += "${folder.path}/${InstallManifests.CREDITS_FILE}"
                }
            }
        }

        val install = mutableListOf<Install>()
        val byTarget = hashMapOf<String, String>()
        for (from in keep.sorted()) {
            val to = installPathOf[from] ?: continue
            val clash = byTarget[to]
            if (clash != null && clash != from) {
                issues += Issue(IssueCode.INSTALL_COLLISION, "$clash and $from both install to $to.")
            }
            byTarget[to] = from
            install += Install(from, to)
        }

        return Plan(sharedKept.sorted(), remove.sorted(), removeFolders.sorted(), install, issues)
    }
}
