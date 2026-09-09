{
    name: "Toy Pickaxe",
    spritenum: 3141,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Plastic") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3141,
    gen: 2
}
