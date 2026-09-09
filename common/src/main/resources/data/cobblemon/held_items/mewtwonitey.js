{
    name: "Mewtwonite Y",
    spritenum: 601,
    megaStone: "Mewtwo-Mega-Y",
    megaEvolves: "Mewtwo",
    itemUser: ["Mewtwo"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 663,
    gen: 6,
    isNonstandard: "Past"
}
