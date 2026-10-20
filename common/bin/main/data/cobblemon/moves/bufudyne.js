{
    num: 3043,
    accuracy: 90,
    basePower: 95,
    category: "Special",
    name: "Bufudyne",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
}
