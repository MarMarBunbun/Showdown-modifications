{
    name: "Power Cell",
    spritenum: 3161,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["pulse"]) {
        this.debug("Bass Booster boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3161,
    gen: 9
}
