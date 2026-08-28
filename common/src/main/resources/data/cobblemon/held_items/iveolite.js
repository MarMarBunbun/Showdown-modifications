{
    name: "Iveolite",
    spritenum: 3008,
    fling: {
      basePower: 40
    },
    onModifyAtkPriority: 2,
    onModifyAtk(atk, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    onModifySpaPriority: 2,
    onModifySpa(spa, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    num: 3008,
    gen: 5
}
