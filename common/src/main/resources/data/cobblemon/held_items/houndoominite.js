{
    name: "Houndoominite",
    spritenum: 591,
    megaStone: "Houndoom-Mega",
    megaEvolves: "Houndoom",
    itemUser: ["Houndoom"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 666,
    gen: 6,
    isNonstandard: "Past"
}
