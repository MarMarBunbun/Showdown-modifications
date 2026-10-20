{
    num: 3489,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "S-S-S-Slash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, slicing: 1, blade: 1 },
	multihit: 2,
	critRatio: 2,
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
    secondary: null,
    target: "normal",
    type: "Mystery",
    contestType: "Beautiful"
}
