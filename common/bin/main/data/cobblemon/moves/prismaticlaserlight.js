{
    num: 3303,
    accuracy: 100,
    basePower: 160,
    category: "Special",
    isNonstandard: "Past",
    name: "Prismatic Laser Light",
    pp: 10,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, beam: 1, legendary: 1 },
	onModifyType(move, pokemon, target) {
      const psychicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Psychic";
      if (psychicTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>psychicTypeEffectiveness){
        move.type = "Light"
      }
    },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
}
