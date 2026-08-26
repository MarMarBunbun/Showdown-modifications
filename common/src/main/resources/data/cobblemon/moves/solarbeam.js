{
  num: 76,
	flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, beam: 1 },
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain", "darkness", "eclipse", "fallout", "thunderstorm", "fog", "duststorm", "cursedwinds"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
}
