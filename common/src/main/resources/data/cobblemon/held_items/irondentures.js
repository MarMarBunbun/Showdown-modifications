{
    name: "Iron Dentures",
    spritenum: 3162,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        this.debug("Iron Dentures boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["bite"])
        delete move.flags["contact"];
    },
    num: 3162,
    gen: 9
}
