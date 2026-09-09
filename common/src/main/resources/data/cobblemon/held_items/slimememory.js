{
    name: "Slime Memory",
    spritenum: 3130,
    onMemory: "Slime",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Slime",
    itemUser: ["Silvally-Slime"],
    num: 3130,
    gen: 7,
    isNonstandard: "Past"
}
