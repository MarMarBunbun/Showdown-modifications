{
    name: "Heracronite",
    spritenum: 590,
    megaStone: "Heracross-Mega",
    megaEvolves: "Heracross",
    itemUser: ["Heracross"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 680,
    gen: 6,
    isNonstandard: "Past"
}
