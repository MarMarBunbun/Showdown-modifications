{
    num: 3531,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Lift Off",
    pp: 15,
    priority: 0,
    flags: { protect: 1, contact: 1, charge: 1, mirror: 1, gravity: 1, distance: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
    breaksProtect: true,
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
      onInvulnerability: false
    },
    secondary: null,
    target: "any",
    type: "Cosmic",
    contestType: "Cool"
}
