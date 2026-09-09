{
    num: 3223,
    accuracy: 95,
    basePower: 90,
    category: "Special",
    name: "Infernal Blade",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Fairy")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1, blade: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
}
