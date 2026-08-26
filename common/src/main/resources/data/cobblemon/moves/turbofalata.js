{
    num: 3633,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Turbofalata",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Steel", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Tough"
}
