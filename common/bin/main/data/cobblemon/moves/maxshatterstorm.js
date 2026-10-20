{
    num: 3702,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Shatterstorm",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ def: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Crystal",
    contestType: "Cool"
}
