{
    num: 3119,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Wave",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Water";
      const waterTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === waterTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Water")){
          move.type = "Water";
        }
      } else if(waterTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Water"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
