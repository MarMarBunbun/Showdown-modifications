{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if ((attacker.status === "psn" || attacker.status === "tox" || attacker.status === "bgt") && move.category === "Physical") {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Toxic Boost",
    rating: 3,
    num: 137
}
