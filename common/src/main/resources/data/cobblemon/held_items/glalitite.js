{
    name: "Glalitite",
    spritenum: 623,
    megaStone: "Glalie-Mega",
    megaEvolves: "Glalie",
    itemUser: ["Glalie"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 763,
    gen: 6,
    isNonstandard: "Past"
}
