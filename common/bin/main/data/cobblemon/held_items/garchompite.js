{
    name: "Garchompite",
    spritenum: 589,
    megaStone: "Garchomp-Mega",
    megaEvolves: "Garchomp",
    itemUser: ["Garchomp"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 683,
    gen: 6,
    isNonstandard: "Past"
}
