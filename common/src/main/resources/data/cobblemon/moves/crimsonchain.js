{
    num: 3745,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Crimson chain",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Blood",
    contestType: "Tough"
}
