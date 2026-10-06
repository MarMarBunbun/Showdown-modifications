{
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 687,
  accuracy: 100,
  basePower: 100,
  category: "Special",
  isNonstandard: "Past",
  name: "Core Enforcer",
  pp: 10,
  priority: 0,
  onHit(target) {
      if (target.getAbility().flags["cantsuppress"])
        return;
      if (target.newlySwitched || this.queue.willMove(target))
        return;
      target.addVolatile("gastroacid");
    },
  onAfterSubDamage(damage, target) {
      if (target.getAbility().flags["cantsuppress"])
        return;
      if (target.newlySwitched || this.queue.willMove(target))
        return;
      target.addVolatile("gastroacid");
    },
  secondary: null,
  target: "allAdjacentFoes",
  type: "Dragon",
  zMove: { basePower: 140 },
  contestType: "Tough",
}
