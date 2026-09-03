{
    num: 3104,
    accuracy: true,
    basePower: 40,
    category: "Special",
    name: "Disarming Voice Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, magic: 1 },
    onModifyType(move, pokemon, target) {
      const fairyTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fairy";
      if (fairyTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>fairyTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "allAdjacentFoes",
    type: "Fairy",
    contestType: "Cute"
}
