{
    num: 3126,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Dry Ice",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if(result === 1) {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
}
