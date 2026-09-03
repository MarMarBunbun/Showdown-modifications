{
    num: 3750,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blood Clot",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Fighting")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
}
