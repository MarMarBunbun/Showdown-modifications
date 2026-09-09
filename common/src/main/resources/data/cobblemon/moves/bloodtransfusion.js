{
    num: 3760,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blood Transfusion",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1, heal: 1 },
	onAfterHit(target, source, move) {

      if (!target || !target.hp || source.fainted) return;

      const damage = Math.floor(target.lastDamage / 2);
      if (!damage) return;


      let healTarget = source;


      if (source.side.active.length > 1) {
        for (const ally of source.side.active) {
          if (!ally || ally.fainted) continue;
          const allyHpRatio = ally.hp / ally.maxhp;
          const healHpRatio = healTarget.hp / healTarget.maxhp;
          if (allyHpRatio < healHpRatio) {
            healTarget = ally;
          }
        }
      }


      this.heal(damage, healTarget, source, move);
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Cute"
}
