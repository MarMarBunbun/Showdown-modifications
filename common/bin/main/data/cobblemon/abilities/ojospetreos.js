{
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Ojos Petreos", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
	onFoeTrapPokemon(pokemon) {
      if (!pokemon.hasAbility("ojospetreos") && pokemon.isAdjacent(this.effectState.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon.isAdjacent(source))
        return;
      if (!pokemon.hasAbility("ojospetreos")) {
        pokemon.maybeTrapped = true;
      }
    },
    flags: {},
    name: "Ojos Petreos",
    rating: 3.5,
    num: 3107
}
