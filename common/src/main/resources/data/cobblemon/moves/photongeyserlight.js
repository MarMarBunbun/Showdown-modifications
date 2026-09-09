{
    num: 3289,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    isNonstandard: "Past",
    name: "Photon Geyser Light",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    ignoreAbility: true,
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
}
