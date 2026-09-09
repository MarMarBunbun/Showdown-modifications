{
    name: "Tyranitarite",
    spritenum: 607,
    megaStone: "Tyranitar-Mega",
    megaEvolves: "Tyranitar",
    itemUser: ["Tyranitar"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 669,
    gen: 6,
    isNonstandard: "Past"
}
