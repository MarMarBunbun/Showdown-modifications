{
    num: 3321,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Razor Wind wind",
    pp: 10,
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
      return null;
    },
    critRatio: 2,
    secondary: null,
    target: "allAdjacentFoes",
    type: "Wind",
    contestType: "Cool"
}
