{
    num: 3749,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Forced Coagulation",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	recoil: [33, 100],
    onEffectiveness(typeMod, target, type) {
      if (type === "Slime" || type === "Water")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
}
