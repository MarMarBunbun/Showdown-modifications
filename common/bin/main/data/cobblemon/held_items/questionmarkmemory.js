{
    name: "Mystery Memory",
    spritenum: 3123,
    onMemory: "Mystery",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Mystery",
    itemUser: ["Silvally-Mystery"],
    num: 3123,
    gen: 7,
    isNonstandard: "Past"
}
