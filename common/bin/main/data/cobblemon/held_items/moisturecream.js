{
    name: "Moisture Cream",
    spritenum: 3142,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Slime") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3142,
    gen: 2
}
