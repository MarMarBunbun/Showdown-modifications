{
    onStart(pokemon) {
      let activated = false;
      for (const ally of pokemon.adjacentAllies()) {
        if (!activated) {
          this.add("-ability", pokemon, "Brotherhood", "boost");
          activated = true;
        }
        this.boost({ def: 1 }, ally, pokemon, null, true);
      }
	},
    flags: {},
    name: "Brotherhood",
    rating: 3.5,
    num: 3264
}
