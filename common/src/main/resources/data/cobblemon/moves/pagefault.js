{
    num: 3621,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Page Fault",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1, slicing: 1, blade: 1 },
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
    type: "Poison",
    contestType: "Cool"
}
