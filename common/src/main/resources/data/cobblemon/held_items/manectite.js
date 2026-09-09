{
    name: "Manectite",
    spritenum: 596,
    megaStone: "Manectric-Mega",
    megaEvolves: "Manectric",
    itemUser: ["Manectric"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 682,
    gen: 6,
    isNonstandard: "Past"
}
