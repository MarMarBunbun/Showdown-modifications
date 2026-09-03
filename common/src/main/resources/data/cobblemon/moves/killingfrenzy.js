{
    num: 3754,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Killing Frenzy",
    pp: 30,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    multihit: [2, 5],
    secondary: null,
	onAfterMove(source, target, move) {
      if (source && !source.fainted) {
        this.boost({ def: -1 }, source, source, move);
      }
    },
    target: "normal",
    type: "Blood",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
}
