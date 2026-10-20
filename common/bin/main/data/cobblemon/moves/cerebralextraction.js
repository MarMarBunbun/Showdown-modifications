{
    num: 3758,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Cerebral Extraction",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
	onAfterHit(target, source, move) {
      if (target.fainted && move.totalDamage) {
        this.heal(move.totalDamage, source);
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Tough"
}
