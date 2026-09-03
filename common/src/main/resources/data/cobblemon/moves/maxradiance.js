{
    num: 3705,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Radiance",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spa: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Light",
    contestType: "Cool"
}
