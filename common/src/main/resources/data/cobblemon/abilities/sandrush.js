{
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["sandstorm", "duststorm"])) {
        return this.chainModify(2);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Rush",
    rating: 3,
    num: 3129
}
