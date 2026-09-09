{
    num: 3248,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Magnum Punch",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.addVolatile("flinch");
        } else if(result === 1) {
          this.boost({def: -1}, target, source, null, true);
        }
      }
    },
    target: "normal",
    type: "Fighting",
    contestType: "Beautiful"
}
