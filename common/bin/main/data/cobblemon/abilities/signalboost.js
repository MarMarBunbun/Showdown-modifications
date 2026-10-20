{
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (pokemon.activeTurns) {
        this.boost({ accuracy: 1 });
      }
    },
    flags: {},
    name: "Signal Boost",
    rating: 4.5,
    num: 3217
}
