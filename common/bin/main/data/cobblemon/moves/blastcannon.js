{
    num: 3032,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    isNonstandard: "Past",
    name: "Blast Cannon",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1 },
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
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
}
