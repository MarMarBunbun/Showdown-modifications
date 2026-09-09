{
    num: 3049,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Cacophony",
    pp: 10,
    priority: 0,
    flags: {sound: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1},
    self: {
      volatileStatus: "lockedmove",
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
