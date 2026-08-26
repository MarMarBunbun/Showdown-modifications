{
    num: 3162,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Flash Light",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, hm: 1 },
    boosts: {
      accuracy: -1
    },
	onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { accuracy: -2 };
    },
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { boost: { evasion: 1 } },
    contestType: "Beautiful"
}
