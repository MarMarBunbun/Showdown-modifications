{
	flags: { protect: 1, mirror: 1, beam: 1 },
  num: 161,
  accuracy: 100,
  basePower: 80,
  category: "Special",
  name: "Tri Attack",
  pp: 10,
  priority: 0,
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
  type: "Normal",
  contestType: "Beautiful",
}
