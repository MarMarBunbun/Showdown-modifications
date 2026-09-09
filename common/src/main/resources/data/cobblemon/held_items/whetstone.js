{
    name: "Whetstone",
    spritenum: 3168,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["slicing"]) {
        this.debug("Whetstone boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3168,
    gen: 9
}
