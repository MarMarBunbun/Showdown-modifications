{
    name: "Gyaradosite",
    spritenum: 589,
    megaStone: "Gyarados-Mega",
    megaEvolves: "Gyarados",
    itemUser: ["Gyarados"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 676,
    gen: 6,
    isNonstandard: "Past"
}
