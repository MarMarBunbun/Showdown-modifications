{
	flags: { protect: 1, mirror: 1, speed: 1 },
  num: 594,
  accuracy: 100,
  basePower: 15,
  basePowerCallback(pokemon, target, move) {
      if (pokemon.species.name === "Greninja-Ash" && pokemon.hasAbility("battlebond") && !pokemon.transformed) {
        return move.basePower + 5;
      }
      return move.basePower;
    },
  category: "Special",
  name: "Water Shuriken",
  pp: 20,
  priority: 1,
  multihit: [2, 5],
  secondary: null,
  target: "normal",
  type: "Water",
  contestType: "Cool",
}
