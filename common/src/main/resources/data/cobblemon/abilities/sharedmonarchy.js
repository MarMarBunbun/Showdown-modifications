{
    onBasePowerPriority: 30,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Dragon" || move.type === "Fairy") {
        const basePowerAfterMultiplier = this.modify(
          basePower,
          this.event.modifier
        );
        if (basePowerAfterMultiplier <= 60) {
          return this.chainModify(1.7);
        }
      }
    },
	flags: {},
    name: "Shared Monarchy",
    rating: 4,
    num: 3228
}
