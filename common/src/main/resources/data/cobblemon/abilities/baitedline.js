{
    onFoeTrapPokemon(pokemon) {
      if (pokemon.hasType("Water") && pokemon.isAdjacent(this.effectState.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source) source = this.effectState.target;
      if (!source || !pokemon.isAdjacent(source)) return;
      if (!pokemon.knownType || pokemon.hasType("Water")) {
        pokemon.maybeTrapped = true;
      }
    },
    flags: {},
    name: "Baited Line",
    rating: 4,
    num: 3233
}
