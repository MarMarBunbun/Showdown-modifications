{
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
    name: "Ice Cleats",
    rating: 2,
    num: 3102
}
