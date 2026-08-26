{
    num: 3573,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Prism Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Light")
        return 1;
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
}
