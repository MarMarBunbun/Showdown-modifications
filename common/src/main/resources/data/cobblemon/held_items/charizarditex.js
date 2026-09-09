{
    name: "Charizardite X",
    spritenum: 585,
    megaStone: "Charizard-Mega-X",
    megaEvolves: "Charizard",
    itemUser: ["Charizard"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 660,
    gen: 6,
    isNonstandard: "Past"
}
