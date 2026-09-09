{
    num: 3362,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Shadow Shed",
    pp: 10,
    priority: 0,
    flags: {},
	onTryHit(pokemon) {
      pokemon.side.removeSideCondition("safeguard");
	  pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
    },
    secondary: null,
    target: "normal",
    type: "Shadow",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
}
