{
    num: 3864,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Rebalancing",
    pp: 5,
    priority: 0,
    onHit(target, source, move) {
      let stages = -2;
      if (source.isAlly(target)) {
        stages = 1;
      }
      let stat = target.getBestStat(true, true);
      let boost = null;
      switch (stat) {
        case "atk":
          boost = { atk: stages };
          break;
        case "def":
          boost = { def: stages };
          break;
        case "spa":
          boost = { spa: stages };
          break;
        case "spd":
          boost = { spd: stages };
          break;
        case "spe":
          boost = { spe: stages };
          break;
        default:
          break;
      }
      if (boost) {
        this.boost(boost, target, source)
      }
    },
    flags: { protect: 1, mirror: 1, reflectable: 1 },
    secondary: null,
    target: "normal",
    type: "Fighting",
    zMove: { effect: "crit2" },
    contestType: "Smart"
}
