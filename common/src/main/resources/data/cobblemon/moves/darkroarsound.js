{
    num: 3087,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Dark Roar Sound",
    pp: 30,
    priority: 1,
	onModifyType(move, pokemon, target) {
      const darkTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dark";
      if (darkTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>darkTypeEffectiveness){
        move.type = "Sound"
      }
    },
    flags: { protect: 1, mirror: 1, sound: 1, speed: 1, magic: 1  },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
}
