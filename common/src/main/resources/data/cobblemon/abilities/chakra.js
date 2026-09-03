{
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fairy") {
        this.debug("Chakra boost");
        return this.chainModify([5325, 4096]);
      }
    },
    flags: {},
    name: "Chakra",
    rating: 3,
    num: 3194
}
