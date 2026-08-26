{
    num: 3524,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "EMP Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
	self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Digital" || type === "Electric")
        return 1;
    },
    target: "allAdjacent",
    type: "Electric",
    contestType: "Beautiful"
}
