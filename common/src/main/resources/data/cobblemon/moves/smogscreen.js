{
    num: 3379,
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Smogscreen",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          this.boost({accuracy: -1}, target, source, null, true);
        } else if(result === 1) {
          target.setStatus("psn");
        }
      }
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
}
