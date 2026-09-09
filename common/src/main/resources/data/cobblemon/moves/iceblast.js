{
    num: 3608,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Ice Blast",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Water")
        return 1;
    },
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
}
