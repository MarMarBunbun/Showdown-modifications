{
    name: "Sceptilite",
    spritenum: 613,
    megaStone: "Sceptile-Mega",
    megaEvolves: "Sceptile",
    itemUser: ["Sceptile"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 753,
    gen: 6,
    isNonstandard: "Past"
}
