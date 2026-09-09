{
    name: "Lopunnite",
    spritenum: 626,
    megaStone: "Lopunny-Mega",
    megaEvolves: "Lopunny",
    itemUser: ["Lopunny"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 768,
    gen: 6,
    isNonstandard: "Past"
}
