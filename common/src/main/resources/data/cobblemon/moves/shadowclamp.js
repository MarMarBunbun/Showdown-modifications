{
    num: 3352,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Shadow Clamp",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.addVolatile("confusion");
        } else if(result === 1) {
          target.setStatus("slp");
        }
      }
    },
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
}
