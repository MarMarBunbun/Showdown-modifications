{
    name: "Vial of Darkness",
    spritenum: 3135,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Shadow") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3135,
    gen: 2
}
