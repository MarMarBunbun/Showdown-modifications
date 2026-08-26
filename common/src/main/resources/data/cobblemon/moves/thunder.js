{
  num: 87,
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
    }
}
