{
    num: 3809,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Gamma Hammer",
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
    type: "Nuclear",
    contestType: "Tough"
}
