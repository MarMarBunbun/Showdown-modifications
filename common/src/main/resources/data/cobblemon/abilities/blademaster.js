{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["blade"]) {
        this.debug('Blademaster boost');
        return this.chainModify(1.2);
      }
    },
    onModifyCritRatio(relayVar, source, target, move) {
      if (move.flags["slicing"]) {
        return relayVar + 1;
      }
    },
    flags: {},
    name: "Blademaster",
    rating: 3.5,
    num: 3234
}
