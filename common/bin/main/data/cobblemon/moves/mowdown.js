{
    num: 3265,
    accuracy: 90,
    basePower: 80,
    category: "Physical",
    name: "Mow Down",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
	onEffectiveness(typeMod, target, type) {
      if (type === "Grass")
        return 1;
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Dark",
    contestType: "Tough"
}
