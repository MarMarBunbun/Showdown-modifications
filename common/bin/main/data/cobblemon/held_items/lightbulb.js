{
    name: "Lightbulb",
    spritenum: 3139,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Light") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3139,
    gen: 2
}
