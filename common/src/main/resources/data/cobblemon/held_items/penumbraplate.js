{
    name: "Penumbra Plate",
    spritenum: 3096,
    onPlate: "Shadow",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Shadow") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Shadow",
    num: 3096,
    gen: 4
}
