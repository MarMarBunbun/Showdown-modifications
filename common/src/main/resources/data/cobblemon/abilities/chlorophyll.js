{
    onModifySpe(spe, pokemon) {
      if (["sunnyday", "desolateland", "pollenstorm"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Chlorophyll",
    rating: 3,
    num: 34
}
