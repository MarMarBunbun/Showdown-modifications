{
    name: "Plastic Memory",
    spritenum: 3129,
    onMemory: "Plastic",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Plastic",
    itemUser: ["Silvally-Plastic"],
    num: 3129,
    gen: 7,
    isNonstandard: "Past"
}
