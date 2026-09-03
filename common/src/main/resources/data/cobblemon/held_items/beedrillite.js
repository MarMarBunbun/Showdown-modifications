{
    name: "Beedrillite",
    spritenum: 628,
    megaStone: "Beedrill-Mega",
    megaEvolves: "Beedrill",
    itemUser: ["Beedrill"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 770,
    gen: 6,
    isNonstandard: "Past"
}
