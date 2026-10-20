{
	flags: { charge: 1, protect: 1, mirror: 1, beam: 1 },
  num: 800,
  accuracy: 90,
  basePower: 120,
  category: "Special",
  name: "Meteor Beam",
  pp: 10,
  priority: 0,
  onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      this.boost({ spa: 1 }, attacker, attacker, move);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
  secondary: null,
  target: "normal",
  type: "Rock",
}
