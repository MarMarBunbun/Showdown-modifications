{
    name: "Abomasite",
    spritenum: 575,
    megaStone: "Abomasnow-Mega",
    megaEvolves: "Abomasnow",
    itemUser: ["Abomasnow"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 674,
    gen: 6,
    isNonstandard: "Past"
}
