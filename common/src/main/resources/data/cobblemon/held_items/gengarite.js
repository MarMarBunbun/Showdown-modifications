{
    name: "Gengarite",
    spritenum: 588,
    megaStone: "Gengar-Mega",
    megaEvolves: "Gengar",
    itemUser: ["Gengar"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 656,
    gen: 6,
    isNonstandard: "Past"
}
