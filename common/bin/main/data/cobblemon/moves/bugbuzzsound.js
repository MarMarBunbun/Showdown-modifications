{
    num: 3045,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Bug Buzz Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
	onModifyType(move, pokemon, target) {
      const bugTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Bug";
      if (bugTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>bugTypeEffectiveness){
        move.type = "Sound"
      }
    },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
}
