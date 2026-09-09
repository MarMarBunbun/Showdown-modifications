{
    name: "Metagrossite",
    spritenum: 618,
    megaStone: "Metagross-Mega",
    megaEvolves: "Metagross",
    itemUser: ["Metagross"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 758,
    gen: 6,
    isNonstandard: "Past"
}
