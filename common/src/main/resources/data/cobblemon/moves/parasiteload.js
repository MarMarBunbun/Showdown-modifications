{
    num: 3737,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Parasite Load",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 20,
      onHit(target, source) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("psn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else {
          target.trySetStatus("fbt", source);
        }
      }
    },
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
}
