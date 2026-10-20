{
    num: 3882,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Kinetic Rend",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (type === "Steel") return 1;
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Tough"
}
