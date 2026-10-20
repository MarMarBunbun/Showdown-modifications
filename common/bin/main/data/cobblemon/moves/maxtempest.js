{
    num: 3712,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Tempest",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        source.side.addSideCondition("tailwind");
      }
    },
    target: "adjacentFoe",
    type: "Wind",
    contestType: "Cool"
}
