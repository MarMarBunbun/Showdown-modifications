{
    num: 3748,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Bloody Resonance",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, sound: 1, magic: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Sound")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
}
