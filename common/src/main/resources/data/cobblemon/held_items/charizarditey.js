{
    name: "Charizardite Y",
    spritenum: 586,
    megaStone: "Charizard-Mega-Y",
    megaEvolves: "Charizard",
    itemUser: ["Charizard"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 678,
    gen: 6,
    isNonstandard: "Past"
}
