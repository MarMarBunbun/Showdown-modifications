{
    num: 3272,
    accuracy: 80,
    basePower: 110,
    category: "Special",
    name: "Niflheim",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 15,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
}
