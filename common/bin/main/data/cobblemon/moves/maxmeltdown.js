{
    num: 3706,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Meltdown",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        this.field.setWeather("fallout");
      }
    },
    target: "adjacentFoe",
    type: "Nuclear",
    contestType: "Cool"
}
