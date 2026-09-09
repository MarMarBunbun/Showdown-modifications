{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["speed"]) {
        this.debug("Acceleration boost");
        return this.chainModify(1.5);
      }
    },
    name: "Acceleration",
    rating: 3.5,
    num: 3001
}
