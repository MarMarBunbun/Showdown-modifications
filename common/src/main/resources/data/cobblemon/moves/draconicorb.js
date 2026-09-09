{
    num: 3846,
    accuracy: 90,
    basePower: 60,
    category: "Special",
    name: "Draconic Orb",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
    chance: 20,
      onHit(target, source) {
        const result = this.random(4);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else if (result === 2) {
          target.trySetStatus("fbt", source);
        } else {
          target.trySetStatus("psn", source);
        }
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
