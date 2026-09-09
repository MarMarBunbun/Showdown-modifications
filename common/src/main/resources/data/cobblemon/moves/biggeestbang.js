{
    num: 3774,
    accuracy: true,
    basePower: 200,
    category: "Physical",
    isNonstandard: "Past",
    name: "Biggest Bang",
    pp: 1,
    priority: 0,
    flags: {},
    ignoreAbility: true,
    isZ: "arkhaniumz",
    secondary: {
      chance: 100,
      onHit(target, source) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "allAdjacent",
    type: "Cosmic",
    contestType: "Cool"
}
