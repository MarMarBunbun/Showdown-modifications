{
    num: 3711,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Reverb",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spd: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Sound",
    contestType: "Cool"
}
