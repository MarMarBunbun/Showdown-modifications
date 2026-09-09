{
    num: 3432,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Toxifume",
    pp: 5,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);

      this.boost({ spa: 1 }, attacker, attacker, move);
      return null;
    },
    secondary: {
      chance: 100,
      status: "tox"
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful",
}
