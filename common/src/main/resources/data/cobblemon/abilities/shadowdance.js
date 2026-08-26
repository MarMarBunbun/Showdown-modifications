{
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["darkness", "shadowyaura"])) {
        return this.chainModify(2);
      }
    },
    name: "Shadow Dance",
    rating: 3,
    num: 3135
}
