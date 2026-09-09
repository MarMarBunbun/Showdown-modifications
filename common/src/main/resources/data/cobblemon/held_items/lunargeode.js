{
    name: "Lunar Geode",
    spritenum: 3137,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Crystal") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3137,
    gen: 2
}
