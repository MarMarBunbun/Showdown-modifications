{
    name: "Sablenite",
    spritenum: 614,
    megaStone: "Sableye-Mega",
    megaEvolves: "Sableye",
    itemUser: ["Sableye"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 754,
    gen: 6,
    isNonstandard: "Past"
}
