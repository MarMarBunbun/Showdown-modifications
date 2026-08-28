{
    name: "Medichamite",
    spritenum: 599,
    megaStone: "Medicham-Mega",
    megaEvolves: "Medicham",
    itemUser: ["Medicham"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 665,
    gen: 6,
    isNonstandard: "Past"
}
