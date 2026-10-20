{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bullet"]) {
        this.debug("Siege Drive boost");
        return this.chainModify(1.5);
      }
    },
    name: "Siege Drive",
    rating: 3.5,
    num: 3138
}
