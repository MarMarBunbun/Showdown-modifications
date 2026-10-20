{
    num: 3741,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Synaptic Bleed",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: null,
	onBasePower(basePower, source, target, move) {
      if (target.hasType("Psychic")) {
        this.debug("Synaptic Bleed vs Psychic: power doubled");
        return this.chainModify(2);
      }
	},
	onHit(target, source, move) {
      if (target.hasType("Psychic") && this.randomChance(3, 10)) {
        if (target.addVolatile("flinch")) {
          this.add("-start", target, "flinch");
        }
      }
	},
    target: "normal",
    type: "Blood",
    contestType: "Tough"
}
