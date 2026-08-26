{
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["magnetosphere"]) || this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Gravity Sling",
    rating: 3,
    num: 3073
}
