package drai.dev.gravelsextendedbattles.ondemand.sync

import drai.dev.gravelsextendedbattles.ondemand.Gms3

/**
 * The join-time warning (plan, section 8): a server sends the selection code it runs with, and a client whose own selection is different is
 * told once. It is a warning only; nothing is downloaded or changed.
 *
 * The code a server sends is a **claim made by whoever runs it**, so the client treats it as untrusted input: it goes through the strict decoder
 * (length first), is only compared, and is never saved or applied. A damaged code is ignored and only logged.
 */
object SelectionSync {
    /** The decoder refuses longer codes, and a code of this size still fits in the 1 MiB limit of a clientbound custom payload. */
    const val MAX_CODE_CHARS = 1_000_000

    sealed class Verdict {
        /** The same selection (written the same way or not), or nothing to compare. */
        data object Same : Verdict()

        /** The server's code is not one the decoder accepts; it is ignored. */
        data object ServerCodeDamaged : Verdict()

        /** Our own code is empty or damaged; there is nothing to compare with. */
        data object NoOwnSelection : Verdict()

        /** The two selections differ. */
        data object Different : Verdict()
    }

    /** The code a server sends for [ownCode]: the canonical form, or null when it has no valid code (it then sends nothing). */
    fun codeToSend(ownCode: String?): String? = Gms3.canonical(ownCode)?.takeIf { it.length <= MAX_CODE_CHARS }

    /**
     * Compares [serverCode], as received, with [ownCode]. Both are decoded and written canonically first, so the same selection written
     * differently does not warn. The starter categories are left out: the server alone offers starters, so only the Pokemon are compared.
     */
    fun check(serverCode: String?, ownCode: String?): Verdict {
        val server = pokemonOf(serverCode) ?: return Verdict.ServerCodeDamaged
        val own = pokemonOf(ownCode) ?: return Verdict.NoOwnSelection
        return if (server == own) Verdict.Same else Verdict.Different
    }

    private fun pokemonOf(code: String?): String? = Gms3.tryDecode(code)?.withoutStarterChoices()?.let(Gms3::encode)

    const val TITLE = "Different Pokemon selection"

    const val MESSAGE =
        "This server uses a different Pokemon selection than you. Some Pokemon may show placeholder models. " +
            "You can change your selection code in config/gravels-extended-battles.toml (selectionCode)."
}
