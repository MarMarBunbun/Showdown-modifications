{
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {

      if (move.drain) {

        this.debug("Insatiable boost");
        return this.chainModify(1.5);
      }
    },
    name: "Insatiable",
    rating: 3,
    num: 3087
}
