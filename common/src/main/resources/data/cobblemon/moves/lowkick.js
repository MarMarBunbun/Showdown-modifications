{
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
  num: 67,
  accuracy: 100,
  basePower: 0,
  basePowerCallback(pokemon, target) {
      const targetWeight = target.getWeight();
      let bp;
      if (targetWeight >= 2e3) {
        bp = 120;
      } else if (targetWeight >= 1e3) {
        bp = 100;
      } else if (targetWeight >= 500) {
        bp = 80;
      } else if (targetWeight >= 250) {
        bp = 60;
      } else if (targetWeight >= 100) {
        bp = 40;
      } else {
        bp = 20;
      }
      this.debug("BP: " + bp);
      return bp;
    },
  category: "Physical",
  name: "Low Kick",
  pp: 20,
  priority: 0,
  onTryHit(target, pokemon, move) {
      if (target.volatiles["dynamax"]) {
        this.add("-fail", pokemon, "Dynamax");
        this.attrLastMove("[still]");
        return null;
      }
    },
  secondary: null,
  target: "normal",
  type: "Fighting",
  zMove: { basePower: 160 },
  contestType: "Tough",
}
