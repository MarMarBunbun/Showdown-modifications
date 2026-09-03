{
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["thunderstorm"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Energizer",
    rating: 3,
    num: 3054
}
