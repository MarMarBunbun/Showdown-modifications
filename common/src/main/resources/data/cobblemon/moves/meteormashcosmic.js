{
    num: 3256,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Meteor Mash Cosmic",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
	onModifyType(move, pokemon, target) {
      const steelTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Cosmic";
      const cosmicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Steel";
      if (steelTypeEffectiveness === cosmicTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Cosmic")){
          move.type = "Cosmic";
        }
      } else if(cosmicTypeEffectiveness>steelTypeEffectiveness){
        move.type = "Cosmic"
      }
    },
    secondary: {
      chance: 20,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Cool"
}
