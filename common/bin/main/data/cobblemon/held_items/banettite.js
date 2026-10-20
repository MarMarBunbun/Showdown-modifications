{
    name: "Banettite",
    spritenum: 582,
    megaStone: "Banette-Mega",
    megaEvolves: "Banette",
    itemUser: ["Banette"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 668,
    gen: 6,
    isNonstandard: "Past"
}
