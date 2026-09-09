{
    onModifyMove(move, pokemon, target) {
      if (move.flags["bite"]) {
        move.overrideOffensiveStat = "spa";
      }
    },
    onBasePowerPriority: 19,
    onBasePower(relayVar, source, target, move) {
      if (move.flags["bite"]) {
        this.debug("Crystal Kaw boost");
        return this.chainModify(1.3);
      }
    },
    flags: { breakable: 1 },
    name: "Crystal Jaw",
    rating: 3.5,
    num: 3235
}
