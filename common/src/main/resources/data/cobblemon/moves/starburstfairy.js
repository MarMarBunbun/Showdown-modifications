{
    num: 3791,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Star Burst Fairy",
    pp: 5,
    priority: 0,
    flags: { mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
}
