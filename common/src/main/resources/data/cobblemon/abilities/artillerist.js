{
    onBasePower(relayVar, source, target, move) {
      if (move.flags['bullet']) {
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Artillerist",
    rating: 3.5,
    num: 3251
}
