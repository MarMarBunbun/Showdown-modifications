{
    name: "Absolite",
    spritenum: 576,
    megaStone: "Absol-Mega",
    megaEvolves: "Absol",
    itemUser: ["Absol"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 677,
    gen: 6,
    isNonstandard: "Past"
}
