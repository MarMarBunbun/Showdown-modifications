{
    num: 3739,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Hemophage Frenzy",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1 },
    drain: [1, 6],
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
    type: "Blood",
    contestType: "Cool"
}
