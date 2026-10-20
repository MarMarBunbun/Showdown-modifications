{
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.type === "Psychic" && !(move.isZ && move.category !== "Status")) {
        move.type = "Poison";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Gutter Mind",
    rating: 4,
    num: 3187
}
