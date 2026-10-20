{
    name: "Industrial Fan",
    spritenum: 3144,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Wind") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3144,
    gen: 2
}
