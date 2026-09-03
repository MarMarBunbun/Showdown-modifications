{
    num: 3653,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Amethyst Assault",
    pp: 10,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Crystal",
    zMove: { basePower: 170 },
    contestType: "Tough"
}
