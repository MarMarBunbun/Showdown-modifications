{
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass") {
        this.debug("Piel Punica weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass") {
        this.debug("Piel Punica weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Piel Punica",
    rating: 3.5,
    num: 3114
}
