{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["beam"]) {
        this.debug("Laser Focus boost");
        return this.chainModify(1.5);
      }
    },
    name: "Laser Focus",
    rating: 3.5,
    num: 3093
}
