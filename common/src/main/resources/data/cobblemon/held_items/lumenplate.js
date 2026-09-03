{
    name: "Lumen Plate",
    spritenum: 3101,
    onPlate: "Light",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Light") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Light",
    num: 3101,
    gen: 4
}
