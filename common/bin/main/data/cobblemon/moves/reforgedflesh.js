{
    num: 3757,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reforged Flesh",
    pp: 20,
    priority: 0,
    flags: { metronome: 1, magic: 1 },
    onHit(target) {
      if (target.hp <= target.maxhp / 10) return false;
	  this.directDamage(target.maxhp / 10, target);
	  const stats = [];
	  let stat;
      for (stat in target.boosts) {
        if (target.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 3;
        this.boost(boost);
      } else {
        return false;
      }
    },
    secondary: null,
    target: "adjacentAllyOrSelf",
    type: "Blood",
    zMove: { effect: "crit2" },
    contestType: "Tough"
}
