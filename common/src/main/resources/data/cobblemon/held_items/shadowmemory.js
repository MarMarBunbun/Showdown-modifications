{
    name: "Shadow Memory",
    spritenum: 3122,
    onMemory: "Shadow",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Shadow",
    itemUser: ["Silvally-Shadow"],
    num: 3122,
    gen: 7,
    isNonstandard: "Past"
}
