{
    num: 3632,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Trematerra",
    pp: 5,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Sound", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
}
