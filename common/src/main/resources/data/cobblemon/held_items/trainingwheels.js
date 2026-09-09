{
    name: "Training Wheels",
    spritenum: 3177,
    fling: {
      basePower: 40
    },
	onModifySpAPriority: 2,
    onModifySpA(def, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    onModifyAtkPriority: 2,
    onModifyAtk(atk, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    num: 3177,
    gen: 5
}
