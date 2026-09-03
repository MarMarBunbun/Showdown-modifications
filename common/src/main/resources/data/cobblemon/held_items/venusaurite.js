{
    name: "Venusaurite",
    spritenum: 608,
    megaStone: "Venusaur-Mega",
    megaEvolves: "Venusaur",
    itemUser: ["Venusaur"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 659,
    gen: 6,
    isNonstandard: "Past"
}
