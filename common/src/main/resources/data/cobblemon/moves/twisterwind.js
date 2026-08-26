{
    num: 3434,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Twister Wind",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, wind: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Wind";
      const windTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === windTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Wind")){
          move.type = "Wind";
        }
      } else if(windTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Wind"
      }
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Dragon",
    contestType: "Cool"
}
