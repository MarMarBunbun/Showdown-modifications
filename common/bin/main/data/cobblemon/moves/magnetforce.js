{
    num: 3245,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Magnet Force",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          this.boost({atk: -1}, target, source, null, true);
        } else if(result === 1) {
          this.boost({spa: -1}, target, source, null, true);
        }
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
}
