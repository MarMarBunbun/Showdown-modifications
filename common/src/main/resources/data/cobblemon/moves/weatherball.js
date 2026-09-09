{
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move.type = "Water";
          break;
		case "pollenstorm":
          move.type = "Grass";
          break;
		case "duststorm":
          move.type = "Ground";
          break;
        case "pheromones":
          move.type = "Bug";
          break;
		case "sandstorm":
          move.type = "Rock";
          break;
        case "battleaura":
          move.type = "Fighting";
          break;
		case "hail":
        case "snow":
          move.type = "Ice";
          break;
		case "darkness":
		case "eclipse":
          move.type = "Dark";
          break;
		case "cursedwinds":
          move.type = "Ghost";
          break;
		case "psychicfield":
          move.type = "Psychic";
          break;
		case "acidrain":
		case "smog":
          move.type = "Poison";
          break;
		case "dragonforce":
          move.type = "Dragon";
          break;
		case "magnetosphere":
          move.type = "Steel";
          break;
		case "fairydust":
          move.type = "Fairy";
          break;
		case "fallout":
          move.type = "Nuclear";
          break;
		case "thunderstorm":
          move.type = "Electric";
          break;
		case "shadowyaura":
          move.type = "Shadow";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move.basePower *= 2;
          break;
        case "pollenstorm":
          move.basePower *= 2;
          break;
		case "duststorm":
          move.basePower *= 2;
          break;
		case "pheromones":
          move.basePower *= 2;
          break;
		case "sandstorm":
          move.basePower *= 2;
          break;
        case "battleaura":
          move.basePower *= 2;
          break;
		case "hail":
        case "snow":
          move.basePower *= 2;
          break;
		case "darkness":
		case "eclipse":
          move.basePower *= 2;
          break;
		case "cursedwinds":
          move.basePower *= 2;
          break;
		case "psychicfield":
          move.basePower *= 2;
          break;
		case "acidrain":
		case "smog":
          move.basePower *= 2;
          break;
		case "dragonforce":
          move.basePower *= 2;
          break;
		case "magnetosphere":
          move.basePower *= 2;
          break;
		case "fairydust":
          move.basePower *= 2;
          break;
		case "fallout":
          move.basePower *= 2;
          break;
		case "thunderstorm":
          move.basePower *= 2;
          break;
		case "shadowyaura":
          move.basePower *= 2;
          break;
      }
      this.debug("BP: " + move.basePower);
    },
  num: 311,
  accuracy: 100,
  basePower: 50,
  category: "Special",
  name: "Weather Ball",
  pp: 10,
  priority: 0,
  flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1 },
  secondary: null,
  target: "normal",
  type: "Normal",
  zMove: { basePower: 160 },
  maxMove: { basePower: 130 },
  contestType: "Beautiful",
}
