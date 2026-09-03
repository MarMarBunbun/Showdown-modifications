{
    num: 3450,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Wild Dance",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1, sound: 1 },
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
    type: "Sound",
    contestType: "Cool"
}
