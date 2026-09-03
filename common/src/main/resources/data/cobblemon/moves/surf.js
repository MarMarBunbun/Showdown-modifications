{
	flags: { cprotect: 1, mirror: 1, nonsky: 1, hm: 1 },
	onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["darkness"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("boost by weather");
        return this.chainModify(1.5);
      }
    },
  num: 57,
  accuracy: 100,
  basePower: 90,
  category: "Special",
  name: "Surf",
  pp: 15,
  priority: 0,
  secondary: null,
  target: "allAdjacent",
  type: "Water",
  contestType: "Beautiful",
}
