{
	flags: { snatch: 1, metronome: 1, magic: 1 },
  num: 113,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Light Screen",
  pp: 30,
  priority: 0,
  sideCondition: "lightscreen",
  condition: {
      duration: 5,
      durationCallback(target, source, effect) {
        if (source?.hasItem("lightclay")) {
          return 8;
        }
        return 5;
      },
      onAnyModifyDamage(damage, source, target, move) {
        if (target !== source && this.effectState.target.hasAlly(target) && this.getCategory(move) === "Special") {
          if (!target.getMoveHitData(move).crit && !move.infiltrates) {
            this.debug("Light Screen weaken");
            if (this.activePerHalf > 1)
              return this.chainModify([2732, 4096]);
            return this.chainModify(0.5);
          }
        }
      },
      onSideStart(side) {
        this.add("-sidestart", side, "move: Light Screen");
      },
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 2,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Light Screen");
      }
    },
  secondary: null,
  target: "allySide",
  type: "Psychic",
  zMove: { boost: { spd: 1 } },
  contestType: "Beautiful",
}
