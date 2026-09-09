{
    name: "Salamencite",
    spritenum: 627,
    megaStone: "Salamence-Mega",
    megaEvolves: "Salamence",
    itemUser: ["Salamence"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 769,
    gen: 6,
    isNonstandard: "Past"
}
