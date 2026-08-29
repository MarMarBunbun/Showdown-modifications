{
    onAllyBasePowerPriority: 23,
    onAllyBasePower(relayVar, attacker, defender, move) {
      if (attacker.getTypes().some(type => ["Grass", "Rock", "Steel"].includes(type))) {
        this.debug("Carpenter boost");
        return this.chainModify(1.3);
      }
    },
    flags: {},
    name: "Carpenter",
    rating: 2,
    num: 3257
}
