{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"]) {
        this.debug("Amplifier boost");
        return this.chainModify(1.25);
      }
    },
    name: "Amplifier",
    rating: 3.5,
    num: 3008
}
