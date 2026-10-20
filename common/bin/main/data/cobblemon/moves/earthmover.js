{
    num: 3131,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Earthmover",
    pp: 15,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Ground")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
}
