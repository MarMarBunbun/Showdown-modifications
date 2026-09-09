{
    num: 3317,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "RAging Waves",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1 },
    self: {
      volatileStatus: "lockedmove"
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    },
    secondary: null,
    target: "randomNormal",
    type: "Water",
    contestType: "Cool"
}
