{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Fieldworker boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Fieldworker",
    rating: 3.5,
    num: 3198
}
