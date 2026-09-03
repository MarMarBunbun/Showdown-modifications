{
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
		case "acidrain":
		case "thunderstorm":
          move.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
          move.accuracy = 50;
          break;
      }
    },
  num: 87,
  accuracy: 70,
  basePower: 110,
  category: "Special",
  name: "Thunder",
  pp: 10,
  priority: 0,
  flags: { protect: 1, mirror: 1, metronome: 1 },
  secondary: {
      chance: 30,
      status: "par"
    },
  target: "normal",
  type: "Electric",
  contestType: "Cool",
}
