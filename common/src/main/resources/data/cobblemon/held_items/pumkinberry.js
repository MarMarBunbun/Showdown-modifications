{
    name: "Pumkin Berry",
    spritenum: 3175,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ice"
    },
    onUpdate(pokemon) {
      if (pokemon.status === "fbt") {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      if (pokemon.status === "fbt") {
        pokemon.cureStatus();
      }
    },
    num: 3175,
    gen: 3
}
