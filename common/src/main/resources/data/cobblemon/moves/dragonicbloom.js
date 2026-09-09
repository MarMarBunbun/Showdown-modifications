{
    num: 3115,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Dragonic Bloom",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Grass";
      const grassTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === grassTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Grass")){
          move.type = "Grass";
        }
      } else if(grassTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Grass"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
