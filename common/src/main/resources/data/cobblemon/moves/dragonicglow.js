{
    num: 3117,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Dragonic Glow",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fairy";
      const fairyTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === fairyTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fairy")){
          move.type = "Fairy";
        }
      } else if(fairyTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Fairy"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
