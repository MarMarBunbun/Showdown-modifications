{
    name: "Flygon Armor",
    spritenum: 3023,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 330 || pokemon.baseSpecies.num === 330) {
        return false;
      }
      return true;
    },
    forcedForme: "Flygon-Armored",
    itemUser: ["Flygon-Armored"],
    num: 3023,
    gen: 8
}
