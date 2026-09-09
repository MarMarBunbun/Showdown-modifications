{
    name: "Swampertite",
    spritenum: 612,
    megaStone: "Swampert-Mega",
    megaEvolves: "Swampert",
    itemUser: ["Swampert"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 752,
    gen: 6,
    isNonstandard: "Past"
}
