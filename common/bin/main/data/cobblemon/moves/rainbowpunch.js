{
    num: 3318,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Rainbow Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      onHit(target, source) {
        const result = this.random(4);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else if (result === 2) {
          target.trySetStatus("psn", source);
        } else {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
}
