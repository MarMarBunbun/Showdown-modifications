{
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Sudden Seed");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else if (!target.hasType("Grass")) {
          target.addVolatile("leechseed", pokemon);
        }
      }
    },
    flags: {},
    name: "Sudden Seed",
    rating: 3.5,
    num: 3216
}
