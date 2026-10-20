{
    num: 3765,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Blood Blight",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
	recoil: [2, 10],
	onBasePower(basePower, pokemon, target) {
      const weather = pokemon.effectiveWeather();
      if (weather === "acidrain" || weather === "fallout") {
        this.debug("boost by weather");
        return this.chainModify(1.5);
      }
    },
	onModifyMove(move, source, target) {
      const poisonedWeathers = ["acidrain", "fallout"];
      if (poisonedWeathers.includes(source.effectiveWeather())) {
        move.secondaries = move.secondaries || [];
        move.secondaries.push({
          chance: 30,
          status: "tox",
        });
      }
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
}
