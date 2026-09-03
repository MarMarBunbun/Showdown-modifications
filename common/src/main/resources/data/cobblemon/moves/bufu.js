{
    num: 3041,
    accuracy: 90,
    basePower: 40,
    category: "Special",
    name: "Bufu",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 5,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
}
