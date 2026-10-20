{
    num: 3709,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Umbrage",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        this.field.setWeather("shadowyaura");
      }
    },
    target: "adjacentFoe",
    type: "Shadow",
    contestType: "Cool"
}
