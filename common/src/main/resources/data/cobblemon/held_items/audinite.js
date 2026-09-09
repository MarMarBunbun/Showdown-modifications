{
    name: "Audinite",
    spritenum: 617,
    megaStone: "Audino-Mega",
    megaEvolves: "Audino",
    itemUser: ["Audino"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 757,
    gen: 6,
    isNonstandard: "Past"
}
