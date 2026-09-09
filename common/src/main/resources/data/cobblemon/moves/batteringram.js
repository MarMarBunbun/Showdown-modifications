{
    num: 3027,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Battering Ram",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit(pokemon) {
      pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
}
