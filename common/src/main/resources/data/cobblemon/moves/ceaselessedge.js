{
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, blade: 1 },
  num: 845,
  accuracy: 90,
  basePower: 65,
  category: "Physical",
  name: "Ceaseless Edge",
  pp: 15,
  priority: 0,
  onAfterHit(target, source, move) {
      if (!move.hasSheerForce && source.hp) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
        }
      }
    },
  onAfterSubDamage(damage, target, source, move) {
      if (!move.hasSheerForce && source.hp) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
        }
      }
    },
  secondary: {},
  target: "normal",
  type: "Dark",
}
