{
    num: 3118,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Strike",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Electric";
      const electricTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === electricTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Electric")){
          move.type = "Electric";
        }
      } else if(electricTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Electric"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
