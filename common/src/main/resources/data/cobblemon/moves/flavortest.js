{
    num: 3167,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Flavor Test",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Ice", type);
    },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Fairy"
}
