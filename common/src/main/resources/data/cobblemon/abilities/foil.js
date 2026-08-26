{
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Psychic") {
        this.debug("Foil weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Psychic") {
        this.debug("Foil weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Foil",
    rating: 3.5,
    num: 3199
}
