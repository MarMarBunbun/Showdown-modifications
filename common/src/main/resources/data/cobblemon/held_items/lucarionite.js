{
    name: "Lucarionite",
    spritenum: 594,
    megaStone: "Lucario-Mega",
    megaEvolves: "Lucario",
    itemUser: ["Lucario"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 673,
    gen: 6,
    isNonstandard: "Past"
}
