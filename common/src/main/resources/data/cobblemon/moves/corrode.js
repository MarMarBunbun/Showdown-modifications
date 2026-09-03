{
    num: 3070,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Corrode",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Steel")
        return 1;
    },
    flags: { protect: 1, mirror: 1 },
    ignoreImmunity: { "Steel": true },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
}
