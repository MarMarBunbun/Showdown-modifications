{
    num: 3710,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Ooze Flood",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spe: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Slime",
    contestType: "Cool"
}
