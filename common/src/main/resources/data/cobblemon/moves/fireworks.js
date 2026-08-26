{
    num: 3156,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Fireworks",
    pp: 20,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Flying")
        return 1;
    },
    flags: { protect: 1, mirror: 1, bullet: 1 },
    ignoreImmunity: { "Flying": true },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
}
