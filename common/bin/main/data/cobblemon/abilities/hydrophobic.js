{
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Hydrophobic weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Hydrophobic weaken");
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Hydrophobic",
    rating: 3.5,
    num: 3196
}
