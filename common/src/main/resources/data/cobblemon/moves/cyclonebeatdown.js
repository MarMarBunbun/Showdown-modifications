{
    num: 3493,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Cyclone Beatdown",
    pp: 15,
    priority: 0,
    flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      distance: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1
    },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 6, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onInvulnerability(target, source, move) {
        if (["gust", "gustwind", "tornado", "twister", "skyuppercut", "thunder", "hurricane", "hurricanewind", "smackdown", "thousandarrows"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source, target, move) {
        if (move.id === "gust" || move.id === "gustwind" || move.id === "twister") {
          return this.chainModify(2);
        }
      }
    },
	onModifyType(move, pokemon, target) {
      const fightingTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fighting";
      const windTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Wind";
      if (fightingTypeEffectiveness === windTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fighting")){
          move.type = "Fighting";
        }
      } else if(windTypeEffectiveness>fightingTypeEffectiveness){
        move.type = "Fighting"
      }
    },
    secondary: null,
    target: "any",
    type: "Wind",
    contestType: "Clever"
}
