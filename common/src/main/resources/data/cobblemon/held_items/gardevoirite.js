{
    name: "Gardevoirite",
    spritenum: 587,
    megaStone: "Gardevoir-Mega",
    megaEvolves: "Gardevoir",
    itemUser: ["Gardevoir"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 657,
    gen: 6,
    isNonstandard: "Past"
}
