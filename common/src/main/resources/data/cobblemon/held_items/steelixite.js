{
    name: "Steelixite",
    spritenum: 621,
    megaStone: "Steelix-Mega",
    megaEvolves: "Steelix",
    itemUser: ["Steelix"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 761,
    gen: 6,
    isNonstandard: "Past"
}
