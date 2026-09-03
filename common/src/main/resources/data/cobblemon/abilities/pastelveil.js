{
    onStart(pokemon) {
      for (const ally of pokemon.alliesAndSelf()) {
        if (["psn", "tox", "bgt"].includes(ally.status)) {
          this.add("-activate", pokemon, "ability: Pastel Veil");
          ally.cureStatus();
        }
      }
    },
    onUpdate(pokemon) {
      if (["psn", "tox", "bgt"].includes(pokemon.status)) {
        this.add("-activate", pokemon, "ability: Pastel Veil");
        pokemon.cureStatus();
      }
    },
    onAllySwitchIn(pokemon) {
      if (["psn", "tox", "bgt"].includes(pokemon.status)) {
        this.add("-activate", this.effectState.target, "ability: Pastel Veil");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (!["psn", "tox", "bgt"].includes(status.id))
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Pastel Veil");
      }
      return false;
    },
    onAllySetStatus(status, target, source, effect) {
      if (!["psn", "tox", "bgt"].includes(status.id))
        return;
      if (effect?.status) {
        const effectHolder = this.effectState.target;
        this.add("-block", target, "ability: Pastel Veil", "[of] " + effectHolder);
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Pastel Veil",
    rating: 2,
    num: 257
}
