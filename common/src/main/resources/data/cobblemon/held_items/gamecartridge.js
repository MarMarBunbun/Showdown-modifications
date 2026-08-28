{
    name: "Game Cartridge",
    spritenum: 3136,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Questionmark") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3136,
    gen: 2
}
