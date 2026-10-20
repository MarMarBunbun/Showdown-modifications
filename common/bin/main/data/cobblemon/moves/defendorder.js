{
	onModifyMove(move, pokemon) {
      if (["pheromones"].includes(pokemon.effectiveWeather()))
        move.boosts = { def: 2, spd: 2 };
    },
  num: 455,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Defend Order",
  pp: 10,
  priority: 0,
  flags: { snatch: 1, metronome: 1 },
  boosts: {
      def: 1,
      spd: 1
    },
  secondary: null,
  target: "self",
  type: "Bug",
  zMove: { boost: { def: 1 } },
  contestType: "Clever",
}
