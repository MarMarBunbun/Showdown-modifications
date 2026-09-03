{
    num: 3477,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const targetWeight = target.getWeight();
      const pokemonWeight = pokemon.getWeight();
      let bp;
      if (pokemonWeight >= targetWeight * 5) {
        bp = 120;
      } else if (pokemonWeight >= targetWeight * 4) {
        bp = 100;
      } else if (pokemonWeight >= targetWeight * 3) {
        bp = 80;
      } else if (pokemonWeight >= targetWeight * 2) {
        bp = 60;
      } else {
        bp = 40;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Physical",
    name: "Ground Pound",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit(target, source, move) {
      if (target.volatiles["dynamax"]) {
        this.add("-fail", source, "move: Grass Knot", "[from] Dynamax");
        this.attrLastMove("[still]");
        return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
}
