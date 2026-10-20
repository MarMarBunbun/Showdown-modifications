{
    num: 3638,
    accuracy: 100,
    basePower: 0,
	basePowerCallback(pokemon, target, move) {

      const hitCount = move.hit;
      let bp = 0;

      if (hitCount === 1) {
        bp = 20;
      } else if (hitCount === 2) {
        bp = 40;
      } else if (hitCount === 3 || hitCount > 3) {
        bp = 60;
      }

      this.debug("Hit count: " + hitCount + ", BP: " + bp);
      return bp;
	},
    category: "Physical",
    name: "DDR Kicks",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, kick: 1 },
    multihit: [1, 3],
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { basePower: 120 },
    maxMove: { basePower: 80 },
    contestType: "Clever"
}
