{
    num: 3007,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ancient Roar Sound",
    pp: 15,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1, magic: 1 },
    onModifyType(move, pokemon, target) {
      const rockTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Rock";
      if (rockTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>rockTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
}
