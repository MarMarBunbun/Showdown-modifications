{
    onFoeTrapPokemon(pokemon) {
      if (pokemon.hasType("Psychic", "Cosmic") && pokemon.isAdjacent(this.effectState.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon.isAdjacent(source))
        return;
      if (!pokemon.knownType || pokemon.hasType("Psychic", "Cosmic")) {
        pokemon.maybeTrapped = true;
      }
    },
    name: "Black Hole",
    rating: 4,
    num: 3015
}
