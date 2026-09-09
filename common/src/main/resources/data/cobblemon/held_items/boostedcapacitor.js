{
    name: "Boosted Capacitor",
    spritenum: 3165,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["beam"]) {
        this.debug("Boosted Capacitor boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3165,
    gen: 9
}
