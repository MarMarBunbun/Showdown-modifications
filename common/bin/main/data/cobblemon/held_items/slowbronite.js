{
    name: "Slowbronite",
    spritenum: 620,
    megaStone: "Slowbro-Mega",
    megaEvolves: "Slowbro",
    itemUser: ["Slowbro"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 760,
    gen: 6,
    isNonstandard: "Past"
}
