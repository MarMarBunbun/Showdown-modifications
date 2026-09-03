{
    name: "Scizorite",
    spritenum: 605,
    megaStone: "Scizor-Mega",
    megaEvolves: "Scizor",
    itemUser: ["Scizor"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 670,
    gen: 6,
    isNonstandard: "Past"
}
