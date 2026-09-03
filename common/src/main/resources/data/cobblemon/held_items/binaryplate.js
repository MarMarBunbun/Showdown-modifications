{
    name: "Binary Plate",
    spritenum: 3100,
    onPlate: "Digital",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Digital") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Digital",
    num: 3100,
    gen: 4
}
