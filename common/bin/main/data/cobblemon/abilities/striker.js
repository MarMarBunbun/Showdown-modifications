{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["kick"]) {
        this.debug("Striker boost");
        return this.chainModify(1.5);
      }
    },
    name: "Striker",
    rating: 3.5,
    num: 3150
}
