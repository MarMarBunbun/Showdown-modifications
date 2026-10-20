{
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness", "cursedwinds"].includes(attacker.effectiveWeather())) {
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
  num: 566,
  accuracy: 100,
  basePower: 90,
  category: "Physical",
  name: "Phantom Force",
  pp: 10,
  priority: 0,
  flags: { contact: 1, charge: 1, mirror: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
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
