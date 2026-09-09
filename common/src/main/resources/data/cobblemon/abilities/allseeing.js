{
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "All-Seeing", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ evasion: -1 }, target, pokemon, null, true);
        }
      }
    },
    flags: {},
    name: "All-Seeing",
    rating: 4.5,
    num: 3218
}
