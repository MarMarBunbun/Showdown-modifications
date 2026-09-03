{
    onModifyDef(def, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
	onModifySpd(spd, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Glacial Armor",
    rating: 3,
    num: 3071
}
