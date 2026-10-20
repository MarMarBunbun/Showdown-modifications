{
    onTryHit(pokemon, target, move) {
      if (move.type === "Fire") {
        this.add("-immune", pokemon, "[from] ability: Cover me in Debris");
        return null;
      }
    },
	onUpdate(pokemon) {
      if (pokemon.status === "brn") {
        this.add("-activate", pokemon, "ability: Cover me in Debris");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Cover me in Debris");
      }
      return false;
    },
    flags: {},
    name: "Cover me in Debris",
    rating: 3,
    num: 3042
}
