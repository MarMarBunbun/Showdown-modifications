{
    num: 91,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dig",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
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
      onImmunity(type, pokemon) {
        if (type === "sandstorm" || type === "hail")
          return false;
      },
      onInvulnerability(target, source, move) {
        if (["earthquake", "magnitude", "earthmover", "gaiasfury", "anvilsmash", "terraforce", "webwrecker", "earthbreaker"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source, target, move) {
        if (move.id === "earthquake" || move.id === "magnitude" || move.id === "gaiasfury" || move.id === "anvilsmash" || move.id === "terraforce" || move.id === "webwrecker") {
          return this.chainModify(2);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
}
