{
    num: 3125,
    accuracy: 85,
    basePower: 105,
    category: "Special",
    name: "Drakon Voice Sound",
    pp: 10,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
}
