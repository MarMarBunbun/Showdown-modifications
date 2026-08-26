{
    num: 3528,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Solar Flare",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bypasssub: 1 },
	onModifyType(move, pokemon, target) {
      const cosmicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Cosmic";
      if (cosmicTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>cosmicTypeEffectiveness){
        move.type = "Light"
      }
    },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Beautiful"
}
