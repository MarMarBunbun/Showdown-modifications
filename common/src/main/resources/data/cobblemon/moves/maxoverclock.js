{
    num: 3703,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Overclock",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.alliesAndSelf()) {
          this.boost({ spe: 1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Digital",
    contestType: "Cool"
}
