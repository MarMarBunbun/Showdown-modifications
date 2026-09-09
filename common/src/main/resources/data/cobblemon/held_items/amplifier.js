{
    name: "Amplifier",
    spritenum: 3143,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Sound") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3143,
    gen: 2
}
