{
    onUpdate(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        this.add("-activate", pokemon, "ability: Immunity");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "psn" && status.id !== "tox" && status.id !== "bgt")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Immunity");
      }
      return false;
    },
    flags: { breakable: 1 },
    name: "Immunity",
    rating: 2,
    num: 17
}
