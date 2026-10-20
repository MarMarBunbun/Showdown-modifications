{
    num: 234,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Morning Sun",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
		case "pollenstorm":
		case "fairydust":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snow":
		case "acidrain":
		case "thunderstorm":
		case "fog":
		case "duststorm":
		case "cursedwinds":
          factor = 0.25;
          break;
		case "fallout":
		case "shadowyaura":
		case "smog":
          factor = 0.125;
          break;
		case "darkness":
          factor = 0;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
}
