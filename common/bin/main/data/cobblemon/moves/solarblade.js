{
    num: 669,
    accuracy: 100,
    basePower: 125,
    category: "Physical",
    name: "Solar Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1, nosleeptalk: 1, failinstruct: 1, blade: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather())) {
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
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain", "darkness", "eclipse", "fallout", "thunderstorm", "fog", "duststorm", "cursedwinds"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Cool"
}
