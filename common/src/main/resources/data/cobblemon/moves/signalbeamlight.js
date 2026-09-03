{
    num: 3369,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    isNonstandard: "Past",
    name: "Signal Beam Light",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
	onModifyType(move, pokemon, target) {
      const bugTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Bug";
      if (bugTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>bugTypeEffectiveness){
        move.type = "Light"
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
}
