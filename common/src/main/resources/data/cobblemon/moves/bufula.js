{
    num: 3042,
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Bufula",
    pp: 20,
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
