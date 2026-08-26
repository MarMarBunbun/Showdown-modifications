{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Sound" || move.flags["sound"]) {
        this.debug("Steelworker boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Sound" || move.flags["sound"]) {
        this.debug("Steelworker boost");
        return this.chainModify(1.5);
      }
    },
	onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Sound" || move.flags["sound"]) {
        return this.chainModify(1.5);
      }
    },
	onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Thick Fat weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Thick Fat weaken");
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Bold as Brass",
    rating: 3.5,
    num: 3224
}
