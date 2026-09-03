{
    num: 74,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Growth",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland", "fallout"].includes(pokemon.effectiveWeather()))
        move.boosts = { atk: 2, spa: 2 };
    },
    boosts: {
      atk: 1,
      spa: 1
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { spa: 1 } },
    contestType: "Beautiful"
}
