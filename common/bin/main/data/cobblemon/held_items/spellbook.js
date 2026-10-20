{
    name: "Spell Book",
    spritenum: 3167,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["magic"]) {
        this.debug("Spell Book boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3167,
    gen: 9
}
