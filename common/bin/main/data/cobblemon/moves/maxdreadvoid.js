{
    num: 3704,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Dreadvoid",
    pp: 10,
    priority: 0,
    flags: { magic: 1 },
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
    type: "Eldritch",
    contestType: "Cool"
}
