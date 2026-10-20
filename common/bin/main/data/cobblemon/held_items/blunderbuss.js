{
    name: "Blunderbuss",
    spritenum: 3163,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bullet"]) {
        this.debug("Blunderbuss boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["bullet"])
        delete move.flags["contact"];
    },
    num: 3163,
    gen: 9
}
