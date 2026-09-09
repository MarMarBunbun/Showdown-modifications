{
    num: 3391,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    isNonstandard: "Past",
    name: "Sparkling Aria Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      dustproof: true,
      chance: 100,
      volatileStatus: "sparklingaria"
    },
	onModifyType(move, pokemon, target) {
      const waterTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Water";
      if (waterTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>waterTypeEffectiveness){
        move.type = "Sound"
      }
    },
    onAfterMove(source, target, move) {
      for (const pokemon of this.getAllActive()) {
        if (pokemon !== source && pokemon.removeVolatile("sparklingaria") && pokemon.status === "brn" && !source.fainted) {
          pokemon.cureStatus();
        }
      }
    },
    target: "allAdjacent",
    type: "Water",
    contestType: "Tough"
}
