{
    name: "Questionmark Memory",
    spritenum: 3123,
    onMemory: "Questionmark",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Questionmark",
    itemUser: ["Silvally-Questionmark"],
    num: 3123,
    gen: 7,
    isNonstandard: "Past"
}
