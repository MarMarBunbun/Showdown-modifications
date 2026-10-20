{
    name: "Diancite",
    spritenum: 624,
    megaStone: "Diancie-Mega",
    megaEvolves: "Diancie",
    itemUser: ["Diancie"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 764,
    gen: 6,
    isNonstandard: "Past"
}
