{
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if ((move.type === "Sound" || move.flags["sound"]) && !(move.isZ && move.category !== "Status")) {
        move.type = "Bug";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([6144, 4096]);
    },
    name: "Trumpet Weevil",
    rating: 4,
    num: 3205
}
