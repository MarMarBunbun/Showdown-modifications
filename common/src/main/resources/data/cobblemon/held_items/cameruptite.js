{
    name: "Cameruptite",
    spritenum: 625,
    megaStone: "Camerupt-Mega",
    megaEvolves: "Camerupt",
    itemUser: ["Camerupt"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 767,
    gen: 6,
    isNonstandard: "Past"
}
