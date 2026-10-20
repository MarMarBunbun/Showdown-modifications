{
	flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1, legendary: 1 },
  num: 391,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Heart Swap",
  pp: 10,
  priority: 0,
  onHit(target, source) {
      const targetBoosts = {};
      const sourceBoosts = {};
      let i;
      for (i in target.boosts) {
        targetBoosts[i] = target.boosts[i];
        sourceBoosts[i] = source.boosts[i];
      }
      target.setBoost(sourceBoosts);
      source.setBoost(targetBoosts);
      this.add("-swapboost", source, target, "[from] move: Heart Swap");
    },
  secondary: null,
  target: "normal",
  type: "Psychic",
  zMove: { effect: "crit2" },
  contestType: "Clever",
}
