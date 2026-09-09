{
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Power Fist boost");
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Power Fist",
    rating: 3,
    num: 3116
}
