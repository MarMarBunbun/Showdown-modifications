{
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 },
  num: 879,
  accuracy: 100,
  basePower: 100,
  category: "Special",
  name: "Electro Drift",
  pp: 5,
  priority: 0,
  onBasePower(basePower, source, target, move) {
      if (target.runEffectiveness(move) > 0) {
        this.debug(`electro drift super effective buff`);
        return this.chainModify([5461, 4096]);
      }
    },
  secondary: null,
  target: "normal",
  type: "Electric",
  contestType: "Cool",
}
