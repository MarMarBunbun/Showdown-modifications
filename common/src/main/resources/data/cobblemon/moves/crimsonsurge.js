{
    num: 3878,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Crimson Surge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
	onHit(target, source, move) {
      if (["brn", "frz", "par", "slp", "fbt"].includes(target.status)) {
        if (target.runStatusImmunity("psn")) {
          target.clearStatus();
        }
      }
      target.trySetStatus("psn", source);
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
}
