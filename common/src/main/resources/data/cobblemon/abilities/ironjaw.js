{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Iron Jaw",
    rating: 3.5,
    num: 3090
}
