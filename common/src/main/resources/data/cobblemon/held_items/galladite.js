{
    name: "Galladite",
    spritenum: 616,
    megaStone: "Gallade-Mega",
    megaEvolves: "Gallade",
    itemUser: ["Gallade"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 756,
    gen: 6,
    isNonstandard: "Past"
}
