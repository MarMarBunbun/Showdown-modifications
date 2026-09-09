{
    onAllyBasePowerPriority: 22,
    onAllyBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Aqua Boost boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Aqua Boost",
    rating: 3.5,
    num: 3260
}
