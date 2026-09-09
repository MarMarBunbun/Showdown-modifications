{
    num: 3581,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Space Slam",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Cosmic"
}
