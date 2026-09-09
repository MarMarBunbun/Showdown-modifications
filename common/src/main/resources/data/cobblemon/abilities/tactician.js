{
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (move.typeMod === 0 || move.typeMod === 2) {
        this.debug("Tactician boost");
        return this.chainModify(2);
      }
    },
    name: "Tactician",
    rating: 5,
    num: 3153,
}
