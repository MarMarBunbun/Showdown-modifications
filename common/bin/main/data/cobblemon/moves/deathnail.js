{
    num: 3595,
    accuracy: 95,
    basePower: 85,
    category: "Physical",
    name: "Death Nail",
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
    type: "Ghost",
    contestType: "Cool"
}
