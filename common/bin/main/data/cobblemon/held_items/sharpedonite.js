{
    name: "Sharpedonite",
    spritenum: 619,
    megaStone: "Sharpedo-Mega",
    megaEvolves: "Sharpedo",
    itemUser: ["Sharpedo"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 759,
    gen: 6,
    isNonstandard: "Past"
}
