{
    name: "Aerodactylite",
    spritenum: 577,
    megaStone: "Aerodactyl-Mega",
    megaEvolves: "Aerodactyl",
    itemUser: ["Aerodactyl"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 672,
    gen: 6,
    isNonstandard: "Past"
}
