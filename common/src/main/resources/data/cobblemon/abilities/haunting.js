{
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["cursedwinds", "darkness", "eclipse"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Haunting",
    rating: 3,
    num: 3076
}
