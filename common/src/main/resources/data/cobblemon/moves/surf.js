{
  num: 57,
	flags: { cprotect: 1, mirror: 1, nonsky: 1, hm: 1 },
	onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["darkness"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("boost by weather");
        return this.chainModify(1.5);
      }
    }
}
