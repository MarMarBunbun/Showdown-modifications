{
    num: 3763,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood Donation",
    pp: 5,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1, metronome: 1, heal: 1 },
	onHit(target, source) {
      const hpToSacrifice = Math.floor(source.maxhp / 4);
      if (source.hp <= hpToSacrifice) return false;


      this.directDamage(hpToSacrifice, source);


      this.heal(hpToSacrifice, target, source);


      let highestStat = null;
      let highestValue = 0;
      for (const stat in source.boosts) {
        if (source.boosts[stat] > highestValue) {
          highestStat = stat;
          highestValue = source.boosts[stat];
        }
      }

      if (highestStat && highestValue > 0) {
        const boost = {};
        boost[highestStat] = highestValue;
        this.boost(boost, target, source, this.dex.moves.get("Blood Pact"));
      }
    },
    onTryHit(target, source) {

      if (target === source || target.fainted) return false;
      if (!target.side || target.side !== source.side) return false;
    },
    secondary: null,
    target: "adjacentAlly",
    type: "Blood",
	zMove: { effect: "heal" },
	contestType: "Clever"
}
