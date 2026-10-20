{
    name: "Latiasite",
    spritenum: 629,
    megaStone: "Latias-Mega",
    megaEvolves: "Latias",
    itemUser: ["Latias"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 684,
    gen: 6,
    isNonstandard: "Past"
}
