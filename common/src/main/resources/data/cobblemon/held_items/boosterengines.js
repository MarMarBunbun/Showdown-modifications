{
    name: "Booster Engines",
    spritenum: 3164,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["speed"]) {
        this.debug("Booster Engines boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3164,
    gen: 9
}
