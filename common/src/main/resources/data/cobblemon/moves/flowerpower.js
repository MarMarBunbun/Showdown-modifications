{
    num: 3169,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Flower Power",
    pp: 20,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Grass",
    zMove: { basePower: 170 },
    contestType: "Tough"
}
