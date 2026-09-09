{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["hm"]) {
        this.debug("Specialist boost");
        return this.chainModify(1.5);
      }
    },
    name: "Specialist",
    rating: 3.5,
    num: 3141
}
