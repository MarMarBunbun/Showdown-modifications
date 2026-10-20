{
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Water") {
        this.debug("Desert Body weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ice" || move.type === "Fire" || move.type === "Water") {
        this.debug("Desert Body weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Desert Body",
    rating: 3.5,
    num: 3223
}
