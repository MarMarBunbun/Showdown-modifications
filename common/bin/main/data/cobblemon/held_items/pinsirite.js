{
    name: "Pinsirite",
    spritenum: 602,
    megaStone: "Pinsir-Mega",
    megaEvolves: "Pinsir",
    itemUser: ["Pinsir"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 671,
    gen: 6,
    isNonstandard: "Past"
}
