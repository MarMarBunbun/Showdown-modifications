{
    onModifySpe(spe) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(2);
      }
    },
    name: "Escape Velocity",
    rating: 3,
    num: 3056
}
