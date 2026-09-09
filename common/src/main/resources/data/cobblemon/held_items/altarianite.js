{
    name: "Altarianite",
    spritenum: 615,
    megaStone: "Altaria-Mega",
    megaEvolves: "Altaria",
    itemUser: ["Altaria"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 755,
    gen: 6,
    isNonstandard: "Past"
}
