{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["charge"]) {
        this.debug("Composed boost");
        return this.chainModify(1.5);
      }
    },
    name: "Composed",
    rating: 3.5,
    num: 3034
}
