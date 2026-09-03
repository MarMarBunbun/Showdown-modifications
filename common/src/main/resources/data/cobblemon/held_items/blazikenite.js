{
    name: "Blazikenite",
    spritenum: 584,
    megaStone: "Blaziken-Mega",
    megaEvolves: "Blaziken",
    itemUser: ["Blaziken"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 664,
    gen: 6,
    isNonstandard: "Past"
}
