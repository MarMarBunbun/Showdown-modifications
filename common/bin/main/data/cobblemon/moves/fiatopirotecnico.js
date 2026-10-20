{
    num: 3635,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Fiato Pirotecnico",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Electric", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Tough"
}
