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
    name: "Ice Slick",
    rating: 3,
    num: 3085
}
