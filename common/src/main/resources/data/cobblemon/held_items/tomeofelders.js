{
    name: "Tome of Elders",
    spritenum: 3145,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Eldritch") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3145,
    gen: 2
}
