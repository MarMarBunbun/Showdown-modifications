{
    num: 3312,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Quantum Leap",
    pp: 5,
    priority: 0,
    flags: { contact: 1, charge: 1, mirror: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1, legendary: 1 },
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
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
}
