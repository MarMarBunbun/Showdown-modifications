{
    name: "Instep Guard",
    spritenum: 3166,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["kick"]) {
        this.debug("Instep Guard boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["kick"])
        delete move.flags["contact"];
    },
    num: 3166,
    gen: 9
}
