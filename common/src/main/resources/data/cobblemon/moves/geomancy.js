{
  num: 601,
	flags: { charge: 1, nonsky: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, legendary: 1 },
    onModifyMove(move, pokemon) {
      const weather = pokemon.effectiveWeather();
      if (["darkness", "eclipse"].includes(weather)) {
        move.boosts = { spa: 1, spd: 1, spe: 1 };
      }
      if (weather === "fairydust") {
        move.boosts = { spa: 3, spd: 3, spe: 3 };
      }
    },
}
