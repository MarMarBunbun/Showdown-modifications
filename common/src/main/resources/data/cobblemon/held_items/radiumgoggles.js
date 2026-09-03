{
    name: "Radium Goggles",
    spritenum: 3140,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Nuclear") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3140,
    gen: 2
}
