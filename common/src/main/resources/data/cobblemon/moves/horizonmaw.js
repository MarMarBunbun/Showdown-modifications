{
    num: 3769,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Horizon Maw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    onBasePower(basePower) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(1.5);
      }
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Eldritch"
}
