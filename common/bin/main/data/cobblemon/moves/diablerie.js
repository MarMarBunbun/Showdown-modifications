{
    num: 3733,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Diablerie",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1, magic: 1 },
    onHit(target) {
      if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) {
        return false;
      }
      this.directDamage(target.maxhp / 2);
      this.boost({ atk: 12 }, target);
    },
    secondary: null,
    target: "self",
    type: "Blood",
    zMove: { effect: "heal" },
    contestType: "Cool"
}
