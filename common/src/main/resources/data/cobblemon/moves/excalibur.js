{
    num: 3601,
    accuracy: true,
    basePower: 105,
    category: "Physical",
    name: "Excalibur",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1, blade: 1 },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Ghost" || type === "Steel")
        return 1;
    },
    target: "normal",
    type: "Fairy",
    contestType: "Clever"
}
