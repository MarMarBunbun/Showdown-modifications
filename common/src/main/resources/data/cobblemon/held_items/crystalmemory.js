{
    name: "Crystal Memory",
    spritenum: 3125,
    onMemory: "Crystal",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Crystal",
    itemUser: ["Silvally-Crystal"],
    num: 3125,
    gen: 7,
    isNonstandard: "Past"
}
