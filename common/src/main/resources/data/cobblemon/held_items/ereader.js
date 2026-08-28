{
    name: "E-Reader",
    spritenum: 3138,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Digital") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3138,
    gen: 2
}
