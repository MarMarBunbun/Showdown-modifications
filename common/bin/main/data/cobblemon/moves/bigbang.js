{
    num: 3029,
    accuracy: 100,
    basePower: 105,
    category: "Physical",
    name: "Big Bang",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
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
    target: "allAdjacent",
    type: "Cosmic",
    contestType: "Beautiful"
}
