{
    onStart(pokemon) {
      if (!pokemon.status) {
        pokemon.setStatus('slp', null, this.ability, true);
        pokemon.statusState.time = 2;
      }
    },
    name: "Lazy",
    rating: 1,
    num: 3094
}
