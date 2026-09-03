{
    name: "PSN Cure Berry",
    spritenum: 333,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Electric"
    },
    onUpdate(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.cureStatus();
      }
    },
    num: 151,
    gen: 2,
    isNonstandard: "Past"
}
