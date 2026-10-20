{
    name: "Alakazite",
    spritenum: 579,
    megaStone: "Alakazam-Mega",
    megaEvolves: "Alakazam",
    itemUser: ["Alakazam"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 679,
    gen: 6,
    isNonstandard: "Past"
}
