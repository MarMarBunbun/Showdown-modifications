{
    name: "Ampharosite",
    spritenum: 580,
    megaStone: "Ampharos-Mega",
    megaEvolves: "Ampharos",
    itemUser: ["Ampharos"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 658,
    gen: 6,
    isNonstandard: "Past"
}
