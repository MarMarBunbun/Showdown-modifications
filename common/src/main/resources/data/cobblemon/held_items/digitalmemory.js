{
    name: "Digital Memory",
    spritenum: 3126,
    onMemory: "Digital",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Digital",
    itemUser: ["Silvally-Digital"],
    num: 3126,
    gen: 7,
    isNonstandard: "Past"
}
