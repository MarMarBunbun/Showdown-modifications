{
    name: "Mawilite",
    spritenum: 598,
    megaStone: "Mawile-Mega",
    megaEvolves: "Mawile",
    itemUser: ["Mawile"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 681,
    gen: 6,
    isNonstandard: "Past"
}
