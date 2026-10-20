{
    onTryMovePriority: -2,
    onTryMove(pokemon, target, move) {
      if (move.id === "stealthrock") {
        this.actions.useMove("hotcoals", pokemon, {target: target});
        return null;
      }
    },
	onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.type === "Rock" && !(move.isZ && move.category !== "Status")) {
        move.type = "Fire";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Foundry",
    rating: 4,
    num: 3068
}
