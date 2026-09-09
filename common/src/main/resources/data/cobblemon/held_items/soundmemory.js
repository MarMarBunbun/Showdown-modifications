{
    name: "Sound Memory",
    spritenum: 3131,
    onMemory: "Sound",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Sound",
    itemUser: ["Silvally-Sound"],
    num: 3131,
    gen: 7,
    isNonstandard: "Past"
}
