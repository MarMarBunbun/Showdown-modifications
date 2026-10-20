{
	flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, legendary: 1 },
  num: 554,
  accuracy: 90,
  basePower: 140,
  category: "Special",
  name: "Ice Burn",
  pp: 5,
  priority: 0,
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
  type: "Ice",
  contestType: "Beautiful",
}
