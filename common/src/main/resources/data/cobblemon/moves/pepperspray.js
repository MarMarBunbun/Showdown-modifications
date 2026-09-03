{
    num: 3880,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Pepper Spray",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onHit(target, source, move) {

      if (target.status === "frz") {
        target.cureStatus();
      }

      if (target.status === "fbt") {
        target.cureStatus();
      }
	},
    secondary: {
      chance: 30,
      volatileStatus: "brn"
    },
    target: "normal",
    type: "Grass",
    contestType: "Cool"
}
