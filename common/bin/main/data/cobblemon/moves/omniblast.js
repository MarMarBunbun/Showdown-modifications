{
    num: 3618,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Omni Blast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 20,
      onHit(target, source) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "normal",
    type: "Electric",
    contestType: "Beautiful"
}
