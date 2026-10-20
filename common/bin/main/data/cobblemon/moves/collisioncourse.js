{
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 },
  num: 878,
  accuracy: 100,
  basePower: 100,
  category: "Physical",
  name: "Collision Course",
  pp: 5,
  priority: 0,
  onBasePower(basePower, source, target, move) {
      if (target.runEffectiveness(move) > 0) {
        this.debug(`collision course super effective buff`);
        return this.chainModify([5461, 4096]);
      }
    },
  secondary: null,
  target: "normal",
  type: "Fighting",
  contestType: "Tough",
}
