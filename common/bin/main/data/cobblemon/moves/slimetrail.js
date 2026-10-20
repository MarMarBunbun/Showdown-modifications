{
    num: 3511,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Slime Trail",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1 },
    sideCondition: "slimetrail",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Slime Trail");
      },
	  onAfterMoveSecondarySelf(source, target, move) {
        if (move.flags["contact"] && target && !target.fainted) {
          const recoilDamage = this.clampIntRange(move.totalDamage * 50 / 100, 1);
          this.damage(recoilDamage, source, source, "slimetrail");
        }
	  }
    },
    secondary: null,
    target: "foeSide",
    type: "Slime",
    zMove: { boost: { spe: 1 } },
    contestType: "Tough"
}
