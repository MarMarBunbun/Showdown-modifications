{
    name: "Latiosite",
    spritenum: 630,
    megaStone: "Latios-Mega",
    megaEvolves: "Latios",
    itemUser: ["Latios"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 685,
    gen: 6,
    isNonstandard: "Past"
}
