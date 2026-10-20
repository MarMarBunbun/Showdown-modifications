{
    onModifySpePriority: 5,
    onModifySpe(spe, pokemon) {
      if (pokemon.status) {
        return this.chainModify(2);
      }
    },
    name: "Lithe",
    rating: 3.5,
    num: 3097
}
