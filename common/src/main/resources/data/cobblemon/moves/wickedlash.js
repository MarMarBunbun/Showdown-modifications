{
    num: 3449,
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Wicked Lash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1, nosleeptalk: 1, failinstruct: 1, magic: 1 },
	critRatio: 2,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness", "eclipse"].includes(attacker.effectiveWeather())) {
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
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
}
