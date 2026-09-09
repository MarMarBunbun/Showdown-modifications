{
	flags: { snatch: 1, metronome: 1, magic: 1 },
  num: 115,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Reflect",
  pp: 20,
  priority: 0,
  sideCondition: "reflect",
  condition: {
      duration: 5,
      durationCallback(target, source, effect) {
        if (source?.hasItem("lightclay")) {
          return 8;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source, target, move) {
        if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === "Physical") {
          if (!target.getMoveHitData(move).crit && !move.infiltrates) {
            this.debug("Reflect weaken");
            if (this.activePerHalf > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "Reflect");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 1,
      onSideEnd(side) {
        this.add("-sideend", side, "Reflect");
      }
    },
  secondary: null,
  target: "allySide",
  type: "Psychic",
  zMove: { boost: { def: 1 } },
  contestType: "Clever",
}
