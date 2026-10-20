{
	onModifyMove(move, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather()))
        move.boosts = { atk: 2, accuracy: 2 };
    },
  num: 468,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Hone Claws",
  pp: 15,
  priority: 0,
  flags: { snatch: 1, metronome: 1 },
  boosts: {
      atk: 1,
      accuracy: 1
    },
  secondary: null,
  target: "self",
  type: "Dark",
  zMove: { boost: { atk: 1 } },
  contestType: "Cute",
}
