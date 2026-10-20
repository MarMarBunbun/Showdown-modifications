{
    num: 3116,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Flare",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fire";
      const fireTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === fireTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fire")){
          move.type = "Fire";
        }
      } else if(fireTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Fire"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
}
