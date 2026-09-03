{
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isTerrain("grassyterrain") || this.field.isWeather("pollenstorm"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Grass Pelt",
    rating: 0.5,
    num: 179
}
