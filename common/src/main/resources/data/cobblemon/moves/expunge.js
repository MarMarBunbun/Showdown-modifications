{
    num: 3144,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Expunge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "fallout":
          move.accuracy = true;
          break;
      }
    },
	onEffectiveness(typeMod, target, type) {
      if (type === "Nuclear")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
}
