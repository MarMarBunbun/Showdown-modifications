{
    num: 3537,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Super EM Bomber",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, beam: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["magnetosphere"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
	onModifyType(move, pokemon, target) {
      const electricTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Steel";
      const steelTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Electric";
      if (electricTypeEffectiveness === steelTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Steel")){
          move.type = "Steel";
        }
      } else if(steelTypeEffectiveness>electricTypeEffectiveness){
        move.type = "Steel"
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
}
