{
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Natural Toxin weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Natural Toxin weaken");
        return this.chainModify(0.5);
      }
    },
    isBreakable: true,
    name: "Natural Toxin",
    rating: 3.5,
    num: 3103
}
