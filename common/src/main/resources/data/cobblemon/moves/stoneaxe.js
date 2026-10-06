{
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, blade: 1 },
  num: 830,
  accuracy: 90,
  basePower: 65,
  category: "Physical",
  name: "Stone Axe",
  pp: 15,
  priority: 0,
  onAfterHit(target, source, move) {
      if (!move.hasSheerForce && source.hp) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stealthrock");
        }
      }
    },
  onAfterSubDamage(damage, target, source, move) {
      if (!move.hasSheerForce && source.hp) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stealthrock");
        }
      }
    },
  secondary: {},
  target: "normal",
  type: "Rock",
}
