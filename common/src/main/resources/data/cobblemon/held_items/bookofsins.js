{
    name: "Book of Sins",
    spritenum: 3146,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Blood") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3146,
    gen: 2
}
