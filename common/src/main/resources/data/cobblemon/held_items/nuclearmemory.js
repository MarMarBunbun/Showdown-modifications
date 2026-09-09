{
    name: "Nuclear Memory",
    spritenum: 3128,
    onMemory: "Nuclear",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Nuclear",
    itemUser: ["Silvally-Nuclear"],
    num: 3128,
    gen: 7,
    isNonstandard: "Past"
}
