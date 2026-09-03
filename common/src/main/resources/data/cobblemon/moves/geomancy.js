{
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
  num: 601,
  accuracy: true,
  basePower: 0,
  category: "Status",
  isNonstandard: "Past",
  name: "Geomancy",
  pp: 10,
  priority: 0,
  boosts: {
      spa: 2,
      spd: 2,
      spe: 2
    },
  secondary: null,
  target: "self",
  type: "Fairy",
  zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
  contestType: "Beautiful",
}
