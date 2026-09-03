{
    name: "Pidgeotite",
    spritenum: 622,
    megaStone: "Pidgeot-Mega",
    megaEvolves: "Pidgeot",
    itemUser: ["Pidgeot"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 762,
    gen: 6,
    isNonstandard: "Past"
}
