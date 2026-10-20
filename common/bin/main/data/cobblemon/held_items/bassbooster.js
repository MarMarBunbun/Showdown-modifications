{
    name: "Bass Booster",
    spritenum: 3160,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["Sound"]) {
        this.debug("Bass Booster boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3160,
    gen: 9
}
