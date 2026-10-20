{
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add('-ability', pokemon, 'Grim Tears', 'boost');
          activated = true;
        }
        if (target.volatiles['substitute']) {
          this.add('-immune', target);
        } else {
          this.boost({ spa: -1 }, target, pokemon, null, true);
        }
      }
    },
    flags: {},
    name: "Grim Tears",
    rating: 3.5,
    num: 3237
}
