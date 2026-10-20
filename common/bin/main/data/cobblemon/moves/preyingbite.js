{
    num: 3747,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Preying Bite",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
    onBasePower(basePower, source, target, move) {
      if (target.status) {
        return this.chainModify(2);
      }
	},
	onAfterHit(target, source, move) {
      if (target.status && move.totalDamage) {
        this.heal(move.totalDamage / 4, source);
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
}
