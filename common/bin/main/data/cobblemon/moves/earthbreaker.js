{
    num: 3788,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Earthbreaker",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Ground")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
}
