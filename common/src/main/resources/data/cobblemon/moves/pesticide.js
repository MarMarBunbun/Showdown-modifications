{
    num: 3287,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Pesticide",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Bug")
        return 1;
    },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
}
