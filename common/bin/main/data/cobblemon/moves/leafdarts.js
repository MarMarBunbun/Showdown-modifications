{
    num: 3235,
    accuracy: 90,
    basePower: 10,
	basePowerCallback(pokemon, target, move) {
      return 10 * move.hit;
    },
    category: "Physical",
    name: "Leaf Darts",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    multihit: [1, 3],
	multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Tough"
}
