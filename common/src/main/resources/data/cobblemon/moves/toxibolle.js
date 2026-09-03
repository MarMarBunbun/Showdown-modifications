{
    num: 3634,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Toxibolle",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Poison", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough"
}
