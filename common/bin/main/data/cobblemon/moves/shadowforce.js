{
	flags: { contact: 1, charge: 1, mirror: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1, legendary: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return this.chainModify(1.5);
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
  num: 467,
  accuracy: 100,
  basePower: 120,
  category: "Physical",
  name: "Shadow Force",
  pp: 5,
  priority: 0,
  breaksProtect: true,
  condition: {
      duration: 2,
      onInvulnerability: false
    },
  secondary: null,
  target: "normal",
  type: "Ghost",
  contestType: "Cool",
}
