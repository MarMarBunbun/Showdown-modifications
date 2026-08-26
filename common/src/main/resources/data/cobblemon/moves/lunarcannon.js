{
    num: 3240,
    accuracy: 100,
    basePower: 105,
    category: "Special",
    name: "Lunar Cannon",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, beam: 1, magic: 1 },
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
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["sunnyday", "desolateland"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
}
