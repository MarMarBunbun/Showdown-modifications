{
	flags: { protect: 1, reflectable: 1, mirror: 1, hm: 1 },
	onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { accuracy: -2 };
    },
  num: 148,
  accuracy: 100,
  basePower: 0,
  category: "Status",
  isNonstandard: "Past",
  name: "Flash",
  pp: 20,
  priority: 0,
  boosts: {
      accuracy: -1
    },
  secondary: null,
  target: "normal",
  type: "Normal",
  zMove: { boost: { evasion: 1 } },
  contestType: "Beautiful",
}
